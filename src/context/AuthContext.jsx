import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { CheckCircle, Info, XCircle } from 'lucide-react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // Backend API URL
  const API_URL = import.meta.env.VITE_API_URL?.replace(/\/$/, '') || 'http://127.0.0.1:8000';

  // Generic API call helper
  const apiCall = async (endpoint, data, successMessage, Icon = CheckCircle) => {
    setLoading(true);

    // Ensure endpoint does not end with a slash
    const url = `${API_URL}${endpoint.replace(/\/$/, '')}`;

    try {
      console.log(`🔥 Sending request to: ${url}`, data);

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      setLoading(false);

      if (!response.ok) {
        throw new Error(result.detail || result.error || 'Something went wrong');
      }

      if (successMessage && result.message) {
        toast.success(result.message || successMessage, {
          icon: <Icon className={Icon === Info ? "text-primary-500" : "text-emerald-500"} size={20} />,
        });
      }

      return result;
    } catch (error) {
      setLoading(false);
      toast.error(error.message || 'Network error. Please try again.', {
        icon: <XCircle className="text-rose-500" size={20} />,
      });
      throw error;
    }
  };

  // Auth functions
  const login = async (credentials) => {
    const result = await apiCall('/login', credentials, "Login successful!", CheckCircle);
    setUser({ email: result.user?.email || credentials.email, name: result.user?.name || "User" });
    localStorage.setItem('user', JSON.stringify({ email: credentials.email, name: result.user?.name }));
    return result;
  };

  const register = async (userData) => {
    return await apiCall('/register', userData, "Registration successful!", CheckCircle);
  };

  const verifyOTP = async (data) => {
    return await apiCall('/verify-otp', data, "Email verified successfully!", CheckCircle);
  };

  const forgotPassword = async (email) => {
    return await apiCall('/send-otp', { email }, "OTP sent to your email!", CheckCircle);
  };

  const resetPassword = async (data) => {
    return await apiCall('/reset-password', data, "Password reset successful!", CheckCircle);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast.success("Logged out successfully", {
      icon: <Info className="text-primary-500" size={20} />,
    });
  };

  // Load user from localStorage on app start
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      login, 
      register, 
      verifyOTP, 
      forgotPassword, 
      resetPassword, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);