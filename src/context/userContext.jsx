import { createContext, useEffect, useState } from "react";
// import axios from "axios"; // Commented out as we are using dummy data

export const UserContext = createContext({})

export function UserContextProvider({ children }) {
  // --- Dummy Data for Demonstration ---
  // You can change the 'role' here to test different navbar menus
  const [currentuser, setCurrentUser] = useState({
    email: "admin@example.com",
    profilePicture: "https://via.placeholder.com/150", // Dummy profile picture
    role: "Admin", // Change to 'Verifier' or 'Preparer' to test other roles
    refCode: "REF123",
    phoneNo: "9876543210",
    id: "user123admin", // Dummy ID
    isVerified: true,
    isProfileCompleted: true,
    isKYCVerified: true
  });

  const [userData, setUserData] = useState({
    name: "John Doe (Dummy)",
    referCount: "5",
    address: { state: "Maharashtra", city: "Pune", pincode: "411001" },
    panNo: "ABCDE1234F",
    aadharNo: "123456789012",
    dob: "01-01-1990"
  });

  const [loading, setLoading] = useState(false); // Still good to have, but will always be false with dummy data

  // --- Commented out: Backend API Calls ---
  /*
  const fetchUserData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post('/api/user/details', { userId: currentuser.id });
      setUserData({
        name: data.fullName,
        referCount: data.referCount,
        address: { state: data.address?.state || "xxxxx", city: data.address?.city || "xxxxx", pincode: data.address?.pincode || "xxxxxxx" },
        panNo: data.panNo,
        aadharNo: data.aadharNo,
        dob: data.dob || "xx-xx-xxxx"
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

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
          setCurrentUser({
            email: data.email,
            phoneNo: data.phoneNo,
            profilePicture: data.profilePicture,
            role: data.role,
            refCode: data.refCode,
            id: data._id,
            isVerified: data.isVerified,
            isProfileCompleted: data.isProfileCompleted,
            isKYCVerified: data.isKYCVerified
          });
        }
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.log(err);
      }
    }
    fetchUser();
  }, []);

  useEffect(() => {
    // Only fetch user data if currentuser.id is set (after initial currentuser is set)
    if (currentuser.id) {
      fetchUserData();
    }
  }, [currentuser.id]);
  */

  // If you want to simulate loading for a bit, you can uncomment this
  // useEffect(() => {
  //   setLoading(true);
  //   const timer = setTimeout(() => {
  //     setLoading(false);
  //   }, 1000); // Simulate 1 second loading
  //   return () => clearTimeout(timer);
  // }, []);


  // if(loading){
  //   return (<div className={`w-screen h-screen flex items-center justify-center bg-primary z-20`}>
  //     <img src={Loader} alt="Loading..." className=" h-16" />
  //   </div>)
  // }

  return (
    <UserContext.Provider value={{ currentuser, setCurrentUser, userData }}>
      {children}
    </UserContext.Provider>
  )
}
