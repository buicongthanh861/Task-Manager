import { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';
import { jwtDecode } from 'jwt-decode';

const Ctx = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Helper function để validate token
  const isValidToken = (token) => {
    if (!token || typeof token !== 'string') return false;
    try {
      const decoded = jwtDecode(token);
      // Kiểm tra token có đúng format không
      return decoded && typeof decoded === 'object' && decoded.id;
    } catch {
      return false;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && isValidToken(token)) {
      authAPI.me()
        .then(({ data }) => {
          if (data && data.user) {
            setUser(data.user);
          } else {
            localStorage.removeItem('token');
          }
        })
        .catch(() => localStorage.removeItem('token'))
        .finally(() => setLoading(false));
    } else {
      if (token) localStorage.removeItem('token');
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    try {
      const { data } = await authAPI.login({ email, password });
      
      // Validate token trước khi lưu
      if (data && data.token && isValidToken(data.token)) {
        localStorage.setItem('token', data.token);
        setUser(data.user);
      } else {
        throw new Error('Invalid token received');
      }
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const register = async (name, email, password) => {
    try {
      const { data } = await authAPI.register({ name, email, password });
      
      // Validate token trước khi lưu
      if (data && data.token && isValidToken(data.token)) {
        localStorage.setItem('token', data.token);
        setUser(data.user);
      } else {
        throw new Error('Invalid token received');
      }
    } catch (error) {
      console.error('Register failed:', error);
      throw error;
    }
  };

  const logout = () => { 
    localStorage.removeItem('token'); 
    setUser(null); 
  };

  return <Ctx.Provider value={{ user, loading, login, register, logout }}>{children}</Ctx.Provider>;
};

export const useAuth = () => useContext(Ctx);
