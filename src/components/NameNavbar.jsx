import logo from "../assets/fundkaro.svg";
import back from "../assets/Back.svg";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/userContext";

function NameNavbar(props) {
  const navigate = useNavigate();
  const { currentuser } = useContext(UserContext);
  function UpdateOpen() {
    props.setOpen(!props.Open);
  }

  function HandleBack() {
    if (currentuser.role == 'User')
      navigate('/user/dashboard');
    else
    navigate('/admin');
  }

  return (
    <header className="z-20 top-0 w-full bg-gradient-to-r from-darkPrimary to-lightPrimary flex h-16 items-center">

      {/* {props.ShowBackarrow === true ?
        (<img className="ml-4 cursor-pointer block h-5 w-5 hover:animate-pulse" onClick={HandleBack} src={back}></img>)
        :
        (<svg
          className={"ml-4 cursor-pointer block h-7 w-7 fill-white " + (props.Open ? "animate-pulse" : "")}
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
          onClick={UpdateOpen}>)
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
        </svg>)
      } */}
      <img src={logo} className="w-32 h-9 ml-4" alt="Logo" />
      {/* <div className="mx-auto text-[24px] font-semibold text-white">Empower Your Journey, Fund Your Tomorrow - Choose FundKa₹o</div> */}
    </header>
  );
}

export default NameNavbar;