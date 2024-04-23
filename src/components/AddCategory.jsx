import React, { useState } from 'react';
import Input from "./Input";

function AddCategory() {
  const [formFields, setFormFields] = useState([]);
  const [fieldName, setFieldName] = useState('');
  const [fieldType, setFieldType] = useState('text');
  const [category, setCategory] = useState('');

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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Do something with formFields, like sending them to a backend for processing
    console.log(formFields);
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
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-4">Create Form</button>
      </form>
    </div>
  );
}

export default AddCategory;
