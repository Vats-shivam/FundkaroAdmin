
import VectorProfile from "../assets/VectorProfile.svg"
import VectorLogout from "../assets/VectorLogout.svg"
import { Link as RouteLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from 'react';
import { UserContext } from '../context/userContext';

function SideDashboard(props) {
    const navigate = useNavigate();
    const { currentuser, setCurrentUser } = useContext(UserContext);
    

    const Logout = async () => {
        try {
            // Send logout request to backend
            await axios.get('/logout');
            setCurrentUser({ email: "", phone: "", referrer: "", refferal_code: "" });
            // Clear token from local storage or cookies if needed (optional)
            // localStorage.removeItem('token');
            // Redirect to login page or any other page
            navigate('/user/login');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    return (
        <div className={"z-10 bg-white fixed top-8 right-full shadow-primaryShadow h-screen pt-8 w-64 pr-4 pl-2 transition-all duration-1000 linear "+(props.Open?"translate-x-full":'')}>
            {props.children}
            <div className="fixed bottom-16">
                <div><RouteLink className="text-left -ml-1 pt-4 pl-5 text-[#4169E1] cursor-pointer" to='/user/profile'><img className="inline-block pr-2 h-7 w-7" src={VectorProfile} alt="Profile"></img>My Profile</RouteLink></div>
                <div onClick={Logout} className="text-left -ml-1 pt-4 pl-5 text-[#4169E1] -mt-2 cursor-pointer"><img className="inline-block pr-2 h-7 w-7" src={VectorLogout} alt="Logout"></img>Logout</div>
            </div>
        </div>
    );
}

export default SideDashboard;