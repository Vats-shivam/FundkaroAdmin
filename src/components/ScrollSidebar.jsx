import React from 'react'
import VectorHome from "../assets/Vectorhome.svg";
import VectorTools from "../assets/VectorTools.svg"
import VectorResources from "../assets/VectorResources.svg"
import VectorLoanMaster from "../assets/VectorLoanMaster.svg"
import VectorRefferal from "../assets/VectorRef.svg"
import { Link as ScrollLink } from "react-scroll";


function ScrollSidebar() {
  const items = [
    { label: "Home", id: "d-home", link: "", img: VectorHome },
    { label: "Loan Master", id: "d-loanmaster", link: "/loanmaster", img: VectorTools },
    { label: "Tools", id: "d-tools", link: "/tools", img: VectorResources },
    { label: "Resources", id: "d-res", link: "/resources", img: VectorLoanMaster },
    { label: "Refer a Friend", id: "d-ref", link: "/refferal", img: VectorRefferal },
  ];
  return (
    <div className="mt-10">
      {items.map((item, index) => {
        return (
          <div key={index} className="flex flex-wrap nav-item overflow-x-hidden relative cursor-pointer w-full text-left font-primaryFont font-semibold border-b border-[#7BADF9] hover:bg-[#E4EAFA] transition duration-1000 ease-out-in">
            <ScrollLink
              className="w-[100%] h-[100%] p-4"
              key={item.id}
              activeClass="active"
              spy={true}
              smooth={true}
              offset={-100}
              duration={1000}
              to={item.id}>

              <img className="inline-block pr-2 h-6 w-6 -mt-1" src={item.img} alt={item.label}></img>
              {item.label}
            </ScrollLink>
          </div>
        );
      })}
    </div>
  )
}

export default ScrollSidebar