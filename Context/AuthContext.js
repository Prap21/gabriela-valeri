import React, { createContext, useState, useEffect, useContext } from 'react';

export const AuthContext = createContext({ user: null, login: () => {}, logout: () => {} });

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  if (loading) return <div>Loading...</div>;

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};
