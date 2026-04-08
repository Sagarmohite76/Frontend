import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, ArrowLeft, Send } from 'lucide-react';
import InputField from '../components/ui/InputField';
import Button from '../components/ui/Button';
import FormCard from '../components/ui/FormCard';
import { useAuth } from '../context/AuthContext';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const { forgotPassword, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!email) {
      setError("Email is required");
      return;
    }
    
    try {
      await forgotPassword(email);
      navigate('/verify-email', { state: { email, next: '/reset-password' } });
    } catch (err) {
      // Error handling is typically done in the auth context/toast
    }
  };

  return (
    <FormCard 
      title="Forgot Password?" 
      subtitle="Enter your email to receive an OTP"
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
          error={error}
        />

        <Button 
          type="submit" 
          className="w-full" 
          loading={loading}
          icon={Send}
        >
          Send OTP
        </Button>

        <div className="text-center">
          <Link 
            to="/login" 
            className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-primary-600 font-semibold text-sm transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Login
          </Link>
        </div>
      </form>
    </FormCard>
  );
};

export default ForgotPasswordPage;

