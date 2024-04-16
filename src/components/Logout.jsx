import React from 'react'
import { useContext } from 'react';
import { UserContext } from '../context/userContext';
import VectorLogout from "../assets/VectorLogout.svg";
import { useNavigate } from 'react-router-dom';
function Logout({className}) {
  const {setCurrentUser} =useContext(UserContext);
  const navigate =useNavigate();
  const Logout = async () => {
    setCurrentUser({ email: "", profilePicture: "", role: "", refCode: "", id: "" });
    localStorage.removeItem('token');
    navigate('/user/login');
  };

  return (
    <div className={`${className} border border-blue-600 p-4 rounded-lg flex items-center justify-center`} onClick={Logout}>
      <img className="inline-block" src={VectorLogout}></img>
      <div className='pl-4'>Logout</div>
    </div>
  )
}

export default Logout