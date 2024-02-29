import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import view from "../assets/view.svg";
import hidden from "../assets/hidden.svg";
import google from "../assets/google.png";
import axios from 'axios';
import { toast } from 'react-hot-toast'


function Register(props) {
  const navigate = useNavigate()
  const [hidePassword, setHidePassword] = useState(true);
  const [user, setUser] = useState({ email: "", phone: "", password: "", confPass: "" })
  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log("hi");
    const { email, phone, password, confPass } = user;
    try {
      const { data } = await axios.post('/user/register', {
        email, phone, password, confPass
      })
      console.log(data);
      if (data.error) {
        toast.error(data.error);
      }
      else {
        setUser({ email: "", phone: "", password: "", confPass: "" });
      }
      if (data.status) {
        toast.success("User is registered");
        //if email verified
        navigate('/user/dashboard');
        //else
        //navigate('/user/email/verify-otp);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={`p-4 flex flex-col w-full h-full ${props.loginStyles}`}>
      <div className='p-2 bg-transparent'>
        <h1 className='text-white font-extrabold text-4xl'>Welcome</h1>
        <p className='text-white font-normal text-2xl'>Register to your Account</p>
      </div>
      <form onSubmit={handleSubmit} className='bg-white border-solid border-black shadow-2xl py-8 px-8 flex flex-col justify-around h-full rounded-3xl'>
        <div className='flex border border-blue-500 rounded-lg focus:border-primaryStart px-3 m-2'>
          <input type="email" placeholder="Email" value={user.email} onChange={(e) => { setUser((prev) => { return { ...prev, email: e.target.value } }) }} className='py-4 px-3 w-full  placeholder-blue-500 focus:outline-none' />
        </div>
        <div className='flex border border-blue-500 rounded-lg focus:border-primaryStart px-3 m-2'>
          <input type="Number" placeholder="Phone No..." value={user.phone} onChange={(e) => { setUser((prev) => { return { ...prev, phone: e.target.value } }) }} className='py-4 px-3 w-full  placeholder-blue-500 focus:outline-none' />
        </div>
        <div className='flex border border-blue-500 rounded-lg focus:border-primaryStart px-3 m-2'>
          <input type={hidePassword ? "password" : "text"} placeholder="Password" value={user.password} onChange={(e) => { setUser((prev) => { return { ...prev, password: e.target.value } }) }} className='w-[90%] py-4 px-3 placeholder-blue-500 focus:outline-none' />
          <img src={`${hidePassword ? hidden : view}`} className='p-1' width={"10%"} alt="showPasswordIcon" onClick={() => { setHidePassword((prev) => { return !prev }) }} />
        </div>
        <div className='flex border border-blue-500 rounded-lg focus:border-primaryStart px-3 m-2'>
          <input type="text" placeholder="Confirm Password" value={user.confPass} onChange={(e) => { setUser((prev) => { return { ...prev, confPass: e.target.value } }) }} className='py-4 px-3 w-full  placeholder-blue-500 focus:outline-none' />
        </div>
        <div className='flex justify-between m-2'>
          <div className="w-[40%]">
            <input type="checkbox" id="rememberMe" className="m-1" />
            <label htmlFor="rememberMe">Remember me</label>
          </div>
          <Link to='../user/forget' className='text-blue-500'>Forget Password</Link>
        </div>
        <div className='flex text-lg m-2'>
          <p className="mr-2">Already registered?</p>
          <Link to='../user/login' className='text-blue-500'>Login now</Link>
        </div>
        <button type='submit' className=' m-2 border border-blue-500 rounded-xl p-3 hover:bg-lightPrimary focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 active:bg-darkPrimary'>REGISTER</button>
        <span className='m-2 '>Or</span>
        <div className='border m-2 border-blue-500 h-14 rounded-xl p-2 hover:bg-lightPrimary focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 active:bg-darkPrimary text-center flex items-center justify-center'>
          <img src={google} alt="google-sign-in" width={'8%'} />
          Sign in with Google
        </div>
      </form>
    </div>
  )
}

export default Register