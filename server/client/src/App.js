import React from 'react';
import './App.css';
import ForgotPassword from './info';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './home'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ForgotPassword />} />
        <Route path="/goal" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;