import Edit from "../assets/Edit.svg";
import VectorAppliedLoans from "../assets/VectorAppliedLoans.svg"
import { useContext } from 'react';
import { UserContext } from '../context/userContext';
import { useNavigate } from "react-router-dom";


function TopProfileBar() {
    const { currentuser,userData } = useContext(UserContext)
    // console.log(currentuserdetail);
    const navigate = useNavigate();
    const handleEditProfile =()=>{
        navigate('/user/profile/edit');
    }

    return (
        <div className="pt-32 pb-8 flex flex-col gap-16 md:flex-row items-center justify-between">
            <div className="flex gap-4">
                <img className="rounded-full h-[90px] w-[90px]" src={currentuser.profilePicture}></img>
                <div className="flex flex-col justify-center">
                    <div className="text-2xl font-bold">
                        {userData.name || 'Full name'}
                    </div>
                    <div className="text-lg font-medium">
                        <p>{currentuser.email || 'xxxxxxxxxx@xxxxx.xxx'}</p>
                    </div>
                </div>
            </div>
            <div className="flex gap-8">
            <div className="cursor-pointer text-white border border-blue-600 p-4 rounded-lg bg-lightPrimary">
                <img className="inline-block pl-1 pr-1" src={VectorAppliedLoans}></img> Applied Loans
            </div>
            <div className="cursor-pointer text-darkPrimary border border-blue-600 p-4 rounded-lg bg-white" onClick={handleEditProfile}>
                <img className="inline-block pl-1 pr-1" src={Edit}></img> Edit Profile
            </div>
            
            </div>
        </div>
    )
}

export default TopProfileBar;
