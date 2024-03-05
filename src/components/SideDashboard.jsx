import VectorHome from "../assets/Vectorhome.svg";
import VectorTools from "../assets/VectorTools.svg"
import VectorResources from "../assets/VectorResources.svg"
import VectorLoanMaster from "../assets/VectorLoanMaster.svg"
import VectorRefferal from "../assets/VectorRef.svg"
import VectorProfile from "../assets/VectorProfile.svg"
import VectorLogout from "../assets/VectorLogout.svg"
import { Link as ScrollLink } from "react-scroll";
import { Link as RouteLink ,useNavigate} from "react-router-dom";
import axios from "axios";
import { useContext } from 'react';
import { UserContext } from '../context/userContext';

function SideDashboard(props) {
    const navigate= useNavigate();
    const {currentuser, setCurrentUser} =useContext(UserContext);
    const items = [
        { label: "Home", id: "d-home", link: "", img: VectorHome },
        { label: "Loan Master", id: "d-loanmaster", link: "/loanmaster", img: VectorTools },
        { label: "Tools", id: "d-tools", link: "/tools", img: VectorResources },
        { label: "Resources", id: "d-res", link: "/resources", img: VectorLoanMaster },
        { label: "Refer a Friend", id: "d-ref", link: "/refferal", img: VectorRefferal },
    ];

    const Logout = async () => {
        try {
            // Send logout request to backend
            //await axios.get('/logout');
            setCurrentUser({email:"", phone:"", referrer:"", refferal_code: ""});
            // Clear token from local storage or cookies if needed (optional)
            // localStorage.removeItem('token');
            // Redirect to login page or any other page
            navigate('/user/login');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

return (
    props.Open ? (<div className="z-10 bg-white fixed top-8 right-full shadow-primaryShadow h-screen pt-8 w-64 pr-4 pl-2 transition-transform duration-100 translate-x-full ">
        <div className="mt-10">
            {items.map((item, index) => {
                return (
                    <ScrollLink
                        activeClass="active"
                        spy={true}
                        smooth={true}
                        offset={-100}
                        duration={1000}
                        to={item.id}>
                        <div key={index} className="nav-item relative cursor-pointer w-full text-left font-primaryFont p-4 font-semibold border-b border-[#7BADF9] hover:bg-[#E4EAFA] transition duration-1000 ease-out-in">


                            <img className="inline-block pr-2 h-6 w-6 -mt-1" src={item.img} alt={item.label}></img>
                            {item.label}
                        </div>
                    </ScrollLink>

                );
            })}
        </div>
        <div className="fixed bottom-16">
            <div><RouteLink className="text-left -ml-1 pt-4 pl-5 text-[#4169E1] cursor-pointer" to='/user/profile'><img className="inline-block pr-2 h-7 w-7" src={VectorProfile} alt="Profile"></img>My Profile</RouteLink></div>
            <div onClick={Logout} className="text-left -ml-1 pt-4 pl-5 text-[#4169E1] -mt-2 cursor-pointer"><img className="inline-block pr-2 h-7 w-7" src={VectorLogout} alt="Logout"></img>Logout</div>
        </div>
    </div>) : (<div></div>)
);

}

export default SideDashboard;