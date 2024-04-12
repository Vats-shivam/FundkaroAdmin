import { useContext } from 'react';
import { UserContext } from '../context/userContext';
import { useNavigate } from "react-router-dom";
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement } from 'chart.js';
import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

function EditProfile() {
    Chart.register(ArcElement);
    const navigate = useNavigate();
    const [user, setUser] = useState({ panNo: "", aadharNo: "", dob: "22-02-1999" })
    const { currentuser} = useContext(UserContext);

    var completed = 0;
    var imcompleted = 0;
    currentuserdetail.name && currentuserdetail.name != '' ? completed += 1 : imcompleted += 1;
    currentuserdetail.panNo && currentuserdetail.panNo != '' ? completed += 1 : imcompleted += 1;
    currentuserdetail.aadharNo && currentuserdetail.aadharNo != '' ? completed += 1 : imcompleted += 1;
    currentuserdetail.dob && currentuserdetail.dob != '' ? completed += 1 : imcompleted += 1;
    currentuser.phone && currentuser.phone != '' ? completed += 1 : imcompleted += 1;
    currentuser.email && currentuser.email != '' ? completed += 1 : imcompleted += 1;

    const plugins = [{
        beforeDraw: function (chart) {
            var width = chart.width,
                height = chart.height,
                ctx = chart.ctx;
            ctx.restore();
            ctx.font = "18.79px Urbanist";
            ctx.textBaseline = "top";
            var text = "Your profile is ",
                textX = Math.round((width - ctx.measureText(text).width) / 2),
                textY = (height - 18.79 * 4) / 2;
            ctx.fillStyle = "#000";
            ctx.fillText(text, textX, textY);
            ctx.font = "600 23.49px Urbanist";
            ctx.textBaseline = "top";
            text = Math.round((imcompleted / 6) * 100) + "% incomplete",
                textX = Math.round((width - ctx.measureText(text).width) / 2),
                textY = (height - 18.79) / 2;
            ctx.fillStyle = "#4169E1";
            ctx.fillText(text, textX, textY);
            ctx.save();
        }
    }]

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
        try {
            const { data } = await axios.post('/edit/profile', {
                panNo, aadharNo, dob
            })
            console.log(data);
            if (data.error) {
                toast.error(data.error);
            }
            else {
                setUser({ panNo: "", aadharNo: "", dob: "22-02-1999" });
            }
            if (data.status) {
                toast.success("Profile Edited Successfully");
                setCurrentUserDetail((prev) => { return { ...prev, panNo: panNo, aadharNo: aadharNo, dob: dob } })
                navigate('/user/profile');
                //else
                //navigate('/user/email/verify-otp);
            }
        } catch (error) {
            console.log(error)
            toast.error("Internal Error");
        }
    }

    return (<div className='w-full overflow-x-hidden'>
        <div className='w-[800px] h-[800px] -mr-[140px] -mt-[220px] float-right'>
            <Doughnut data={data} options={options}
                plugins={plugins}
                height={400}
                width={400}
                padding={0}
                overflow="hidden" />
        </div>
        <div className='flex h-full mt-[25px] items-center ml-[15%]'>
            <div className='flex flex-wrap flex-col'>
                <p className='text-[18px] pb-5'>Enter the details to complete your profile</p>
                <label className='text-[18px] text-[#4169E1]'>Aadhar Card</label>
                <div className='flex border border-blue-500 rounded-lg focus:border-primaryStart px-3 mb-6'>
                    <input type="text" placeholder="0000 0000 0000" value={user.aadharNo} onChange={(e) => { setUser((prev) => { return { ...prev, aadharNo: e.target.value } }) }} className='py-2 px-2 w-full  placeholder-500 focus:outline-none' />
                </div>
                <label className='text-[18px] text-[#4169E1]'>PAN Number</label>
                <div className='flex border border-blue-500 rounded-lg focus:border-primaryStart px-3 mb-6'>

                    <input type="email" placeholder="AAAAA0123B" value={user.panNo} onChange={(e) => { setUser((prev) => { return { ...prev, panNo: e.target.value } }) }} className='py-2 px-2 w-full  placeholder-500 focus:outline-none' />
                </div>
                <div>
                    <div className='float-left'>
                        <label className='text-[18px] text-[#4169E1]'>Date of Birth</label>
                        <div className='border border-blue-500 rounded-lg focus:border-primaryStart px-3 mb-6 w-[100%]'>
                            <input type="date" placeholder="22-02-1999" value={user.dob} onChange={(e) => { setUser((prev) => { return { ...prev, dob: e.target.value } }) }} className='py-2 px-2 w-full  placeholder-500 focus:outline-none' />
                        </div>
                    </div>
                    <div className='float-right mt-[28.5px]'>
                        <button onClick={UpdateInfo} type='submit' className='transition-all duration-1000 border hover:bg-white hover:text-[#4169E1] border border-[#4169E1] bg-[#4169E1] text-white rounded-[8px] px-8 py-2 focus:outline-none'>Verify</button>
                    </div>
                </div>
            </div>
        </div>
    </div>)
}

export default EditProfile;