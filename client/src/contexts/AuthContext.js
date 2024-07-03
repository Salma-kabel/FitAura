import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import * as authApi from '../api/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedUser = jwtDecode(token);
      setUser(decodedUser);
    }
    setLoading(false);
  }, []);

  const login = async (userData) => {
    const data = await authApi.login(userData);
    localStorage.setItem('token', data.token);
    const decodedUser = jwtDecode(data.token);
    setUser(decodedUser);
    navigate('/dashboard/default');
  };

  const register = async (userData) => {
    await authApi.register(userData);
    navigate('/session/signin');
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/session/signin');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
