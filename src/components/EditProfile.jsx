import { useContext } from 'react';
import { UserContext } from '../context/userContext';
import { useNavigate } from "react-router-dom";
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement } from 'chart.js';
import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

function EditProfile({ userData, setEditProfile }) {
    Chart.register(ArcElement);
    const navigate = useNavigate();
    const [user, setUser] = useState({ panNo: "", aadharNo: "", dob: "22-02-1999" })
    const { currentuser } = useContext(UserContext);

    var completed = 0;
    var imcompleted = 0;
    userData.name && userData.name != '' ? completed += 1 : imcompleted += 1;
    userData.panNo && userData.panNo != '' ? completed += 1 : imcompleted += 1;
    userData.aadharNo && userData.aadharNo != '' ? completed += 1 : imcompleted += 1;
    userData.dob && userData.dob != '' ? completed += 1 : imcompleted += 1;
    currentuser.phone && currentuser.phone != '' ? completed += 1 : imcompleted += 1;
    currentuser.email && currentuser.email != '' ? completed += 1 : imcompleted += 1;

    const plugins = [{
        beforeDraw: function (chart) {
            var width = chart.width,
                height = chart.height,
                ctx = chart.ctx;
            
            // Set font sizes based on screen size
            var fontSize = Math.min(width / 25, 18.79); // Adjust 25 as needed for your design
            var fontSizeBold = Math.min(width / 30, 23.49); // Adjust 30 as needed for your design
    
            ctx.restore();
            ctx.font = fontSize + "px Urbanist";
            ctx.textBaseline = "top";
            var text = "Your profile is ",
                textX = Math.round((width - ctx.measureText(text).width) / 2),
                textY = (height - fontSize * 4) / 2;
            ctx.fillStyle = "#000";
            ctx.fillText(text, textX, textY);
    
            ctx.font = "600 " + fontSizeBold + "px Urbanist";
            text = Math.round((imcompleted / 6) * 100) + "% incomplete";
            textX = Math.round((width - ctx.measureText(text).width) / 2);
            textY = (height - fontSize) / 2;
            ctx.fillStyle = "#4169E1";
            ctx.fillText(text, textX, textY);
    
            ctx.save();
        },
        legend:{
            position: 'top',
        }
    }];

    const data = {
        labels: [
            'processed',
            'pending'
        ],
        datasets: [{
            data: [completed, imcompleted],
            backgroundColor: [
                '#D9E2FC',
                '#4169E1'
            ],
            borderWidth: 2,
            radius: '40%'
        }]
    };

    const options = {
        cutout: '75%',
        responsive: true,
        maintainAspectRatio: false,
    }

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

    return (
        <div className='w-full flex flex-col md:flex-row overflow-hidden'>
            <div className='flex flex-col items-start h-full px-8 md:mt-[25px] md:ml-[15%] w-full md:w-1/2'>
                <button className='transition-all duration-500 hover:bg-white hover:text-darkPrimary border text-white border-blue-900 bg-lightPrimary px-6 py-2 mb-8 rounded-lg' onClick={() => setEditProfile(false)}>
                    Back
                </button>
                <div className='flex flex-wrap flex-col px-8 w-full h-1/2'>
                    <p className='text-[18px] pb-5'>Enter the details to complete your profile</p>
                    <label className='text-[18px] text-[#4169E1]'>Full Name</label>
                    <div className='flex border border-blue-500 rounded-lg focus:border-primaryStart px-3 mb-6'>
                        <input type="text" placeholder="John Doe" value={user.name} onChange={(e) => { setUser((prev) => { return { ...prev, name: e.target.value } }) }} className='py-4 px-2 w-full  placeholder-500 focus:outline-none' />
                    </div>
                    <label className='text-[18px] text-[#4169E1]'>Aadhar Card</label>
                    <div className='flex border border-blue-500 rounded-lg focus:border-primaryStart px-3 mb-6'>
                        <input type="text" placeholder="0000 0000 0000" value={user.aadharNo} onChange={(e) => { setUser((prev) => { return { ...prev, aadharNo: e.target.value } }) }} className='py-4 px-2 w-full  placeholder-500 focus:outline-none' />
                    </div>
                    <label className='text-[18px] text-[#4169E1]'>PAN Number</label>
                    <div className='flex border border-blue-500 rounded-lg focus:border-primaryStart px-3 mb-6'>

                        <input type="email" placeholder="AAAAA0123B" value={user.panNo} onChange={(e) => { setUser((prev) => { return { ...prev, panNo: e.target.value } }) }} className='py-4 px-2 w-full  placeholder-500 focus:outline-none' />
                    </div>
                    <div>
                        <div className='float-left'>
                            <label className='text-[18px] text-[#4169E1]'>Date of Birth</label>
                            <div className='border border-blue-500 rounded-lg focus:border-primaryStart px-3 mb-6 w-[100%]'>
                                <input type="date" placeholder="22-02-1999" value={user.dob} onChange={(e) => { setUser((prev) => { return { ...prev, dob: e.target.value } }) }} className='py-4 px-2 w-full  placeholder-500 focus:outline-none' />
                            </div>
                        </div>
                        <div className='float-right mt-[28.5px]'>
                            <button onClick={UpdateInfo} type='submit' className='transition-all duration-500 border hover:bg-white hover:text-[#4169E1] border border-[#4169E1] bg-[#4169E1] text-white rounded-[8px] px-8 py-4 focus:outline-none'>Verify</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="absolute -right-56 top-40 w-full md:w-1/2">
                <Doughnut
                    data={data}
                    plugins={plugins}
                    padding={1}
                    overflow="hidden"
                />
            </div>
        </div>)
}

export default EditProfile;