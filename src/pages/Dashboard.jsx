import NameNavbar from '../components/NameNavbar';
import SideDashboard from '../components/SideDashboard';
import { useState } from 'react';
import { useRef } from 'react';

function Dashboard({children}) {
  const [Open, setOpen] = useState((window.innerWidth > 600) ? true : false);
  return (
    <div>
      <NameNavbar Open={Open} setOpen={setOpen}/>
      <SideDashboard Open={Open}/>
      <div className={'mt-20 font-primaryFont '+ (Open && (window.innerWidth > 600) ? 'ml-72 slide-in' : 'slide-out')}>
          {children}
    </div>
  </div>
  );
}

export default Dashboard;
