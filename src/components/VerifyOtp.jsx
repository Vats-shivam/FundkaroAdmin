import React, { useState } from 'react'

function VerifyOtp() {
  const [phoneNo, setPhoneNo] = useState(9939299879);
  const [email, setEmail] = useState();
  return (
    <div className={`flex flex-col w-full h-full`}>
      <div className="p-2 bg-transparent">
        <h1 className="text-white font-extrabold text-4xl">Welcome</h1>
        <p className="text-white font-normal text-2xl">Verify your Account</p>
      </div>
      <form className="bg-white border-solid border-black shadow-2xl py-12 px-8 flex flex-col justify-around h-full rounded-3xl">
        <div className="flex border border-blue-500 rounded-lg focus:border-primaryStart px-3 m-2">
          {phoneNo && <div className='py-4 px-3 w-full text-blue-500 '>{phoneNo}</div>}
          {!phoneNo &&
            <input type="Number" placeholder="Phone No..." value={phoneNo} onChange={(e) => { setUser(e.target.value) }} className='py-4 px-3 w-full  placeholder-blue-500 focus:outline-none' />
          }

        </div>
        <button className=' m-2 border border-blue-500 rounded-xl p-3 hover:bg-lightPrimary focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 active:bg-darkPrimary'>Verify</button>
        <div className="flex border border-blue-500 rounded-lg focus:border-primaryStart px-3 m-2">
          {email && `${email}`}
          {!email &&
            <input type="email" placeholder="Email" value={email} onChange={(e) => { setEmail(e.target.value) }} className='py-4 px-3 w-full  placeholder-blue-500 focus:outline-none' />
          }

        </div>
        <button className=' m-2 border border-blue-500 rounded-xl p-3 hover:bg-lightPrimary focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 active:bg-darkPrimary'>Verify</button>
      </form>
    </div>
  )
}

export default VerifyOtp