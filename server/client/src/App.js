import React from 'react';
import './App.css';
import GetInformation from './info';
import ForgotPassword from './forgetPassword';
import Login from './login';
import NotFound from './notFound';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Analytics from './dashboard/Analytics';
import CssBaseline from "@mui/material/CssBaseline";
import MatxTheme from "./dashboard/components/MatxTheme/MatxTheme";
import SettingsProvider from "./dashboard/contexts/SettingsContext";
import Register from './register'

function App() {
  return (
    <SettingsProvider>
      <MatxTheme>
        <CssBaseline />
          <BrowserRouter>
            <Routes>
              <Route path="/register" element={<Register />} />
              <Route path="/" element={<Analytics />} />
              <Route path="/login" element={<Login />} />
              <Route path="/getinformation" element={<GetInformation />} />
              <Route path="/notfound" element={<NotFound />} />
              <Route path="/forgotpassword" element={<ForgotPassword />} />
            </Routes>
          </BrowserRouter>
      </MatxTheme>
    </SettingsProvider>
  );
}

export default App;