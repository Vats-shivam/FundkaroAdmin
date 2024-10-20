import React, { useState, useContext } from 'react';
import Input from "./Input";
import { UserContext } from '../context/userContext';
import toast from 'react-hot-toast';
import axios from 'axios';
import FormBuilder from "./FormBuilder";

const initialNodes = [
  {
    id: "1",
    type: "input",
    data: { label: "Start" },
    position: { x: 5, y: 5 },
  },
];

function AddCategory() {
  const { currentuser } = useContext(UserContext);
  const [formFields, setFormFields] = useState([]);
  const [category, setCategory] = useState('');
  const [categoryLogo, setCategoryLogo] = useState('');
  const [template, setTemplate] = useState();
  const [selectedNode, setSelectedNode] = useState(null);
  const [fieldName, setFieldName] = useState("");
  const [fieldType, setFieldType] = useState("text");

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
    // const data = new FormData();
    // data.append('logo', categoryLogo);
    // data.append('userId', currentuser.id);
    // data.append('category', category);
    // data.append('formFields',template);
    const data = {
      logo:categoryLogo,
      userId:currentuser.id,
      category:category,
      formFields:template
    }

    console.log(data);
    

    // formFields.forEach((field, index) => {
    //   Object.entries(field).forEach(([key, value]) => {
    //     // data.append(`formFields[${index}][${key}]`, value);

    //   });
    // });
    // console.log(template);
    // return;
    // Do something with formFields, like sending them to a backend for processing
    try {
      const response = await axios.post('/api/category/create', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      if (response.data.success) {
        toast.success('Category added successfully')
      }
      else {
        throw response.data.message
      }
    }
    catch (error) {
      console.log(error);
      toast.error("Failed to add new Category");
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
          />
        </div>
        <div className="mb-4">
          <label htmlFor="category" className="block text-gray-700 font-semibold mb-2">Logo :</label>
          <input
            type="file"
            id="category"
            onChange={(e) => setCategoryLogo(e.target.files[0])}
            className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="col-span-2">
          <FormBuilder setTemplate={setTemplate} />
        </div>
        <div className='px-4'>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-4">Create Form</button>
        </div>
      </form>
    </div>
  );
}

export default AddCategory;
