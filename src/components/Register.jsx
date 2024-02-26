import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import view from "../assets/view.svg";
import hidden from "../assets/hidden.svg";
import google from "../assets/google.svg";

function Register(props) {
  const [hidePassword, setHidePassword] = useState(true);
  const [user, setUser] = useState({ username: "", password: "" })
  const handleSubmit = async (event) => {
    // event.preventDefault();
    // // navigate('/dashboard');

    // try {
    //   const response = await fetch('http://localhost:5000/login', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(user)
    //   });

    //   if (!response.ok) {
    //     throw new Error('Login failed');
    //   }

    //   const userData = await response.json();

    //   // props.setUserData(userData.user);
    //   // navigate("/dashboard")
    // } catch (error) {
    //   console.error('Error during login:', error);
    //   // Handle login failure
    // }
  };
  return (
    <div className={`p-1 flex flex-col w-[25%] h-full ${props.loginStyles}`}>
      <div className='p-2 bg-transparent'>
        <h1 className='text-white font-extrabold text-4xl'>Welcome</h1>
        <p className='text-white font-normal text-2xl'>Register to your Account</p>
      </div>
      <form onSubmit={handleSubmit} className='bg-white border-solid border-black shadow-2xl py-20 px-8 flex flex-col justify-around h-full rounded-3xl'>
        <div className='flex border border-blue-500 rounded-lg focus:border-primaryStart px-3 m-2'>
          <input type="text" placeholder="Username" value={user.username} onChange={(e) => { setUser((prev) => { return { ...prev, username: e.target.value } }) }} className='py-4 px-3 w-full  placeholder-blue-500 focus:outline-none' />
        </div>
        <div className='flex border border-blue-500 rounded-lg focus:border-primaryStart px-3 m-2'>
          <input type={hidePassword ? "password" : "text"} placeholder="Password" value={user.password} onChange={(e) => { setUser((prev) => { return { ...prev, password: e.target.value } }) }} className='w-[90%] py-4 px-3 placeholder-blue-500 focus:outline-none' />
          <img src={`${hidePassword ? hidden : view}`} className='p-1' width={"10%"} alt="showPasswordIcon" onClick={() => { setHidePassword((prev) => { return !prev }) }} />
        </div>
        <div className='flex border border-blue-500 rounded-lg focus:border-primaryStart px-3 m-2'>
          <input type="text" placeholder="Confirm Password" value={user.confPass} onChange={(e) => { setUser((prev) => { return { ...prev, confPass: e.target.value } }) }} className='py-4 px-3 w-full  placeholder-blue-500 focus:outline-none' />
        </div>
        <div className='flex justify-between m-2'>
          <div className='w-1/3 flex justify-between items-center'>
            <input type="checkbox" id="rememberMe" />
            <label htmlFor="rememberMe">Remember me</label>
          </div>
          <a href="">Forgot Password?</a>
        </div>
        <div className='flex text-lg m-2'>
          <p>Already registered?</p>
          <Link to='../user/login' className='text-blue-500'>Login now</Link>
        </div>
        <button type='submit' className=' m-2 border border-blue-500 rounded-xl p-3 hover:bg-lightPrimary focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 active:bg-darkPrimary'>REGISTER</button>
        <span className='m-2 '>Or</span>
        <div className='border m-2 border-blue-500 h-14 rounded-xl p-1 hover:bg-lightPrimary focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 active:bg-darkPrimary text-center flex items-center justify-center'>
          <img src={google} alt="google-sign-in" width={"20%"} />
          Sign in with Google
        </div>
      </form>
    </div>
  )
}

export default Register