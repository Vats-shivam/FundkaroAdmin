import { useState } from 'react'
import './App.css'
import AuthPage from './pages/AuthPage'
import Login from './components/Login';
import Register from './components/Register';
import NoPage from './pages/NoPage';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Forget from './components/Forget';
import Dashboard from './pages/Dashboard';
import DashboardHome from './components/DashboardHome';
import Profile from './pages/Profile';
import axios from 'axios';
import { UserContextProvider } from './context/userContext';
axios.defaults.baseURL='http://localhost:8000';
axios.defaults.withCredentials=true;
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
              </Profile>
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
