import React from 'react';
import './App.css';
import Home from '../pages/Home/Home';
import Register from "../pages/auth/register.jsx";
import Login from "../pages/auth/login";
import ForgotPassword from "../pages/auth/forgetPassword";
import NotFound from "../pages/auth/notFound";
import GetInformation from "../pages/user/info";
import ResetPassword from "../pages/auth/resetPassword";
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
// import { canBeLoggedIn } from '../pages/auth/login.jsx'

let loggedIn = true;

const RedirectToLogin = () => {
  return <Navigate to="/login" replace />;
};
export default function App() {

  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RedirectToLogin />} />
          <Route path="/login" element={<Login />} />
          <Route path='/api/dashboard' element={
            (loggedIn ? <Home /> : <Login />)
          } />
          <Route path="/register" element={<Register />} />
          <Route path="/getinformation" element={
            (loggedIn ? <GetInformation /> : <Login />)
          } />
          <Route path="/notfound" element={<NotFound />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
        </Routes>
      </BrowserRouter>
  );
}
