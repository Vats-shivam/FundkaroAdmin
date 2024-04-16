import React, { useState } from 'react'
import Input from '../components/Input';
const CompleteProfile = ({ classes }) => {
  const [formData, setFormData] = useState({ name: "", aadharNo: "", panNo: "",dob:""});
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    setFormData({ name: "", aadharNo: "", panNo: "",dob:"" })
  }
  return (
    <>
      <form onSubmit={handleSubmit} className={`border border-blue-950 bg-lightPrimary rounded-lg p-2 ${classes}`}>
        <div className='flex border border-blue-500 rounded-lg focus:border-primaryStart px-3 m-2 py-2 bg-white'>
          <Input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Full Name" className="" px='px-1' />
        </div>
        <div className='flex border border-blue-500 rounded-lg focus:border-primaryStart px-3 m-2 py-2 bg-white'>
          <Input type="text" value={formData.aadharNo} onChange={(e) => setFormData({ ...formData, aadharNo: e.target.value })} placeholder="Aadhar No..." className="" px='px-1' />
        </div>
        <div className='flex border border-blue-500 rounded-lg focus:border-primaryStart px-3 m-2 py-2 bg-white'>
          <Input type="text" value={formData.panNo} onChange={(e) => setFormData({ ...formData, panNo: e.target.value })} placeholder="Pan No.." className="" px='px-1' />
        </div>
        <div className='flex border border-blue-500 rounded-lg focus:border-primaryStart px-3 m-2 py-2 bg-white'>
          <Input type="date" value={formData.dob} onChange={(e) => setFormData({ ...formData, dob: e.target.value })} placeholder="Date of Birth" className="" px='px-1' />
        </div>
        <div className='flex justify-center px-4 py-2 m-2 w-1/2 bg-darkPrimary rounded-lg'>
          <button className="text-xl text-white" type="submit">Complete Your Profile</button>
        </div>
      </form>
    </>
  )
}

export default CompleteProfile 