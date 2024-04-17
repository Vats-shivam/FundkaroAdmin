import { useContext } from 'react';
import { UserContext } from '../context/userContext';
import { useNavigate } from "react-router-dom";
// import { Doughnut } from 'react-chartjs-2';
// import { Chart, ArcElement } from 'chart.js';
import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

function EditProfile() {
    const navigate = useNavigate();
    const [user, setUser] = useState({ panNo: "", aadharNo: "", dob: "22-02-1999" })
    const { currentuser,userData } = useContext(UserContext);

    var completed = 0;
    var imcompleted = 0;
    userData.name && userData.name != '' ? completed += 1 : imcompleted += 1;
    userData.panNo && userData.panNo != '' ? completed += 1 : imcompleted += 1;
    userData.aadharNo && userData.aadharNo != '' ? completed += 1 : imcompleted += 1;
    userData.dob && userData.dob != '' ? completed += 1 : imcompleted += 1;


    const data = [{ name: 'processed', value: completed, fill: '#4169E1' }, { name: 'pending', value: imcompleted, fill: '#D9E2FC' }]

    async function UpdateInfo(e) {
        const { panNo, aadharNo, dob } = user;
        // try {
        //     const { data } = await axios.post('/edit/profile', {
        //         panNo, aadharNo, dob
        //     })
        //     console.log(data);
        //     if (data.error) {
        //         toast.error(data.error);
        //     }
        //     else {
        //         setUser({ panNo: "", aadharNo: "", dob: "22-02-1999" });
        //     }
        //     if (data.status) {
        //         toast.success("Profile Edited Successfully");
        //         setCurrentUserDetail((prev) => { return { ...prev, panNo: panNo, aadharNo: aadharNo, dob: dob } })
        //         navigate('/user/profile');
        //         //else
        //         //navigate('/user/email/verify-otp);
        //     }
        // } catch (error) {
        //     console.log(error)
        //     toast.error("Internal Error");
        // }
        console.log(user);
        // navigate('/user/profile');
    }
const handleBack = ()=>{
    navigate('/user/profile');
}
    return (
            <div className='flex flex-col items-start'>
                <button className='transition-all duration-500 hover:bg-white hover:text-darkPrimary border text-white border-blue-900 bg-lightPrimary px-6 py-2 mb-8 rounded-lg' onClick={handleBack}>
                    Back
                </button>

                    <div className='flex flex-col'>
                        <p className='text-[18px] pb-5'>Enter the details to complete your profile</p>
                        <label className='text-[18px] text-[#4169E1]'>Full Name</label>
                        <div className='flex border border-blue-500 rounded-lg focus:border-primaryStart mb-6'>
                            <input type="text" placeholder="John Doe" value={user.name} onChange={(e) => { setUser((prev) => { return { ...prev, name: e.target.value } }) }} className='py-4 px-3 w-full  placeholder-500 focus:outline-none' />
                        </div>
                        <label className='text-[18px] text-[#4169E1]'>Aadhar Card</label>
                        <div className='flex border border-blue-500 rounded-lg focus:border-primaryStart px-3 mb-6'>
                            <input type="text" placeholder="0000 0000 0000" value={user.aadharNo} onChange={(e) => { setUser((prev) => { return { ...prev, aadharNo: e.target.value } }) }} className='py-4 px-2 w-full  placeholder-500 focus:outline-none' />
                        </div>
                        <label className='text-[18px] text-[#4169E1]'>PAN Number</label>
                        <div className='flex border border-blue-500 rounded-lg focus:border-primaryStart px-3 mb-6'>

                            <input type="email" placeholder="AAAAA0123B" value={user.panNo} onChange={(e) => { setUser((prev) => { return { ...prev, panNo: e.target.value } }) }} className='py-4 px-2 w-full  placeholder-500 focus:outline-none' />
                        </div>
                        <div className='flex justify-between'>
                            <div>
                                <label className='text-[18px] text-[#4169E1]'>Date of Birth</label>
                                <div className='border border-blue-500 rounded-lg focus:border-primaryStart px-3 mb-6 w-[100%]'>
                                    <input type="date" placeholder="22-02-1999" value={user.dob} onChange={(e) => { setUser((prev) => { return { ...prev, dob: e.target.value } }) }} className='py-4 px-2 w-full  placeholder-500 focus:outline-none' />
                                </div>
                            </div>
                            <div className='mt-[28.5px]'>
                                <button onClick={UpdateInfo} type='submit' className='transition-all duration-500 border hover:bg-white hover:text-[#4169E1] border border-[#4169E1] bg-[#4169E1] text-white rounded-[8px] px-8 py-4 focus:outline-none'>Verify</button>
                            </div>
                        </div>
                    </div>
                </div>
                )
}

                export default EditProfile;