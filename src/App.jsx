import './App.css'
import AuthPage from './pages/AuthPage'
import Login from './components/Login';
import Register from './components/Register';
import NoPage from './pages/NoPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Forget from './components/Forget';
import Dashboard from './pages/Dashboard';
import DashboardHome from './components/DashboardHome';
import Profile from './pages/Profile';
import Admin from './pages/Admin';
import Applications from './components/Applications';
import VerifyOtp from './components/VerifyOtp';
import axios from 'axios';
import { UserContextProvider } from './context/userContext';
import AdminLoanMaster from './components/AdminLoanMaster';
import AdminStaff from './components/AdminStaff';
import AdminHome from './components/AdminHome';
import AdminClients from './components/AdminClients';
import UserLoanMaster from './components/UserLoanMaster';
import EditProfile from './components/EditProfile';
import ShowProfile from './components/ShowProfile';
import UserApplication from './components/UserApplication';



axios.defaults.baseURL = 'https://newbackend-production-4bfc.up.railway.app';

function App() {

  return (
    <>
      <UserContextProvider>
        {/* <CategoryContextProvider> */}
          <BrowserRouter>
            <Routes>
              <Route
                path={"/user/login"}
                element={
                  <AuthPage>
                    <Login loginStyles={""} />
                  </AuthPage>
                }
              />
              <Route
                path={"/user/register"}
                element={
                  <AuthPage>
                    <Register
                      loginStyles={""}
                    />
                  </AuthPage>
                }
              />
              <Route
                path={"/user/register/verify-otp"}
                element={
                  <AuthPage>
                    <VerifyOtp />
                  </AuthPage>
                }
              />
              <Route
                path={"/user/forget"}
                element={
                  <AuthPage>
                    <Forget loginStyles={"relative bottom-[14rem] right-[15rem]"} />
                  </AuthPage>
                }
              />
              <Route
                path={"/user/dashboard"}
                element={
                  <Dashboard>
                    <DashboardHome />
                  </Dashboard>
                }
              />
              <Route
                path={"/user/loanmaster"}
                element={
                  <Dashboard ForceSidebarClose={true}>
                    <UserLoanMaster />
                  </Dashboard>
                }
              />
              <Route
                path={"/user/profile"}
                element={
                  <Profile ShowBackarrow={true}>
                    <ShowProfile />
                  </Profile>
                }
              />
              <Route
                path={"/user/profile/edit"}
                element={
                  <Profile ShowBackarrow={true}>
                    <EditProfile />
                  </Profile>
                }
              />
              <Route
                path={"/admin"}
                element={
                  <Admin>
                    <AdminHome />
                  </Admin>
                }
              />
              <Route
                path={'/admin/loanmaster'}
                element={
                  <Admin>
                    <AdminLoanMaster />
                  </Admin>
                }
              />
              <Route
                path={'/admin/applications'}
                element={
                  <Admin>
                    <Applications />
                  </Admin>
                }
              />
              <Route
                path={'/admin/staff'}
                element={
                  <Admin>
                    <AdminStaff />
                  </Admin>
                }
              />
              <Route
                path={'/admin/clients'}
                element={
                  <Admin>
                    <AdminClients />
                  </Admin>
                }
              />
              <Route
                path={"/user/application"}
                element={
                  <Dashboard>
                    <UserApplication/>
                  </Dashboard>
                }
              />
              <Route path="*" element={<NoPage />} />
            </Routes>
          </BrowserRouter>
        {/* </CategoryContextProvider> */}
      </UserContextProvider>
    </>
  );
}

export default App;
