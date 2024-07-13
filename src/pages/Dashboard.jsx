import NameNavbar from '../components/NameNavbar';
import ScrollSidebar from '../components/ScrollSidebar';
import SideDashboard from '../components/SideDashboard';
import { useState } from 'react';
import { useContext } from 'react';
import { Toaster } from 'react-hot-toast'
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { animateScroll as scroll } from 'react-scroll';
import { UserContext } from '../context/userContext';
import axios from 'axios';
import Profile from './Profile';
import ProfileSurvey from '../components/ProfileSurvey';

function Dashboard(props) {
  const [Open, setOpen] = useState((window.innerWidth > 700) ? (props.ForceSidebarClose ? false : true) : false);
  const { currentuser, setCurrentUser } = useContext(UserContext);
  const location = useLocation();
  const navigate = useNavigate();
  const checkUserToken = async (token) => {
    const { data } = await axios.post('/api/user/verify', {
      token, id: currentuser.id
    })
    if (data.success) {
      // setCurrentUser({ email: data.email, profilePicture: data.profilePicture, role: data.role, refCode: data.refCode, id: data.id })
      return true;
    }
    return false;
  }
  useEffect(() => {
    const token = localStorage.getItem('token')
    const authorised = checkUserToken(token)

    if (!authorised) {
      navigate('/user/login');
    }

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
  }, []);

  const closeModal = () => {
    console.log("hello");
  }
  // console.log(currentuser);
 if(!currentuser.isProfileCompleted){
  return <ProfileSurvey/>
 }
  return (
    <div>
      <Toaster position="top-center" />
      <NameNavbar Open={Open} setOpen={setOpen} ShowBackarrow={props.ShowBackarrow ? true : false} />
      <SideDashboard Open={Open}>
        <ScrollSidebar />
      </SideDashboard>
      <div className={'mt-20 font-primaryFont transition-all duration-1000 ' + (Open && (window.innerWidth > 700) ? 'ml-64 slide-in' : 'slide-out')}>
        {props.children}
      </div>
    </div>
  );
}

export default Dashboard;
