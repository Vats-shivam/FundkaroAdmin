import { useState } from "react";
import "./App.css";
import AuthPage from "./pages/AuthPage";
import Login from "./components/Login";
import Register from "./components/Register";
import NoPage from "./pages/NoPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Forget from "./components/Forget";
import Dashboard from "./pages/Dashboard";
import DashboardHome from "./components/DashboardHome";

function App() {
  return (
    <>
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
                  loginStyles={"relative bottom-[14rem] right-[15rem]"}
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
            path={"/user/dashboard/loanmaster"}
            element={<Dashboard></Dashboard>}
          />
          <Route
            path={"/user/dashboard/tools"}
            element={<Dashboard></Dashboard>}
          />
          <Route
            path={"/user/dashboard/resources"}
            element={<Dashboard></Dashboard>}
          />
          <Route
            path={"/user/dashboard/refferal"}
            element={<Dashboard></Dashboard>}
          />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
