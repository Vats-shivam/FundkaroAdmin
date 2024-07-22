import React, { useContext } from 'react'
import VectorHome from "../assets/Vectorhome.svg";
import VectorTools from "../assets/VectorTools.svg"
import VectorResources from "../assets/VectorResources.svg"
import VectorLoanMaster from "../assets/VectorLoanMaster.svg"
import VectorRefferal from "../assets/VectorRef.svg"
import { Link as ScrollLink } from "react-scroll";
import { Link } from 'react-router-dom';
import { UserContext } from '../context/userContext';


function AdminNavbar() {
  const { currentuser } = useContext(UserContext);
  var items = []
  if (currentuser.role == 'Admin') {
    items = [
      { label: "Home", id: "d-home", link: "/admin", img: VectorHome },
      { label: "Loan Master", id: "d-loanmaster", link: "/admin/loanmaster", img: VectorTools },
      { label: "Applications", id: "d-application", link: "/admin/applications", img: VectorResources },
      { label: "Staff", id: "d-staff", link: "/admin/staff", img: VectorRefferal },
      { label: "Clients", id: "d-clients", link: "/admin/clients", img: VectorLoanMaster }
    ];
  } else if(currentuser.role =='Verifier'|| currentuser.role =='Preparer') {
    items = [
      { label: "Home", id: "d-home", link: "/admin", img: VectorHome },
      { label: "Applications", id: "d-application", link: "/admin/applications", img: VectorResources },
      { label: "Clients", id: "d-clients", link: "/admin/clients", img: VectorLoanMaster }
    ];
  }
  return (
    <div className="mt-10">
      {items.map((item, index) => {
        return (
          <Link to={item.link}>
            <div key={index} className="nav-item relative cursor-pointer w-full text-left font-primaryFont p-4 font-semibold border-b border-[#7BADF9] hover:bg-[#E4EAFA] transition duration-1000 ease-out-in">

              <img className="inline-block pr-2 h-6 w-6 -mt-1" src={item.img} alt={item.label}></img>
              {item.label}
            </div>
          </Link>
        );
      })}
    </div>
  )
}

export default AdminNavbar