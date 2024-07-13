import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/userContext'
import axios from 'axios';
function AdminClients() {
  const { currentuser } = useContext(UserContext);
  const [clients, setClients] = useState([]);
  const [clientDetails, setClientDetails] = useState([]);
  const fetchUsers = async () => {
    try {
      const { data } = await axios.post('/api/user/findall', { userId: currentuser.id });
      if (!data) {
        throw "No Data found"
      }
      setClients(data.data);

    }
    catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, [])
  // console.log(clientDetails);
  return (
    <div className='flex flex-col gap-8'>
      <div className='grid grid-cols-12 sticky top-16 z-10 text-center rounded-lg bg-lightPrimary py-4 px-4 gap-4 hover:scale-y-105 w-full'>
        <div className='font-bold text-xl w-[120px] px-1'>
          Profile Pic
        </div>
        <div className='font-bold text-xl col-span-2 px-1'>
          Email
        </div>
        <div className='font-bold text-xl col-span-2 px-1'>
          Phone
        </div>
        <div className='font-bold text-xl col-span-1 px-1'>
          Rating
        </div>
        <div className='font-bold text-xl col-span-1 px-1'>
          Referals
        </div>
      </div>
        {clients && clients.map((client, index) => {
          return client.user ? (
            <div key={index} className='grid grid-cols-12 rounded-lg bg-blue-200 py-1 px-4 gap-4 items-center hover:scale-y-105 w-full text-center'>
              <div className='h-[80px] w-[90px] px-1'>
                <img src={client.user.profilePicture} alt="profilePicture" className='rounded-full border border-blue-400' />
              </div>
              <div className='font-bold text-xl hover:text-blue-700 px-1 col-span-2'>
                {client.email}
              </div>
              <div className='font-medium col-span-2 px-1'>
                {client.phone}
              </div>
              <div className='col-span-1 px-1'>
                {client.internalRating}
              </div>
              <div className='col-span-1 px-1'>
                {client.referCount}
              </div>
            </div>
          ) : (<></>);
        })}
    </div>
  )
}

export default AdminClients