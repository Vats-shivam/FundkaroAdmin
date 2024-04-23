import React, { useState } from 'react'
import Input from './Input';
function AddOffer() {
  const [offer, setOffer] = useState({ msg: '', code: '' });
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(offer);
  }
  return (
    <div className='p-8 rounded-lg shadow-md bg-gray-100'>
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Add your Offer</h2>
      <form onSubmit={handleSubmit} className='w-full max-w-lg mx-auto grid grid-cols-1 gap-6'>
        <div className="mb-4">
          <label htmlFor="msg" className="block text-gray-700 font-semibold mb-2">Offer Message:</label>
          <input
            type="text"
            id="msg"
            value={offer.msg}
            onChange={(e) => setOffer((prev)=>({...prev,msg:e.target.value}))}
            className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="code" className="block text-gray-700 font-semibold mb-2">Offer Code:</label>
          <input
            type="Number"
            id="code"
            value={offer.code}
            onChange={(e) => setOffer((prev)=>({...prev,code:e.target.value}))}
            className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default AddOffer