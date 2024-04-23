import NameNavbar from '../components/NameNavbar';
import { useContext, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import TopProfileBar from '../components/TopProfileBar';
import ShowProfile from '../components/ShowProfile';
import EditProfile from '../components/EditProfile';
import { UserContext } from '../context/userContext';
function Profile(props) {
  const [Open, setOpen] = useState((window.innerWidth > 600) ? true : false);
  
  const {userData} = useContext(UserContext);
  return (
    <div className='font-primaryFont'>
      <Toaster position="top-center" />
      <NameNavbar Open={Open} setOpen={setOpen} ShowBackarrow={props.ShowBackarrow ? true : false} />
      <div className='px-12 md:px-12 lg:px-24 xl:px-48'>
        <TopProfileBar data={userData}/>
        <div className='mt-5 font-primaryFont'>
          {props.children}
        </div>
      </div>
    </div>
  );
}

export default Profile;
