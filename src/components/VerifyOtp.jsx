import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/userContext';
import OTPModal from './OTPModal';
import { toast } from 'react-hot-toast'
import { Toaster } from 'react-hot-toast'
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';


function VerifyOtp() {
  const location = useLocation();
  const { currentuser, setCurrentUser } = useContext(UserContext);
  const [phoneNo, setPhoneNo] = useState(location.state?.phoneNo);
  const [verified, setVerified] = useState({ phoneNo: false, email: false });
  const [email, setEmail] = useState(location.state?.email);
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
    phoneNumber = phoneNumber.trim();

    // Regular expression pattern to match Indian phone numbers
    const indianPhoneNumberPattern = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$/;

    // Check if the phone number matches the pattern
    return indianPhoneNumberPattern.test(phoneNumber);
  }

  const openPhoneOTPModal = async () => {
    if (!isValidPhoneNumber(String(phoneNo))) {
      return toast.error("Phone number is invalid")
    }
    setActiveInput('phone');
    const { data } = await axios.post('/api/otp/phone/send-otp', {
      phone: "+91"+phoneNo
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

    if (!isValidEmail(email)) {
      return toast.error("Email is invalid");
    }
    setActiveInput('email');
    const { data } = await axios.post('/api/otp/email/send-otp', { email });
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
      const { data } = await axios.post("/api/otp/phone/verify-otp", { phone: "+91"+phoneNo, otp, id: currentuser.id })
      if (data.error) {
        toast.error(data.error);
      }
      else {
        toast.success(data.status);
        setVerified((prev) => ({ ...prev, phoneNo: true }))

      }
    }
    else {
      const { data } = await axios.post("/api/otp/email/verify-otp", { email, otp, id: currentuser.id })
      console.log(data);
      if (data.error) {
        toast.error(data.error);
      }
      else {
        toast.success(data.status);
        setVerified((prev) => ({ ...prev, email: true }))
      }

    }
    // Close the modal after verification
    handleCloseOTPModal();
    setOTP('');

  };
  const checkVerification = async () => {
    try {

      const res = await axios.post('/api/user/verified', { userId: currentuser.id });
      console.log(res);
      if (res.data.status) {
        navigate('/user/kyc-form');
      }
    }
    catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    checkVerification();
  }, [verified.phoneNo, verified.email]);

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
          <>
              <div className='py-4 text-blue-500 border-r-2 pr-2'>+91</div>
              <input type="number" placeholder="Phone No..." value={phoneNo} onChange={(e) => { setPhoneNo(e.target.value) }} className='py-4 px-3 w-full  placeholder-blue-500 focus:outline-none' />
          </>
          }
        </div>
        <button disabled={verified.phoneNo} className=' m-2 border border-blue-500 rounded-xl p-3 hover:bg-lightPrimary focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 active:bg-darkPrimary' onClick={openPhoneOTPModal} >Verify</button>
        <div className="flex border border-blue-500 rounded-lg focus:border-primaryStart px-3 m-2">
          {email && <div className='py-4 px-3 w-full text-blue-500 '>{email}</div>}
          {!email &&
            <input type="email" placeholder="Email" value={email} className='py-4 px-3 w-full  placeholder-blue-500 focus:outline-none' onChange={(e) => { setEmail(e.target.value) }} />
          }

        </div>
        <button disabled={verified.email} className=' m-2 border border-blue-500 rounded-xl p-3 hover:bg-lightPrimary focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 active:bg-darkPrimary' onClick={openEmailOTPModal} >Verify</button>
        <OTPModal isOpen={isOTPModalOpen} onClose={handleCloseOTPModal} onVerify={handleVerifyOTP} msg={msg} />
      </div>
    </div>
  )
}

export default VerifyOtp