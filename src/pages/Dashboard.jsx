import NameNavbar from '../components/NameNavbar';
import SideDashboard from '../components/SideDashboard';
import { useState } from 'react';
import { useRef } from 'react';

function Dashboard({children}) {
  const [Open, setOpen] = useState(true);
  const windowSize = useRef([window.innerWidth, window.innerHeight]);
  return (
    <div className='h-screen w-screen'>
      <NameNavbar Open={Open} setOpen={setOpen}/>
      <SideDashboard Open={Open}/>
      <div className={'mt-20 font-primaryFont '+ (Open && windowSize[0] > 600 ? 'ml-72 slide-in' : 'slide-out')}>
          {children}
    </div>
  </div>
  );
}

export default Dashboard;
