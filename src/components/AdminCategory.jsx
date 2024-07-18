import React, { useState, useContext } from "react";
import AddCategory from './AddCategory';
import EditCategory from './EditCategory';
import { UserContext } from '../context/userContext';
import axios from 'axios';


function AdminCategory({ categories, updateData }) {
    const [addCategory, setAddCategory] = useState(false);
    const [editCategory, setEditCategory] = useState(null);
    const { currentuser } = useContext(UserContext);

    const handleEdit = (category) => {
        setEditCategory(category);
        setAddCategory(true);
    };

    const handleDelete = async (categoryId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this Category?");
        if (confirmDelete) {
            try {
                const response = await axios.post(`/api/category/delete`,{userId:currentuser.id,categoryId});
                if (response.data.success) {
                    alert("Category deleted successfully.");
                    updateData();
                } else {
                    throw new Error(response.data.message);
                }
            } catch (error) {
                console.error("Error deleting Category vendor:", error);
                alert("An error occurred while deleting the loan vendor.");
            }
        }
    };

    const goBack = () => {
        setAddCategory(!addCategory);
        setEditCategory(null);
        updateData();
    };

    return (
        <div className="bg-[#fafafa] w-full h-full p-4 rounded-lg">
            <div className="px-4 float-left font-xl">Total Categories: {categories.length}</div>
            <button className='bg-lightPrimary float-right rounded-xl p-4 text-white' onClick={goBack}>
                {addCategory ? 'Back' : 'Add new Category'}
            </button>
            {addCategory == true ? (
                editCategory != null ? (
                    <div className="mt-16">
                        <EditCategory category={editCategory} goBack={goBack} />
                    </div>
                ) : (
                    <div className="mt-16">
                        <AddCategory goBack={goBack} />
                    </div>
                )
            ) : (
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-12 py-4'>
                    {categories.map(category => (
                        <div className='bg-white p-4 border rounded shadow'>
                            <img src={category.logo} alt={category.category} className='w-16 h-16' />
                            <h3 className='text-lg font-bold'>{category.category}</h3>
                            <div className='flex gap-x-2'>
                                <button onClick={()=>{handleEdit(category)}} className='text-blue-500'>Edit</button>
                                <button onClick={()=>{handleDelete(category._id)}} className='text-red-500'>Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default AdminCategory;