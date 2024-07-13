import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/userContext'
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';


const UserApplication = () => {
  const { currentuser } = useContext(UserContext);
  const [category,setCategory] = useState("");
  const [formFields, setFormFields] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  const fetchForm = async () => {
    try {
      const { data } = await axios.post("/api/category/find", {
        id: location.state.category
      })
      if(!data){
        throw "Internal Server Error";
      }
      setFormFields(data.formFields);
      setCategory(data.category);
    }
    catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    console.log(location.state);
    if(!location.state){
      navigate('/user/dashboard')
    }
    location.state && fetchForm();
  }, []);
  const [formData, setFormData] = useState({});

  const handleChange = (e, fieldName) => {
    const value = e.target.type === 'file' ? e.target.files[0] : e.target.value;
    setFormData({ ...formData, [fieldName]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(location.state.loans);
      console.log('Form data:', formData);
      console.log(location.state.category,currentuser.id);
      const newData=Object.entries(formData).map(([name, value]) => ({
        name,
        value
      }));
      const hasFileObject = newData.some(item => item.value instanceof File);
      if (hasFileObject) {
        throw 'Unable to submit your application. Make sure to upload each files before submitting application';
      }
      const {data} = await axios.post('/api/application/apply',{
        userId:currentuser.id,
        categoryId:location.state.category,
        loans:location.state.loans,
        formFields:newData
      })
      console.log(data);
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error(error);
    }
  };
  const handleFileUpload = async(index)=>{;
    const file = formData[formFields[index].name]
    const fileData = new FormData();
    fileData.append('file',file);

    try{
      const {data} = await axios.post('/api/file/upload',fileData,{
        headers:{
          'Content-Type':'multipart/form-data'
        }
      });
      console.log(data);
      if(data.status){
        setFormData({ ...formData, [formFields[index].name]: data.fileName });
      }
      else{
        toast.error('Retry Upload Failed');
      }
    }
    catch(error){
      toast.error('Internal server Error');
    }
  }
  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-md shadow-md">
      <h2 className='text-3xl font-bold font-primaryFont mb-4'>Applying for {category}</h2>
      <form onSubmit={handleSubmit}>
        {formFields&&formFields.map((field, index) => (
          <div key={index} className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={field._id}>
              {field.name}
            </label>
            {field.type === 'file' ? (
              <div className='flex'>
              <input
                type="file"
                id={field._id}
                name={field.name}
                onChange={(e) => handleChange(e, field.name)}
                className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md p-2"
              />
              <button onClick={()=>{
                handleFileUpload(index);
              }} className='bg-indigo-500 text-white rounded-md px-4 py-2 hover:bg-indigo-600 transition duration-300'>Upload</button>
              </div>
            ) : (
              <input
                type={field.type}
                id={field._id}
                name={field.name}
                value={formData[field.name] || ''}
                onChange={(e) => handleChange(e, field.name)}
                className="border-gray-300 border focus:border-indigo-500 focus:ring-indigo-500 rounded-md p-2 w-full"
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