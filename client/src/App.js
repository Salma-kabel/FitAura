import React from "react";
import { Routes, Route } from "react-router-dom";
import JwtLogin from "./views/sessions/JwtLogin";
import JwtRegister from "./views/sessions/JwtRegister";
import Dashboard from "./views/dashboard/Analytics"; 
import NotFound from "./views/sessions/NotFound";

const App = () => {
  return (
    <Routes>
      <Route path="/session/signin" element={<JwtLogin />} />
      <Route path="/session/signup" element={<JwtRegister />} />
      <Route path="/dashboard/default" element={<Dashboard />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
