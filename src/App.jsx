import { useState } from 'react'
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
import ShowProfile from './components/ShowProfile';
import EditProfile from './components/EditProfile';
import Admin from './pages/Admin'
import AdminBlogs from './components/AdminBlogs';
import axios from 'axios';
import { UserContextProvider } from './context/userContext';
import AdminLoanMaster from './components/AdminLoanMaster';
import AdminStaff from './components/AdminStaff';
import AdminHome from './components/AdminHome';
import AdminClients from './components/AdminClients';
axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true;


function App() {
  return (
    <>
      <UserContextProvider>
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
                  <AdminHome/>
                </Admin>
              }
            />
            <Route
            path={'/admin/loanmaster'}
            element={
              <Admin>
                <AdminLoanMaster/>
              </Admin>
            }
            />
            <Route
            path={'/admin/blogs'}
            element={
              <Admin>
                <AdminBlogs/>
              </Admin>
            }
            />
            <Route
            path={'/admin/staff'}
            element={
              <Admin>
                <AdminStaff/>
              </Admin>
            }
            />
           <Route
            path={'/admin/clients'}
            element={
              <Admin>
                <AdminClients/>
              </Admin>
            }
            />
            <Route path="*" element={<NoPage />} />
          </Routes>
        </BrowserRouter>
      </UserContextProvider>
    </>
  );
}

export default App;
