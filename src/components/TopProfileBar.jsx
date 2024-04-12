import VectorLogout from "../assets/VectorLogout.svg";
import { useContext } from 'react';
import { UserContext } from '../context/userContext';
import { useNavigate } from "react-router-dom";
import axios from "axios";

function TopProfileBar() {
    const navigate = useNavigate();
    const { currentuser, setCurrentUser, currentuserdetail ,setCurrentUserDetail} = useContext(UserContext)
    const Logout = async () => {
        try {
            // Send logout request to backend
            await axios.get('/logout');
            setCurrentUser();
            setCurrentUserDetail();
            localStorage.removeItem('data');
            // Clear token from local storage or cookies if needed (optional)
            // localStorage.removeItem('token');
            // Redirect to login page or any other page
            navigate('/user/login');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };
    // console.log(currentuserdetail);

    return (<div className="pt-16">
        <div>
            <div className="mr-5 absolute right-2 text-[#4169E1] border-[1.5px] border-[#4169E1] cursor-pointer w-fit hover:bg-[#EAEAEA] px-2 text-[14px] font-semibold rounded-[5px] leading-[16.8px] p-1" onClick={Logout}><img className="inline-block pl-1 pr-1" src={VectorLogout}></img> Logout</div>
            <div className="mt-4 max-sm:pt-12 pt-4 flex items-center max-sm:gap-x-1 gap-x-10 m-auto justify-center">
                <div className="max-sm:w-[5%] w-[20%] h-[1.5px] bg-[#4169E1]"></div>
                <div className="shadow-blogshadow rounded-[30px] z-10 flex flex-wrap justify-center py-1 px-12 bg-white w-fit gap-x-10">
                    <img className="rounded-full h-[90px] w-[90px]" src="https://res.cloudinary.com/drfokf5ix/image/upload/v1709286872/profile_placeholder.png"></img>
                    <div className="flex flex-wrap flex-col line-[36px]">
                        <div className="text-[30px] font-semibold">
                            {currentuserdetail.name?currentuserdetail.name:'Full name'}
                        </div>
                        <div className="text-[14px] line-[16.8px]">
                            <p>+91 {currentuser.phone?currentuser.phone:'xxxxxxxxxx'}</p>
                            <p>{currentuser.email?currentuser.email:'xxxxxxxxxx@xxxxx.xxx'}</p>
                        </div>
                    </div>
                </div>
                <div className="max-sm:w-[5%] w-[20%] h-[1.5px] bg-[#4169E1]"></div>
            </div>
        </div>
    </div>)
}

export default TopProfileBar;
