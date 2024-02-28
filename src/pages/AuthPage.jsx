import React from "react";
import heroImg from "../assets/heroImg.png";
import Login from "../components/Login";
// import { Outlet } from 'react-router-dom'

function AuthPage({ children }) {
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
      <div className="grid grid-cols-1 xl:grid-cols-7 xl:gap-[1rem] w-full px-32 xl:px-0 absolute inset-0 top-[40%]">
        <div className="hidden xl:block col-span-4 2xl:pl-20">
          <img src={heroImg} alt="heroImg" className="w-[42rem]" />
        </div>
        <div className="flex flex-row justify-center items-center w-full col-span-1 xl:col-span-3 px-40 xl:pr-20 xl:px-0 2xl:px-20 pb-16">
          {children}
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
