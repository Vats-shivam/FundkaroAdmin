import React, { useState, useContext } from 'react';
import { UserContext } from '../context/userContext';
import toast from 'react-hot-toast';
import axios from 'axios';
import FormBuilder from "./FormBuilder";
// import { console } from 'inspector';

function AddCategory() {
  const { currentuser } = useContext(UserContext);
  const [category, setCategory] = useState('');
  const [categoryLogo, setCategoryLogo] = useState('');
  const [template, setTemplate] = useState({
    nodes: [],
    edges: []
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(template);
    if (!category || !categoryLogo || !template.nodes.length) {
      toast.error('Please fill all required fields');
      return;
    }

    // Check if there's a start node
    // const hasStartNode = template.nodes.some(node => node.data?.isStartNode);
    // console.log("hi",hasStartNode);
    // if (!hasStartNode) {
    //   toast.error('Please mark one node as the start node');
    //   return;
    // }

    const formData = new FormData();
    formData.append('logo', categoryLogo);
    formData.append('userId', currentuser.id);
    formData.append('category', category);
    formData.append('formFields', JSON.stringify(template));

    try {
      const response = await axios.post('/api/category/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      if (response.data.success) {
        toast.success('Category added successfully');
        setCategory('');
        setCategoryLogo('');
        setTemplate({ nodes: [], edges: [] });
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Failed to add new Category");
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
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="categoryLogo" className="block text-gray-700 font-semibold mb-2">Logo :</label>
          <input
            type="file"
            id="categoryLogo"
            onChange={(e) => setCategoryLogo(e.target.files[0])}
            className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
            accept="image/*"
            required
          />
        </div>
        <div className="col-span-2">
          <FormBuilder setTemplate={setTemplate} template={template} />
        </div>
        <div className='px-4'>
          <button 
            type="submit" 
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-4"
          >
            Create Category
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddCategory;
