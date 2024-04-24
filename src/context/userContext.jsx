import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({})

export function UserContextProvider({ children }) {
  const [currentuser, setCurrentUser] = useState({ email: "", profilePicture: "", role: "", refCode: "", id: "" ,isVerified:false,isProfileCompleted:false});
  const [userData,setUserData]=useState({ name: "xxxx", referCount: "xx", address: { state: "xxxxx", city: "xxxxx", pincode: "xxxxxxx" }, panNo: "xxxxxxxx", aadharNo: "xxxxx", dob: "xx-xx-xxxx" })
  const fetchUserData = async () => {
    try{
      const {data} = await axios.post('/api/user/details',{userId:currentuser.id});
      setUserData({ name: data.fullName, referCount: data.referCount, address: { state: "xxxxx", city: "xxxxx", pincode: "xxxxxxx" }, panNo: data.panNo, aadharNo: data.aadharNo, dob: "xx-xx-xxxx" });
    }
    catch(error){
      console.log(error);
    }
  }
  useEffect(() => {
    async function fetchUser() {
      const token = localStorage.getItem('token')
      try {
        const { data } = await axios.post('/api/user/verify', {
          token
        })
        console.log(data);
        if (data.success) {
          setCurrentUser({ email: data.email, profilePicture: data.profilePicture, role: data.role, refCode: data.refCode, id: data._id ,isVerified:data.isVerified, isProfileCompleted:data.isProfileCompleted})
          // currentuser.id&&fetchUserData();
        }
      }
      catch (err) {
        console.log(err);
      }
    }
    fetchUser();
  }, [])
  useEffect(()=>{
    fetchUserData();
  },[currentuser.id]);
  return (
    <UserContext.Provider value={{ currentuser, setCurrentUser,userData }}>
      {children}
    </UserContext.Provider>
  )
}