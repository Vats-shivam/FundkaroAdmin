
import React, { useEffect, useState } from 'react'
import heroImg from "../assets/heroImg.png"
import {Toaster} from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../context/userContext';
import axios from 'axios';

// import { Outlet } from 'react-router-dom'

function AuthPage({ children }) {
  const navigate = useNavigate();
  const { currentuser,setCurrentUser} = useContext(UserContext);
  const[authorised,setAuthorised]= useState(false);

useEffect(()=>{
if(currentuser.email&&currentuser.isVerified&&currentuser.isKyc){
  navigate('/user/dashboard');
}
},[currentuser])
  return (
    <div className="w-full h-full relative">
      <div className="w-full flex flex-col bg-gradient-to-r from-darkPrimary to-lightPrimary pb-[16rem] relative px-16 pt-6">
        <div className="w-full title text-white text-[2.5rem] font-primaryFont font-bold relative">
          fundka₹o
        </div>
        <div className="w-full title text-white text-[1.5rem] font-primaryFont font-normal ">
          Multiple loan choice Instant benefits
        </div>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-7 xl:gap-[1rem] w-full lg:px-32 xl:px-0 absolute inset-0 top-[40%] xl:top-[24%]">
        <div className="hidden xl:block col-span-4 2xl:pl-20">
          <img src={heroImg} alt="heroImg" className="w-[42rem]" />
        </div>
        <div className="flex flex-row justify-center items-center w-full col-span-1 xl:col-span-3 px-36 xl:pr-20 xl:px-0 2xl:px-36 pb-16">
          <Toaster position='top-center'/>
          {children}
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
