import { useState } from 'react'
import './App.css'
import AuthPage from './pages/AuthPage'
import Login from './components/Login';
import Register from './components/Register';
import NoPage from './pages/NoPage';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Forget from './components/Forget';

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
          <Route path={"/user/login"} element={<AuthPage><Login loginStyles={"relative bottom-[14rem] right-[15rem]"}/></AuthPage>} />
          <Route path={"/user/register"} element={<AuthPage><Register loginStyles={"relative bottom-[14rem] right-[15rem]"}/></AuthPage>} />
          <Route path={"/user/forget"} element={<AuthPage><Forget loginStyles={"relative bottom-[14rem] right-[15rem]"}/></AuthPage>} />
          <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
