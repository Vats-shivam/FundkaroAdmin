import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/userContext';
import OTPModal from './OTPModal';
import { toast } from 'react-hot-toast'
import { Toaster } from 'react-hot-toast'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function VerifyOtp() {
  const { currentuser, setCurrentUser } = useContext(UserContext);
  const [phoneNo, setPhoneNo] = useState();
  const [email, setEmail] = useState();
  const [formData, setFormData] = useState({ phoneNo: phoneNo, email: email });
  const [isOTPModalOpen, setIsOTPModalOpen] = useState(false);
  const [activeInput, setActiveInput] = useState();
  const [msg, setMsg] = useState('');

  const navigate = useNavigate();
  function isValidEmail(email) {
    // Define a regular expression pattern for valid email addresses
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Test the provided email address against the pattern
    return emailPattern.test(email);
  }

  function isValidPhoneNumber(phoneNumber) {
    // Check if the phone number is a string
    if (typeof phoneNumber !== 'string') {
      return false;
    }

    // Remove any leading or trailing whitespace
    phoneNumber = phoneNumber.trim();

    // Check if the phone number is exactly 10 digits long and doesn't start with a zero
    return phoneNumber.length === 10 && phoneNumber[0] !== '0' && /^\d+$/.test(phoneNumber);
  }

  const openPhoneOTPModal = async () => {
    if (!isValidPhoneNumber(formData.phoneNo)) {
      return toast.error("Phone number is invalid")
    }
    setActiveInput('phone');
    const { data } = await axios.post('/api/otp/phone/send-otp', {
      phone: '+91' + formData.phoneNo
    })
    if (!data.success) {
      toast.error("Internal server error");
    }
    else {
      setMsg("An otp is sent to your Phone.")
      setIsOTPModalOpen(true);
      toast.success("Otp is Sent Successfully");
    }

  };
  const openEmailOTPModal = async () => {
    setFormData((prev)=>{return {...prev,email:currentuser.email}})
    if (!isValidEmail(currentuser.email)) {
      return toast.error("Email is invalid");
    }
    setActiveInput('email');
    const { data } = await axios.post('/api/otp/email/send-otp', { email: currentuser.email });
    if (!data.success) {
      toast.error("Internal Server Error");
    }
    else {
      setMsg("An otp is sent to your Email.")
      setIsOTPModalOpen(true);
      toast.success("Otp is Sent Successfully")
    }

  }

  const handleCloseOTPModal = () => {
    setIsOTPModalOpen(false);
  };

  const handleVerifyOTP = async (otp, setOTP) => {
    // Perform OTP verification logic here
    console.log('Verifying OTP:', otp);
    if (activeInput == 'phone') {
      const { data } = await axios.post("/api/otp/phone/verify-otp", { phone: '+91' + formData.phoneNo, otp, id: currentuser.id })
      if (data.error) {
        toast.error(data.error);
      }
      else {
        toast.success(data.status);
        setPhoneNo(formData.phoneNo);
        const res = await axios.post('/api/user/verified', { id: currentuser.id });
        if(res.data.status){
          navigate('/user/dashboard');
        }
      }
    }
    else {
      const { data } = await axios.post("/api/otp/email/verify-otp", { email: currentuser.email, otp, id: currentuser.id })
      console.log(data);
      if (data.error) {
        toast.error(data.error);
      }
      else {
        toast.success(data.status);
        const res = await axios.post('/api/user/verified', { id: currentuser.id });
        if(res.data.status){
          navigate('/user/dashboard');
        }
      }
    }
    // Close the modal after verification
    handleCloseOTPModal();
    setOTP('');

  };
 
  return (
    <div className={`flex flex-col w-full h-full`}>
      <Toaster position="top-center" />
      <div className="p-2 bg-transparent">
        <h1 className="text-white font-extrabold text-4xl">Welcome</h1>
        <p className="text-white font-normal text-2xl">Verify your Account</p>
      </div>
      <div className="bg-white border-solid border-black shadow-2xl py-12 px-8 flex flex-col justify-around h-full rounded-3xl">
        <div className="flex border border-blue-500 rounded-lg focus:border-primaryStart px-3 m-2">
          {phoneNo && <div className='py-4 px-3 w-full text-blue-500 '>{phoneNo}</div>}
          {!phoneNo &&
            <input type="Number" placeholder="Phone No..." value={formData.phoneNo} onChange={(e) => { setFormData(prev => { return { ...prev, phoneNo: e.target.value } }) }} className='py-4 px-3 w-full  placeholder-blue-500 focus:outline-none' />
          }

        </div>
        <button disabled={phoneNo} className=' m-2 border border-blue-500 rounded-xl p-3 hover:bg-lightPrimary focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 active:bg-darkPrimary' onClick={openPhoneOTPModal} >Verify</button>
        <div className="flex border border-blue-500 rounded-lg focus:border-primaryStart px-3 m-2">
          {email && <div className='py-4 px-3 w-full text-blue-500 '>{email}</div>}
          {!email &&
            <input type="email" placeholder="Email" value={currentuser.email} className='py-4 px-3 w-full  placeholder-blue-500 focus:outline-none' disabled />
          }

        </div>
        <button disabled={email} className=' m-2 border border-blue-500 rounded-xl p-3 hover:bg-lightPrimary focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 active:bg-darkPrimary' onClick={openEmailOTPModal} >Verify</button>
        <OTPModal isOpen={isOTPModalOpen} onClose={handleCloseOTPModal} onVerify={handleVerifyOTP} msg={msg} />
      </div>
    </div>
  )
}

export default VerifyOtp