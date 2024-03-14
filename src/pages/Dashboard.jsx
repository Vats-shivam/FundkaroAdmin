import NameNavbar from '../components/NameNavbar';
import ScrollSidebar from '../components/ScrollSidebar';
import SideDashboard from '../components/SideDashboard';
import { useState } from 'react';
import { Toaster } from 'react-hot-toast'
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { animateScroll as scroll } from 'react-scroll';

function Dashboard(props) {
  const [Open, setOpen] = useState((window.innerWidth > 600) ? (props.ForceSidebarClose ? false : true) : false);

  const location = useLocation();

  useEffect(() => {
    const { hash } = location;
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        const offset = -100;
        const elementPosition = element.offsetTop + offset;
        scroll.scrollTo(elementPosition, {
          duration: 1000,
          delay: 0,
          smooth: 'easeInOutQuart',
        });
      }
    }
  }, [location]);

  return (
    <div>

      <Toaster position="top-center" />
      <NameNavbar Open={Open} setOpen={setOpen} ShowBackarrow={props.ShowBackarrow ? true : false} />
      <SideDashboard Open={Open}>
        <ScrollSidebar />
      </SideDashboard>
      <div className={'mt-20 font-primaryFont transition-all duration-1000 ' + (Open && (window.innerWidth > 600) ? 'ml-64 slide-in' : 'slide-out')}>
        {props.children}
      </div>
    </div>
  );
}

export default Dashboard;
