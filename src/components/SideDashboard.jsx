import VectorHome from "../assets/Vectorhome.svg";
import VectorTools from "../assets/VectorTools.svg"
import VectorResources from "../assets/VectorResources.svg"
import VectorLoanMaster from "../assets/VectorLoanMaster.svg"
import VectorRefferal from "../assets/VectorRef.svg"
import VectorProfile from "../assets/VectorProfile.svg"
import VectorLogout from "../assets/VectorLogout.svg"
import { Link } from "react-router-dom";

function SideDashboard() {
    const items = [
        { label: "Home", link: "", img: VectorHome },
        { label: "Loan Master", link: "/loanmaster", img: VectorTools },
        { label: "Tools", link: "/tools", img: VectorResources },
        { label: "Resources", link: "/resources", img: VectorLoanMaster },
        { label: "Refer a Friend", link: "/refferal", img: VectorRefferal },
    ];

    function Logout() {
        return
    }

    return (
        <div className="absolute shadow-primaryShadow h-[93%] pt-8 w-64 top-18 pr-4 pl-2 flex flex-col justify-evenly">
            <div>
                {items.map((item) => {
                    return <div className="text-left font-primaryFont p-4 m-4 font-semibold border-b border-[#7BADF9] hover:bg-[#E4EAFA]">
                        <Link to={'/user/dashboard' + item.link}>
                            <img className="inline-block pr-2 h-6 w-6 -mt-1" src={item.img}></img>
                            {item.label}
                        </Link>
                    </div>
                })}
            </div>
            <div className="">
                <div className="text-left -ml-1 pt-4 pl-5 text-[#4169E1]"><Link to='/user/profile'><img className="inline-block pr-2 h-7 w-7" src={VectorProfile}></img>My Profile</Link></div>
                <div onClick={Logout} className="text-left -ml-1 pt-4 pl-5 text-[#4169E1] -mt-2 cursor-pointer"><img className="inline-block pr-2 h-7 w-7" src={VectorLogout}></img>Logout</div>
            </div>
        </div>
    )
}

export default SideDashboard;