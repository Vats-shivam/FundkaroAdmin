import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({})

export function UserContextProvider({ children }) {
  const [currentuser, setCurrentUser] = useState({ email: "", profilePicture: "", role: "", refCode: "", id: "" ,isVerified:false});
  const userData={ name: "xxxx", referCount: "xx", address: { state: "xxxxx", city: "xxxxx", pincode: "xxxxxxx" }, panNo: "xxxxxxxx", aadharNo: "xxxxx", dob: "xx-xx-xxxx" }
  useEffect(() => {
    async function fetchUser() {
      const token = localStorage.getItem('token')
      try {
        const { data } = await axios.post('/api/user/verify', {
          token
        })
        console.log(data);
        if (data.success) {
          setCurrentUser({ email: data.email, profilePicture: data.profilePicture, role: data.role, refCode: data.refCode, id: data._id ,isVerified:data.isVerified})
        }
      }
      catch (err) {
        console.log(err);
      }
    }
    fetchUser();
  }, [])
  return (
    <UserContext.Provider value={{ currentuser, setCurrentUser,userData }}>
      {children}
    </UserContext.Provider>
  )
}