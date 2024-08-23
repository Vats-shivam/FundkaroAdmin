import { Suspense, lazy } from 'react';
import './App.css'
import AuthPage from './pages/AuthPage'
import Login from './components/Login';
import NoPage from './pages/NoPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Admin from './pages/Admin';
import Applications from './components/Applications';
import axios from 'axios';
import { UserContextProvider } from './context/userContext';
import AdminLoanMaster from './components/AdminLoanMaster';
import AdminStaff from './components/AdminStaff';
import AdminHome from './components/AdminHome';
import AdminClients from './components/AdminClients';
import UserProfile from './components/UserProfile';
import ViewApplication from './components/ViewApplication';
import Notifications from './components/Notifications';
import EmailSender from './components/EmailSender';
const Dashboard = lazy(() => import('./pages/Dashboard'))
const UserApplication = lazy(() => import('./components/UserApplication'))
import Loader from './assets/loader.svg'

axios.defaults.baseURL = 'https://newbackend-ww8t.onrender.com';
axios.defaults.baseURL = 'http://localhost:8000/';

function App() {

  return (
    <>
      <Suspense fallback={(<div className={`w-screen h-screen flex items-center justify-center bg-primary z-20`}>
        <img src={Loader} alt="Loading..." className=" h-16" />
      </div>)}>
        <UserContextProvider>
          {/* <CategoryContextProvider> */}
          <BrowserRouter>
            <Routes>
              <Route
                path={"/login"}
                element={
                  <AuthPage>
                    <Login loginStyles={""} />
                  </AuthPage>
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
                path={'/admin/notifications'}
                element={
                  <Admin>
                    <Notifications />
                  </Admin>
                }
              />
              <Route
                path={'/admin/emails'}
                element={
                  <Admin>
                    <EmailSender />
                  </Admin>
                }
              />
              <Route
                path={'/admin/clients/:userId'}
                element={
                  <Admin>
                    <UserProfile />
                  </Admin>
                }
              />
              <Route
                path={'/admin/application/:applicationId'}
                element={
                  <Admin>
                    <ViewApplication />
                  </Admin>
                }
              />
              <Route path="*" element={<NoPage />} />
            </Routes>
          </BrowserRouter>
          {/* </CategoryContextProvider> */}
        </UserContextProvider>
      </Suspense>
    </>
  );
}

export default App;
