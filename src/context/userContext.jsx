import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({})

export function UserContextProvider({children}){
  const [currentuser,setCurrentUser] = useState({email:"", phone:"", referrer:"", refferal_code: ""});
  useEffect(()=>{
    if(!currentuser){
      axios.get('/profile').then(({data})=>{
        setUser(data)
        // console.log(data);
      })
    }
  },[]);
  return (
    <UserContext.Provider value={{currentuser, setCurrentUser}}>
    {children}
    </UserContext.Provider>
  )
}