import React, { useContext, useState } from 'react'
import Input from './Input';
import axios from 'axios';
import { UserContext } from '../context/userContext';
import toast from 'react-hot-toast';
function AddOffer() {
  const {currentuser} = useContext(UserContext)
  const [offer, setOffer] = useState({ offerMsg: '', offerCode: '' });
  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      const response = await axios.post('/api/offer/create',{userId:currentuser.id,...offer});
      if(response.data.success){
        toast.success("Offer Created");
        setOffer({ offerMsg: '', offerCode: '' });
      }
      else{
        throw response;
      }
    }
    catch(error){
      console.log(error);
      toast.error("An error Ocurred while adding Offer");
    }
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
            value={offer.offerMsg}
            onChange={(e) => setOffer((prev)=>({...prev,offerMsg:e.target.value}))}
            className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="code" className="block text-gray-700 font-semibold mb-2">Offer Code:</label>
          <input
            type="Number"
            id="code"
            value={offer.offerCode}
            onChange={(e) => setOffer((prev)=>({...prev,offerCode:e.target.value}))}
            className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
          />
        </div>
        <button type="submit" className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-4 w-1/2 mx-auto'>Submit</button>
      </form>
    </div>
  )
}

export default AddOffer