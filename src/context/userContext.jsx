import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({})

export function UserContextProvider({ children }) {
  const [currentuser, setCurrentUser] = useState({ email: "", phone: "", referrer: "", refferal_code: "" });
  const [currentuserdetail, setCurrentUserDetail] = useState({ name: "", panNo: "", aadharNo: "", internalRating: 0, photo: 'https://res.cloudinary.com/drfokf5ix/image/upload/v1709286872/profile_placeholder.png', dob: null, isPanVerified: false, cibilScore: null });
  useEffect(() => {
    if (currentuser.email == "") {
      //console.log('Hi');
      try {
        axios.get('/profile').then(({ data }) => {
          if (data && data['user'] && data['userdetail']) {
            setCurrentUser(data['user'])
            setCurrentUserDetail(data['userdetail'])
            console.log(data);
          }
        })
      } catch (e) {
        console.log(e)
      }
    }
  }, []);
  return (
    <UserContext.Provider value={{ currentuser, setCurrentUser, currentuserdetail, setCurrentUserDetail }}>
      {children}
    </UserContext.Provider>
  )
}