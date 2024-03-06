import NameNavbar from '../components/NameNavbar';
import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import TopProfileBar from '../components/TopProfileBar';

function Profile(props) {
  const [Open, setOpen] = useState((window.innerWidth > 600) ? true : false);
  return (
    <div>
      
      <Toaster position="top-center" />
      <NameNavbar Open={Open} setOpen={setOpen} ShowBackarrow={props.ShowBackarrow ? true : false}/>
      <TopProfileBar />
      <div className='mt-5 font-primaryFont'>
          {props.children}
    </div>
  </div>
  );
}

export default Profile;
