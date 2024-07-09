import React from 'react';
import './App.css';
import Home from '../pages/Home/Home';
import Register from "../pages/auth/register.jsx";
import Login from "../pages/auth/login";
import ForgotPassword from "../pages/auth/forgetPassword";
import NotFound from "../pages/auth/notFound";
import GetInformation from "../pages/user/info";



import { BrowserRouter, Route, Routes } from 'react-router-dom';

export default function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/getinformation" element={<GetInformation />} />
          <Route path="/notfound" element={<NotFound />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
        </Routes>
      </BrowserRouter>
  );
}
