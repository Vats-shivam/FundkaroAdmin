import NameNavbar from '../components/NameNavbar';
import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import TopProfileBar from '../components/TopProfileBar';
import ShowProfile from '../components/ShowProfile';
import EditProfile from '../components/EditProfile';
function Profile(props) {
  const [Open, setOpen] = useState((window.innerWidth > 600) ? true : false);
  const [isEditProfileOpen, setIsOpenProfileOpen] = useState(false);
  const [currentUserDetail, setCurrentUserDetail] = useState({ name: "xxxx", referCount: "xx", address: { state: "xxxxx", city: "xxxxx", pincode: "xxxxxxx" }, panNo: "xxxxxxxx", aadharNo: "xxxxx", dob: "xx-xx-xxxx" })
  return (
    <div className='font-primaryFont'>
      <Toaster position="top-center" />
      <NameNavbar Open={Open} setOpen={setOpen} ShowBackarrow={props.ShowBackarrow ? true : false} />
      <TopProfileBar data={currentUserDetail} setEditProfile={setIsOpenProfileOpen} />
      <div className='mt-5 font-primaryFont'>
        {isEditProfileOpen ? <EditProfile userData={currentUserDetail} setEditProfile={setIsOpenProfileOpen} /> : <ShowProfile data={currentUserDetail} />}
      </div>
      
    </div>
  );
}

export default Profile;
