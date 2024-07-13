import React from 'react'
import { Toaster } from 'react-hot-toast'

const UserKYCForm = () => {
  return (
    <div className={`flex flex-col w-full h-full`}>
      <Toaster position="top-center" />
      <div className="p-2 bg-transparent">
        <h1 className="text-white font-extrabold text-4xl">Welcome</h1>
        <p className="text-white font-normal text-2xl">Complete Your KYC Here</p>
      </div>
      <div className="bg-white border-solid border-black shadow-2xl py-12 px-8 flex flex-col justify-around h-full rounded-3xl">
        <div className="flex border border-blue-500 rounded-lg focus:border-primaryStart px-3 m-2">
          <input type="number" placeholder="Enter Your Aadhar No ..." className='py-4 px-3 w-full  placeholder-blue-500 focus:outline-none' />
        </div>
        <button className=' m-2 border border-blue-500 rounded-xl p-3 hover:bg-lightPrimary focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 active:bg-darkPrimary'>Verify</button>
        <div className="flex border border-blue-500 rounded-lg focus:border-primaryStart px-3 m-2">
          <input type="number" placeholder="Enter your Pan No ..." className='py-4 px-3 w-full  placeholder-blue-500 focus:outline-none' />
        </div>
        <button className=' m-2 border border-blue-500 rounded-xl p-3 hover:bg-lightPrimary focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 active:bg-darkPrimary'>Verify</button>
      </div>
    </div>
  )
}

export default UserKYCForm