import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import view from "../assets/view.svg";
import hidden from "../assets/hidden.svg";
import google from "../assets/google.png";
import axios from 'axios';
import { toast } from 'react-hot-toast'
import { useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../context/userContext';
import { useEffect } from 'react';
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { app } from '../config/firebase';

function Register(props) {
  const auth = getAuth(app);
  const navigate = useNavigate()
  const [hidePassword, setHidePassword] = useState(true);
  const [user, setUser] = useState({  email: "",phoneNo:"",  password: "", confPass: "", referrer: "" })
  const {currentuser, setCurrentUser } = useContext(UserContext);
  const location = useLocation();

  function validatePassword(password) {
    // Check if password length is at least 8 characters
    if (password.length < 8) {
        return "Password must be at least 8 characters long";
    }

    // Check if password contains at least one uppercase letter
    if (!/[A-Z]/.test(password)) {
        return "Password must contain at least one uppercase letter";
    }

    // Check if password contains at least one lowercase letter
    if (!/[a-z]/.test(password)) {
        return "Password must contain at least one lowercase letter";
    }

    // Check if password contains at least one special character
    if (!/[^A-Za-z0-9]/.test(password)) {
        return "Password must contain at least one special character";
    }

    // Check if password contains at least one number
    if (!/\d/.test(password)) {
        return "Password must contain at least one number";
    }

    // If all conditions pass, return null indicating no warning
    return null;
}
  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email,phoneNo,password, confPass, referrer } = user;

    const msg=validatePassword(password);
    if(msg){
      return toast.error(msg);
    }
    if(password!==confPass){
      return toast.error("Confirm password is not same as password")
    }
    try {
      
      const {data} = await axios.post('/api/auth/signup', {
         email,phoneNo:"+91"+phoneNo, password, referrer
      })
      if (!data.success) {
        toast.error(data.message);
      }
      else {
        toast.success("User is registered");
        const {success,...rest}=data;
        setCurrentUser({ email: data.email, profilePicture: data.profilePicture, role: data.role, refCode: data.refCode, id: data._id ,isVerified:data.isVerified, isProfileCompleted:data.isProfileCompleted})
        setUser({  email: "",  password: "", confPass: "", referrer: "" });
        localStorage.setItem('token',rest.token);
        navigate('/user/register/verify-otp',{state:{phoneNo,email}});
      }
    } catch (error) {
      toast.error("Internal Error");
      console.log(error);
    }
  };
  const register = async () => {
    const provider = new GoogleAuthProvider()
    provider.setCustomParameters({ prompt: 'select_account' })
    try {
      const resultsFromGoogle = await signInWithPopup(auth, provider);
      console.log(resultsFromGoogle);
      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: resultsFromGoogle.user.displayName,
          email: resultsFromGoogle.user.email,
          googlePhotoUrl: resultsFromGoogle.user.photoURL,
          accessToken:resultsFromGoogle.user.uid
        }),
      })
      const data= await res.json();

      if(res.ok){
        toast.success("User is registered");
        localStorage.setItem('token',data.token);
        if (data.role == 'User' && data.isVerified) {
          navigate('/user/dashboard')
        }
        else if (data.role == 'User') {
          navigate('/user/register/verify-otp',{state:{phoneNo:'',email:''}})
        }
        if(data.role=='Admin'){
          navigate('/admin');
        }

      }

    } catch (err) {
      console.log(err);
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
          <input type="email" placeholder="Email" value={user.email} onChange={(e) => { setUser((prev) => { return { ...prev, email: e.target.value } }) }} className='py-4 px-3 w-full  placeholder-blue-500 focus:outline-none'/>
        </div>
        <div className='flex border border-blue-500 rounded-lg focus:border-primaryStart px-3 m-2'>
          <div className='py-4 text-blue-500 border-r-2 pr-2'>+91</div>
          <input type="number" placeholder="Phone No" value={user.phoneNo} onChange={(e) => { setUser((prev) => { return { ...prev, phoneNo: e.target.value } }) }} className='py-4 px-3 w-full  placeholder-blue-500 focus:outline-none'/>
        </div>
        <div className='flex border border-blue-500 rounded-lg focus:border-primaryStart px-3 m-2'>
          <input type={hidePassword ? "password" : "text"} placeholder="Password" value={user.password} onChange={(e) => { setUser((prev) => { return { ...prev, password: e.target.value } }) }} className='w-[90%] py-4 px-3 placeholder-blue-500 focus:outline-none' required />
          <img src={`${hidePassword ? hidden : view}`} className='p-1' width={"8%"} alt="showPasswordIcon" onClick={() => { setHidePassword((prev) => { return !prev }) }} />
        </div>
        <div className='flex border border-blue-500 rounded-lg focus:border-primaryStart px-3 m-2'>
          <input type="text" placeholder="Confirm Password" value={user.confPass} onChange={(e) => { setUser((prev) => { return { ...prev, confPass: e.target.value } }) }} className='py-4 px-3 w-full  placeholder-blue-500 focus:outline-none' required/>
        </div>
        <div className='flex border border-blue-500 rounded-lg focus:border-primaryStart px-3 m-2'>
          <input type="text" placeholder="Refferal code (optional)" value={user.referrer} onChange={(e) => { setUser((prev) => { return { ...prev, referrer: e.target.value } }) }} className='py-4 px-3 w-full  placeholder-blue-500 focus:outline-none' />
        </div>
        <div className='flex justify-between m-2'>
          <div className="w-[40%]">
            <input type="checkbox" id="rememberMe" className="m-1" />
            <label htmlFor="rememberMe">Remember me</label>
          </div>
        </div>
        <div className='flex text-lg m-2'>
          <p className="mr-2">Already registered?</p>
          <Link to='../user/login' className='text-blue-500'>Login now</Link>
        </div>
        <button type='submit' className=' m-2 border border-blue-500 rounded-xl p-3 hover:bg-lightPrimary hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 active:bg-darkPrimary'>REGISTER</button>
        <span className='m-2 '>Or</span>
        <div className='border m-2 border-blue-500 h-14 rounded-xl p-2 hover:bg-lightPrimary focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 active:bg-darkPrimary text-center flex items-center justify-center' onClick={register}>
          <img src={google} alt="google-sign-in" width={'8%'} />
          Sign in with Google
        </div>
      </form>
    </div>
  )
}

export default Register