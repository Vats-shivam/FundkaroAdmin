import React from 'react'
import heroImg from "../assets/heroImg.png"
import Login from '../components/Login'
// import { Outlet } from 'react-router-dom'

function AuthPage({children}) {
  return (
    <div className='w-screen h-screen min-h-[50rem]'>
    <div className='w-full flex flex-col h-2/5 bg-gradient-to-r from-darkPrimary to-lightPrimary'>
      <div className="w-1/2 title text-white text-[3rem] font-primaryFont font-bold relative left-[5rem] top-[1rem]">fundka₹o</div>
      <div className="w-1/2 title text-white text-[2rem] font-primaryFont font-normal relative left-[5rem] top-[1rem]">Multiple loan choice Instant benefits</div>

    </div>
    <div className='h-3/5 w-full flex justify-between'>
        <img src={heroImg} alt="heroImg" className='relative bottom-[14rem] left-[5rem] w-[42rem]' />
        {/* <Outlet />
        {} */}
        {children}
        
    </div>
  </div>
  )
}

export default AuthPage