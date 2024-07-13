import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/userContext';
import axios from 'axios';
import checkMark from '../assets/tick-mark-icon.svg'
import crossMark from '../assets/cross-icon.svg'

function Applications() {
  const [applications, setApplications] = useState([]);
  const [data, setData] = useState([]);
  const { currentuser } = useContext(UserContext);
  const getCategoryLogo = async () => {
    try {
      const updatedApplications = await Promise.all(data.map(async (application) => {
        try {
          const { data } = await axios.post('/api/file/getlink', {
            fileName: application.categoryId.logo
          });
          if (data.status) {
            // Return a new application object with the logo URL updated
            return {
              ...application,
              categoryId: {
                ...application.categoryId,
                logo: data.url
              }
            };
          }
        } catch (error) {
          console.log(error);
        }
        // Return the original application object if there's an error or logo URL is not updated
        return application;
      }));
      // console.log(updatedApplications);
      // Update the state with the updatedApplications array
      setApplications(updatedApplications);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchApplications = async () => {
    try {
      const { data } = await axios.post('/api/application/find', {
        userId: currentuser.id
      })
      if (data.status) {
        setData(data.applications);

      }
    }
    catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchApplications();
  }, [])
  useEffect(() => {
    getCategoryLogo();
  }, [data])
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
          Category
        </div>
        <div className='font-bold text-xl col-span-1 px-1'>
          Verified
        </div>
        <div className='font-bold text-xl col-span-1 px-1'>
          Applied
        </div>
      </div>
      {applications && applications.map((application, index) => {
        return application.userId ? (
          <div key={index} className='grid grid-cols-12 rounded-lg bg-blue-200 py-1 px-4 gap-4 items-center hover:scale-y-105 w-full text-center'>
            <div className='h-[80px] w-[90px] px-1'>
              <img src={application.categoryId.logo} alt="profilePicture" className='rounded-full w-full border border-blue-400' />
            </div>
            <div className='font-bold text-xl hover:text-blue-700 px-1 col-span-2'>
              {application.userId.email}
            </div>
            <div className='font-medium col-span-2 px-1'>
              {application.userId.phoneNo}
            </div>
            <div className='col-span-1 px-1'>
              {application.categoryId.category}
            </div>
            <div className='col-span-1 px-1'>
              {application.isVerified ? (
                <img src={checkMark} alt="verified" className='w-12 mx-auto' />
              ) : (
                <img src={crossMark} alt="notVerified" className='w-12 mx-auto' />
              )}
            </div>
            <div className='col-span-1 px-1'>
              {application.isApplied ? (
                <img src={checkMark} alt="verified" className='w-12 mx-auto' />
              ) : (
                <img src={crossMark} alt="notVerified" className='w-12 mx-auto' />
              )}
            </div>

          </div>
        ) : (<></>);
      })}
    </div>
  )
}


export default Applications