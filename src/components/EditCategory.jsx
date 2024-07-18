import React, { useState, useContext } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { UserContext } from '../context/userContext';

function EditCategory({ category, goBack }) {
    const [formFields, setFormFields] = useState(category.formFields);
    const [fieldName, setFieldName] = useState('');
    const [fieldType, setFieldType] = useState('text');
    const [categoryName, setCategoryName] = useState(category.category);
    const [categoryLogo, setCategoryLogo] = useState(null);
    const { currentuser } = useContext(UserContext);
    // console.log(category);

    const addField = () => {
        if (!fieldName.trim()) {
            alert('Please enter a field name');
            return;
        }
        const newField = {
            name: fieldName.trim(),
            type: fieldType,
        };
        setFormFields([...formFields, newField]);
        setFieldName('');
        setFieldType('text');
    };

    const removeField = (index) => {
        const updatedFields = [...formFields];
        updatedFields.splice(index, 1);
        setFormFields(updatedFields);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`/api/category/update`, {
                userId: currentuser.id,
                category: categoryName,
                categoryId:category._id,
                formFields
            });
            console.log(response);
            if (response.data.success) {
                toast.success('Category updated successfully');
                goBack();
            } else {
                throw new Error(response.data.message);
            }
        } catch (error) {
            console.error('Error updating category:', error);
            toast.error('Failed to update category');
        }
    };

    return (
        <div className='p-8 rounded-lg shadow-md bg-gray-100'>
        <form onSubmit={handleSubmit} className='flex flex-col px-16'>
          <div className="mb-4">
            <label htmlFor="category" className="block text-gray-700 font-semibold mb-2">Category :</label>
            <input
              type="text"
              id="category"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
            />
          </div>
          {/* <div className="mb-4">
            <label htmlFor="category" className="block text-gray-700 font-semibold mb-2">Logo :</label>
            <input
              type="file"
              id="category"
              onChange={(e) => setCategoryLogo(e.target.files[0])}
              className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
            />
          </div> */}
          <div className='flex justify-between'>
            <div className='p-4 border-r-4 w-1/2'>
              <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Admin Form Builder</h2>
              <div className="mb-4">
                <label htmlFor="fieldName" className="block text-gray-700 font-semibold mb-2">Field Name:</label>
                <input
                  type="text"
                  id="fieldName"
                  value={fieldName}
                  onChange={(e) => setFieldName(e.target.value)}
                  className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="fieldType" className="block text-gray-700 font-semibold mb-2">Field Type:</label>
                <select
                  id="fieldType"
                  value={fieldType}
                  onChange={(e) => setFieldType(e.target.value)}
                  className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
                >
                  <option value="text">Text</option>
                  <option value="email">Email</option>
                  <option value="number">Number</option>
                  <option value="file">File</option>
                </select>
              </div>
              <button type="button" onClick={addField} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Add Field</button>
            </div>
            <div className='p-4 border-l-4 w-1/2'>
              <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Form Preview</h2>
              {formFields.map((field, index) => (
                <div key={index} className="mb-4">
                  <label htmlFor={field.name} className="block text-gray-700 font-semibold mb-2">{field.name}</label>
                  <input
                    type={field.type}
                    id={field.name}
                    name={field.name}
                    className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
                  />
                  <button type="button" onClick={() => removeField(index)} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mt-2">Remove</button>
                </div>
              ))}
            </div>
          </div>
          <div className='px-4'>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-4">Update</button>
          </div>
        </form>
      </div>
    );
}

export default EditCategory;
