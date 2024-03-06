import { useContext } from 'react';
import { UserContext } from '../context/userContext';
import { useNavigate } from "react-router-dom";
import Edit from "../assets/Edit.svg";
import Settings from "../assets/Settings.svg";

function ShowProfile() {
    const navigate = useNavigate();
    const { currentuser, currentuserdetail } = useContext(UserContext);

    function EditInfo() {
        navigate('/user/profile/edit');
    }

    return (<div>
        <div className='flex flex-wrap justify-center gap-x-2 pt-12 font-semibold text-[16px] line-[19.2px]'>
            <div className='text-[#4169E1] border-[1.5px] border-[#4169E1] cursor-pointer px-3 py-2 rounded'>Settings <img className="inline-block pl-1" src={Settings}></img></div>
            <div onClick={EditInfo} className='text-white bg-[#4169E1] border-[1.5px] border-[#4169E1] cursor-pointer px-3 py-2 rounded'>Edit Profile <img className="inline-block pl-1" src={Edit}></img></div>
        </div>
        <div className='max-md:p-4 max-md:gap-x-[0px] max-md:mx-3 mt-9 p-7 rounded-[10px] w-fit mx-auto  flex flex-wrap justify-center gap-x-4 bg-white shadow-profileshadow mb-5'>
            <div className='flex flex-col'>
                <div className='w-[350px] md:w-[300px] max-md:w-[250px] text-[18px] line-[21.px] font-normal border-b-[1px] border-[#D0D0D0] pb-1 mb-3'>
                    <div className='float-left text-[#4169E1]'>
                        Name :
                    </div>
                    <div className='float-right'>
                        {currentuserdetail.name && currentuserdetail.name!='' ? currentuserdetail.name:"not set"}
                    </div>
                </div>
                <div className='w-[350px] md:w-[300px] max-md:w-[250px] text-[18px] line-[21.px] font-normal border-b-[1px] border-[#D0D0D0] pb-1 mb-3'>
                    <div className='float-left text-[#4169E1]'>
                        Phone No : 
                    </div>
                    <div className='float-right'>
                    {currentuser.phone && currentuser.phone!='' ? currentuser.phone:"not set"}
                    </div>
                </div>
                <div className='w-[350px] md:w-[300px] max-md:w-[250px] text-[18px] line-[21.px] font-normal border-b-[1px] border-[#D0D0D0] pb-1 mb-3'>
                    <div className='float-left text-[#4169E1]'>
                        Email ID :
                    </div>
                    <div className='float-right'>
                    {currentuser.email && currentuser.email!='' ? currentuser.email:"not set"}
                    </div>
                </div>
            </div>
            <div className='max-md:w-[0px] w-[0.5px] h-auto bg-[#D0D0D0]'></div>
            <div className='flex flex-col'>
                <div className='w-[350px] md:w-[300px] max-md:w-[250px] text-[18px] line-[21.px] font-normal border-b-[1px] border-[#D0D0D0] pb-1 mb-3'>
                    <div className='float-left text-[#4169E1]'>
                    Aadhar card number :
                    </div>
                    <div className='float-right'>
                    {currentuserdetail.aadharNo && currentuserdetail.aadharNo!='' ? currentuserdetail.aadharNo:"not set"}
                    </div>
                </div>
                <div className='w-[350px] md:w-[300px] max-md:w-[250px] text-[18px] line-[21.px] font-normal border-b-[1px] border-[#D0D0D0] pb-1 mb-3'>
                    <div className='float-left text-[#4169E1]'>
                    PAN card number :           
                    </div>
                    <div className='float-right'>
                    {currentuserdetail.panNo && currentuserdetail.panNo!='' ? currentuserdetail.panNo:"not set"}
                    </div>
                </div>
                <div className='w-[350px] md:w-[300px] max-md:w-[250px] text-[18px] line-[21.px] font-normal border-b-[1px] border-[#D0D0D0] pb-1 mb-3'>
                    <div className='float-left text-[#4169E1]'>
                    Date of Birth :
                    </div>
                    <div className='float-right'>
                    {currentuserdetail.dob && currentuserdetail.dob!='' ? currentuserdetail.dob:"not set"}
                    </div>
                </div>
            </div>
        </div>
    </div>)
}

export default ShowProfile;