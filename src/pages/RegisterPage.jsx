import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, CheckCircle } from 'lucide-react';
import InputField from '../components/ui/InputField';
import Button from '../components/ui/Button';
import FormCard from '../components/ui/FormCard';
import { useAuth } from '../context/AuthContext';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const { register, loading } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Full Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email format";
    
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
    if (!formData.password) newErrors.password = "Password is required";
    else if (!passwordRegex.test(formData.password)) {
      newErrors.password = "Min 8 chars, 1 number, 1 special char";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      await register(formData);
      navigate('/login');
    } catch (err) {}

  };

  return (
    <FormCard 
      title="Create Account" 
      subtitle="Join the student performance network"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <InputField
          id="name"
          label="Full Name"
          placeholder="John Doe"
          icon={User}
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
        />
        <InputField
          id="email"
          label="Email Address"
          type="email"
          placeholder="name@university.edu"
          icon={Mail}
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
        />
        <InputField
          id="password"
          label="Password"
          type="password"
          placeholder="••••••••"
          icon={Lock}
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
        />
        <InputField
          id="confirmPassword"
          label="Confirm Password"
          type="password"
          placeholder="••••••••"
          icon={CheckCircle}
          value={formData.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
        />

        <Button 
          type="submit" 
          className="w-full mt-6" 
          loading={loading}
          icon={CheckCircle}
        >
          Sign Up
        </Button>

        <p className="text-center text-slate-600 dark:text-slate-400 text-sm">
          Already have an account?{' '}
          <Link to="/login" className="text-primary-600 hover:text-primary-700 font-bold">
            Log In
          </Link>
        </p>
      </form>
    </FormCard>
  );
};

export default RegisterPage;
