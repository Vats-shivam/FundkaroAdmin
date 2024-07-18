import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import view from "../assets/view.svg";
import hidden from "../assets/hidden.svg";
import google from "../assets/google.png";
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useContext } from 'react';
import { UserContext } from '../context/userContext';
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { app } from '../config/firebase';

function Login(props) {
  const auth = getAuth(app)
  const navigate = useNavigate();
  const [hidePassword, setHidePassword] = useState(true);
  const [user, setUser] = useState({ email: "", password: "" })
  const { setCurrentUser } = useContext(UserContext);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = user;
    try {

      const { data } = await axios.post('/api/auth/signin', {
        email,
        password
      })
      if (!data.success) {
        toast.error(data.message);
      }
      else {
        toast.success("User login successful")

        
        const { success, ...rest } = data;
        setCurrentUser({ email: rest.email, profilePicture: rest.profilePicture, role: rest.role, refCode: rest.refCode, id: rest._id ,isVerified:rest.isVerified,isProfileCompleted:rest.isProfileCompleted,isKYCVerified:rest.isKYCVerified});
        setUser({ email: "", password: "" })
        localStorage.setItem('token', rest.token);
        rest.role=='User'?navigate('/user/dashboard'):navigate('/admin');
      }
    } catch (error) {
      console.log(error);
    }
  };
  const login = async () => {
    const provider = new GoogleAuthProvider()
    provider.setCustomParameters({ prompt: 'select_account' })
    try {
      const resultsFromGoogle = await signInWithPopup(auth, provider);
      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: resultsFromGoogle.user.displayName,
          email: resultsFromGoogle.user.email,
          googlePhotoUrl: resultsFromGoogle.user.photoURL,
          accessToken: resultsFromGoogle.user.uid
        }),
      })
      const data = await res.json();

      if (res.ok) {
        toast.success("User is registered");
        setCurrentUser({ email: data.email, profilePicture: data.profilePicture, role: data.role, refCode: data.refCode, id: data._id ,isVerified:data.isVerified});
        localStorage.setItem('token', data.token);
        if(data.role=='Admin'){
          navigate('/admin');
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={`flex flex-col w-full h-full ${props.loginStyles}`}>
      <div className="p-2 bg-transparent">
        <h1 className="text-white font-extrabold text-4xl">Welcome</h1>
        <p className="text-white font-normal text-2xl">Admin Login</p>
      </div>
      <form
        onSubmit={handleSubmit}
        className="bg-white border-solid border-black shadow-2xl py-12 px-8 flex flex-col rounded-3xl"
      >
        <div className="flex border border-blue-500 rounded-lg focus:border-primaryStart px-3 m-2">
          <input
            type="text"
            placeholder="Email"
            value={user.email}
            onChange={(e) => {
              setUser((prev) => {
                return { ...prev, email: e.target.value };
              });
            }}
            className="py-4 px-3 w-full  placeholder-blue-500 focus:outline-none"
          />
        </div>
        <div className="flex border border-blue-500 rounded-lg focus:border-primaryStart px-3 m-2">
          <input
            type={hidePassword ? "password" : "text"}
            placeholder="Password"
            value={user.password}
            onChange={(e) => {
              setUser((prev) => {
                return { ...prev, password: e.target.value };
              });
            }}
            className="w-[90%] py-4 px-3 placeholder-blue-500 focus:outline-none"
          />
          <img
            src={`${hidePassword ? hidden : view}`}
            className="p-1"
            width={"10%"}
            alt="showPasswordIcon"
            onClick={() => {
              setHidePassword((prev) => {
                return !prev;
              });
            }}
          />
        </div>
        {/* <div className="flex justify-between m-2">
          <div className="w-[40%]">
            <input type="checkbox" id="rememberMe" className="m-1" />
            <label htmlFor="rememberMe">Remember me</label>
          </div>
          <Link to="../user/forget" className="text-blue-500">
            Forget Password?
          </Link>
        </div> */}
        {/* <div className="flex text-lg m-2">
          <p className="mr-2">New Here?</p>
          <Link to="../user/register" className="text-blue-500">
            Register now
          </Link>
        </div> */}
        <button
          type="submit"
          className=" m-2 border border-blue-500 rounded-xl p-3 hover:bg-lightPrimary focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 active:bg-darkPrimary"
        >
          LOGIN
        </button>
        {/* <span className="m-2 ">Or</span> */}
        {/* <div className="border m-2 border-blue-500 h-14 rounded-xl p-2 hover:bg-lightPrimary focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 active:bg-darkPrimary text-center flex items-center justify-center" onClick={login}>
          <img src={google} alt="google-sign-in" width={"8%"} />
          Sign in with Google
        </div> */}
      </form>
    </div>
  );
}

export default Login;
