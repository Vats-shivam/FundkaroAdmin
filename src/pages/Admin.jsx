import React, { useEffect } from 'react'
import NameNavbar from '../components/NameNavbar';
import SideDashboard from '../components/SideDashboard';
import { useState } from 'react';
import { Toaster } from 'react-hot-toast'
import { useContext } from 'react';
import VectorHome from "../assets/Vectorhome.svg";
import VectorTools from "../assets/VectorTools.svg"
import VectorResources from "../assets/VectorResources.svg"
import VectorLoanMaster from "../assets/VectorLoanMaster.svg"
import VectorRefferal from "../assets/VectorRef.svg"
import AdminNavbar from '../components/AdminNavbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Admin(props) {
  const [Open, setOpen] = useState((window.innerWidth > 600) ? true : false);
  const navigate = useNavigate();
  // const { currentuser } = useContext(UserContext)
  const autoLogin = async () => {
    try{
      const {data} = await axios.get('/profile');
      // console.log(data);
      if(data){
        console.log(data);
        // setCurrentUserDetail(data);
        if(data.role==='user')
        navigate('/user/dashboard');
      }
    }catch(error){
      console.log(error);
    }
  }
  useEffect(()=>{autoLogin()},[]);

  return (
    <div>

      <Toaster position="top-center" />
      <NameNavbar Open={Open} setOpen={setOpen} ShowBackarrow={props.ShowBackarrow ? true : false} />
      <SideDashboard Open={Open}>
        <AdminNavbar/>
      </SideDashboard>
      <div className={'mt-20 font-primaryFont transition-all duration-1000 ' + (Open && (window.innerWidth > 600) ? 'ml-72 slide-in' : 'slide-out')}>
        {props.children}
        {/* {currentuser && (<h2>{currentuser.email}</h2>)} */}
      </div>
    </div>
  )
}

export default Admin