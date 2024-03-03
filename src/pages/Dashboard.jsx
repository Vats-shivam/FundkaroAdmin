import NameNavbar from '../components/NameNavbar';
import SideDashboard from '../components/SideDashboard';
import { useState } from 'react';
import { Toaster } from 'react-hot-toast'
import { useContext } from 'react';
import { UserContext } from '../context/userContext';
function Dashboard({children}) {
  const [Open, setOpen] = useState((window.innerWidth > 600) ? true : false);
  const {currentuser} = useContext(UserContext)
  return (
    <div>
      
      <Toaster position="top-center" />
      <NameNavbar Open={Open} setOpen={setOpen}/>
      <SideDashboard Open={Open}/>
      <div className={'mt-20 font-primaryFont '+ (Open && (window.innerWidth > 600) ? 'ml-72 slide-in' : 'slide-out')}>
          {children}
          {currentuser&& (<h2>{currentuser.email}</h2>)}
    </div>
  </div>
  );
}

export default Dashboard;
