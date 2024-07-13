import axios from "axios";
import { createContext, useEffect, useState } from "react";
export const UserContext = createContext({})

export function UserContextProvider({ children }) {
  const [currentuser, setCurrentUser] = useState({ email: "", profilePicture: "", role: "", refCode: "",phoneNo:"" , id: "" ,isVerified:false,isProfileCompleted:false,isKYCVerified:false});
  const [userData,setUserData]=useState({ name: "xxxx", referCount: "xx", address: { state: "xxxxx", city: "xxxxx", pincode: "xxxxxxx" }, panNo: "xxxxxxxx", aadharNo: "xxxxx", dob: "xx-xx-xxxx" });
  const [loading,setLoading] = useState(false);
  const fetchUserData = async () => {
    try{
      setLoading(true);
      const {data} = await axios.post('/api/user/details',{userId:currentuser.id});
      setUserData({ name: data.fullName, referCount: data.referCount, address: { state: "xxxxx", city: "xxxxx", pincode: "xxxxxxx" }, panNo: data.panNo, aadharNo: data.aadharNo, dob: "xx-xx-xxxx" });
      setLoading(false);
    }
    catch(error){
      setLoading(false);
      console.log(error);
    }
  }
  useEffect(() => {
    async function fetchUser() {
      setLoading(true);
      const token = localStorage.getItem('token')
      try {
        const { data } = await axios.post('/api/user/verify', {
          token
        })
        console.log(data);
        if (data.success) {
          setCurrentUser({ email: data.email,phoneNo:data.phoneNo, profilePicture: data.profilePicture, role: data.role, refCode: data.refCode, id: data._id ,isVerified:data.isVerified, isProfileCompleted:data.isProfileCompleted , isKYCVerified: data.isKYCVerified})
          // currentuser.id&&fetchUserData();
        }
        setLoading(false);
      }
      catch (err) {
        setLoading(false);
        console.log(err);
      }
    }
    fetchUser();
  }, [])
  useEffect(()=>{
    fetchUserData();
  },[currentuser.id]);

  // if(loading){
  //   return (<div className={`w-screen h-screen flex items-center justify-center bg-primary z-20`}>
  //     <img src={Loader} alt="Loading..." className=" h-16" />
  //   </div>)
  // }

  return (
    <UserContext.Provider value={{ currentuser, setCurrentUser,userData }}>
      {children}
    </UserContext.Provider>
  )
}