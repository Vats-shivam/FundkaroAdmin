import VectorHome from "../assets/Vectorhome.svg";
import VectorTools from "../assets/VectorTools.svg"
import VectorResources from "../assets/VectorResources.svg"
import VectorLoanMaster from "../assets/VectorLoanMaster.svg"
import VectorRefferal from "../assets/VectorRef.svg"
import VectorProfile from "../assets/VectorProfile.svg"
import VectorLogout from "../assets/VectorLogout.svg"
import { Link } from "react-scroll";

function SideDashboard(props) {
    const items = [
        { label: "Home",id:"d-home", link: "", img: VectorHome },
        { label: "Loan Master",id:"d-loanmaster", link: "/loanmaster", img: VectorTools },
        { label: "Tools",id:"d-tools", link: "/tools", img: VectorResources },
        { label: "Resources",id:"d-res", link: "/resources", img: VectorLoanMaster },
        { label: "Refer a Friend",id:"d-ref", link: "/refferal", img: VectorRefferal },
    ];

    function Logout() {
        return null;
    }

    return (
        props.Open ? (<div className="z-10 bg-white fixed top-8 shadow-primaryShadow h-screen pt-8 w-64 pr-4 pl-2 transition-transform duration-300">
            <div className="mt-10">
                {items.map((item,index) => {
                    return (
                        <div key={index} className="nav-item relative cursor-pointer w-full text-left font-primaryFont p-4 font-semibold border-b border-[#7BADF9] hover:bg-[#E4EAFA] transition duration-1000 ease-out-in">
                            <Link 
                                activeClass="active"
                                spy={true}
                                smooth={true}
                                offset={-100}
                                duration={1000}
                                to={item.id}>

                                <img className="inline-block pr-2 h-6 w-6 -mt-1" src={item.img} alt={item.label}></img>
                                {item.label}
                            </Link>
                        </div>
                    );
                })}
            </div>
            <div className="fixed bottom-16">
                <div className="text-left -ml-1 pt-4 pl-5 text-[#4169E1]"><Link to='/user/profile'><img className="inline-block pr-2 h-7 w-7" src={VectorProfile} alt="Profile"></img>My Profile</Link></div>
                <div onClick={Logout} className="text-left -ml-1 pt-4 pl-5 text-[#4169E1] -mt-2 cursor-pointer"><img className="inline-block pr-2 h-7 w-7" src={VectorLogout} alt="Logout"></img>Logout</div>
            </div>
        </div>):(<div></div>)
    );
    
}

export default SideDashboard;