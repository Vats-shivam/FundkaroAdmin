import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/userContext'
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import alert from "../assets/alert.png"
import axios from 'axios';


const UserApplication = () => {
  const { currentuser } = useContext(UserContext);
  const [formFields, setFormFields] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  const fetchForm = async () => {
    try {
      const { data } = await axios.post("/api/category/find", {
        id: location.state._id
      })
      if(!data){
        throw "Internal Server Error";
      }
      setFormFields(data.formFields);
      console.log(formFields);
    }
    catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchForm();
  }, []);
  const [formData, setFormData] = useState({userId:currentuser.id,categoryId:location.state._id});

  const handleChange = (e, fieldName) => {
    const value = e.target.type === 'file' ? e.target.files[0] : e.target.value;
    setFormData({ ...formData, [fieldName]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send formData to the backend
      console.log('Form data:', formData);
      // Reset form after submission
      setFormData({});
      // Optionally, display a success message or redirect the user
    } catch (error) {
      console.error('Error submitting form:', error);
      // Optionally, display an error message to the user
    }
  };
  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-md shadow-md">
      <form onSubmit={handleSubmit}>
        {formFields&&formFields.map((field, index) => (
          <div key={index} className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={field._id}>
              {field.name}
            </label>
            {field.type === 'file' ? (
              <input
                type="file"
                id={field._id}
                name={field.name}
                onChange={(e) => handleChange(e, field.name)}
                className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md p-2 w-full"
              />
            ) : (
              <input
                type={field.type}
                id={field._id}
                name={field.name}
                value={formData[field.name] || ''}
                onChange={(e) => handleChange(e, field.name)}
                className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md p-2 w-full"
              />
            )}
          </div>
        ))}
        <button
          type="submit"
          className="bg-indigo-500 text-white rounded-md px-4 py-2 hover:bg-indigo-600 transition duration-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default UserApplication