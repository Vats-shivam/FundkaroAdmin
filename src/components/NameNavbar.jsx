import logo from "../assets/fundkaro.svg"

function NameNavbar() {
  return (
    <header className="bg-gradient-to-r from-darkPrimary to-lightPrimary flex h-16 items-center"> 
      <img src={logo} className="w-32 h-9 ml-8 " /> 
    </header>
  )
}

export default NameNavbar;