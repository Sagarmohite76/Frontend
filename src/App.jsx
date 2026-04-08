// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import ThemeToggle from './components/ui/ThemeToggle';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import VerifyEmailPage from './pages/VerifyEmailPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import Dashboard from './pages/Dashboard';

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  return children;
};

// Animated routes wrapper
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/verify-email" element={<VerifyEmailPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </AnimatePresence>
  );
};

// Main App component
function App() {
  return (
    <AuthProvider>
      {/* Set basename="/Frontend" to match Vite base path */}
      <Router basename="/Frontend">
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col transition-colors duration-300">
          
          {/* Toast notifications */}
          <Toaster
            position="top-right"
            toastOptions={{
              className:
                'backdrop-blur-xl bg-white/70 dark:bg-slate-900/80 text-slate-800 dark:text-slate-100 border border-white/40 dark:border-slate-800/60 shadow-2xl rounded-2xl p-4 font-medium min-w-[300px]',
              duration: 4000,
              style: {
                animation: 'slide-in 0.3s ease-out',
              },
            }}
          />

          {/* Header */}
          <header className="p-4 md:p-6 flex justify-between items-center max-w-7xl mx-auto w-full">
            <div className="flex items-center gap-2 group cursor-pointer">
              <div className="w-10 h-10 rounded-xl bg-primary-600 flex items-center justify-center text-white shadow-lg shadow-primary-500/30 group-hover:scale-110 transition-transform">
                <span className="text-xl font-bold">S</span>
              </div>
              <h1 className="text-xl font-bold tracking-tight text-slate-800 dark:text-white hidden sm:block">
                Performance<span className="text-primary-600">Pro</span>
              </h1>
            </div>
            <ThemeToggle />
          </header>

          {/* Main content */}
          <main className="flex-1 flex flex-col items-center justify-center p-4">
            <AnimatedRoutes />
          </main>

          {/* Footer */}
          <footer className="p-6 text-center text-slate-400 text-sm">
            &copy; 2026 Student Performance Prediction System. All rights reserved.
          </footer>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;