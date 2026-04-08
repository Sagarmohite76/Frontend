import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, LogIn } from 'lucide-react';
import InputField from '../components/ui/InputField';
import Button from '../components/ui/Button';
import FormCard from '../components/ui/FormCard';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Invalid email format";
    if (!password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      await login({ email, password });
      navigate('/dashboard');
    } catch (err) {
      // Error handled by Toast in Context
    }
  };

  return (
    <FormCard 
      title="Welcome Back" 
      subtitle="Sign in to your student account"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <InputField
          id="email"
          label="Email Address"
          type="email"
          placeholder="name@university.edu"
          icon={Mail}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
        />
        <InputField
          id="password"
          label="Password"
          type="password"
          placeholder="••••••••"
          icon={Lock}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
        />

        <div className="flex items-center justify-between text-sm px-1">
          <label className="flex items-center gap-2 cursor-pointer text-slate-600 dark:text-slate-400">
            <input type="checkbox" className="rounded border-slate-300 text-primary-600 focus:ring-primary-500" />
            Remember me
          </label>
          <Link 
            to="/forgot-password" 
            className="text-primary-600 hover:text-primary-700 font-semibold"
          >
            Forgot Password?
          </Link>
        </div>

        <Button 
          type="submit" 
          className="w-full" 
          loading={loading}
          icon={LogIn}
        >
          Sign In
        </Button>

        <p className="text-center text-slate-600 dark:text-slate-400 text-sm">
          Don't have an account?{' '}
          <Link to="/register" className="text-primary-600 hover:text-primary-700 font-bold">
            Create Account
          </Link>
        </p>
      </form>
    </FormCard>
  );
};

export default LoginPage;
