import React, { useState } from 'react';

const OTPModal = ({ isOpen, onClose, onVerify ,msg}) => {
  const [otp, setOTP] = useState('');

  const handleChange = (e) => {
    setOTP(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onVerify(otp,setOTP);
  };

  return (
    <div className={`fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-50 ${isOpen ? '' : 'hidden'}`}>
      <div className="bg-white p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">OTP Verification</h2>
        <h3 className=' text-xl font-bold text-blue-500'>{msg}</h3>
        <span className='text-l text-red-600'>PLEASE DO NOT REFRESH THIS PAGE</span>
        <form onSubmit={handleSubmit}>
          <label htmlFor="otp" className="block mb-2">Enter OTP:</label>
          <input type="text" id="otp" name="otp" value={otp} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4" />
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 mr-2">Verify</button>
          <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600">Close</button>
        </form>
      </div>
    </div>
  );
};

export default OTPModal;