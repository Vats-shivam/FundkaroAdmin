import { useContext } from 'react';
import { UserContext } from '../context/userContext';
import { useNavigate } from "react-router-dom";
import Logout from '../components/Logout'


function ShowProfile({ data }) {
    const navigate = useNavigate();
    const { currentuser } = useContext(UserContext);

    return (
        <div className='flex flex-col items-end justify-evenly'>
            <div className='px-24 w-full flex flex-col md:flex-row md:justify-around'>
                <div className='w-full md:w-2/5 flex flex-col justify-around h-[50vh]'>
                    <div className='border-b-4 border-gray-200 flex justify-between w-full lg:w-4/5'>
                        <div className='text-blue-500 text-xl'>Name:</div>
                        <div className='text-2xl'>{data.name || 'Not Set Yet'}</div>
                    </div>
                    <div className='border-b-4 border-gray-200 flex justify-between w-full lg:w-4/5'>
                        <div className='text-blue-500 text-xl'>Email ID:</div>
                        <div className='text-2xl'>{currentuser.email || 'Not Set Yet'}</div>
                    </div>
                    <div className='border-b-4 border-gray-200 flex justify-between w-full lg:w-4/5'>
                        <div className='text-blue-500 text-xl'>Date of Birth:</div>
                        <div className='text-2xl'>{data.dob || 'Not Set Yet'}</div>
                    </div>
                    <div className='border-b-4 border-gray-200 flex justify-between w-full lg:w-4/5'>
                        <div className='text-blue-500 text-xl'>City:</div>
                        <div className='text-2xl'>{data.address.city || 'Not Set Yet'}</div>
                    </div>
                    <div className='border-b-4 border-gray-200 flex justify-between w-full lg:w-4/5'>
                        <div className='text-blue-500 text-xl'>State :</div>
                        <div className='text-2xl'>{data.address.state || 'Not Set Yet'}</div>
                    </div>
                </div>
                <div className='w-full md:w-2/5 flex flex-col justify-around h-[50vh]'>
                    <div className='border-b-4 border-gray-200 flex justify-between w-full lg:w-4/5'>
                        <div className='text-blue-500 text-xl'>Phone Number:</div>
                        <div className='text-2xl'>{currentuser.phoneNo || 'Not Set Yet'}</div>
                    </div>
                    <div className='border-b-4 border-gray-200 flex justify-between w-full lg:w-4/5'>
                        <div className='text-blue-500 text-xl'>Aadhar No:</div>
                        <div className='text-2xl' >{data.aadharNo || 'Not Set Yet'}</div>
                    </div>
                    <div className='border-b-4 border-gray-200 flex justify-between w-full lg:w-4/5'>
                        <div className='text-blue-500 text-xl'>Pan No:</div>
                        <div className='text-2xl'>{data.panNo || 'Not Set Yet'}</div>
                    </div>
                    <div className='border-b-4 border-gray-200 flex justify-between w-full lg:w-4/5'>
                        <div className='text-blue-500 text-xl'>Referal Count:</div>
                        <div className='text-2xl'>{data.refCount || 'Not Set Yet'}</div>
                    </div>
                    <div className='border-b-4 border-gray-200 flex justify-between w-full lg:w-4/5'>
                        <div className='text-blue-500 text-xl'>Pin Code :</div>
                        <div className='text-2xl'>{data.address.pincode || 'Not Set Yet'}</div>
                    </div>
                </div>
            </div>
            <Logout className={"mt-16 px-4 m-auto lg:w-1/6 md:right-48 md:bottom-4"} />
        </div>
    )
}

export default ShowProfile;