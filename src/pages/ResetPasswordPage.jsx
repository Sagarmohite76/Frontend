import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Lock, CheckSquare, ShieldCheck } from 'lucide-react';
import InputField from '../components/ui/InputField';
import Button from '../components/ui/Button';
import FormCard from '../components/ui/FormCard';
import { useAuth } from '../context/AuthContext';

const ResetPasswordPage = () => {
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [strength, setStrength] = useState({ score: 0, label: 'Weak' });
  const [errors, setErrors] = useState({});
  const { resetPassword, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  useEffect(() => {
    if (!email) {
      navigate('/forgot-password');
    }
  }, [email, navigate]);

  useEffect(() => {
    const password = formData.password;
    let score = 0;
    if (password.length >= 8) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[!@#$%^&*]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;

    const labels = ['Weak', 'Fair', 'Good', 'Strong', 'Excellent'];
    setStrength({ score, label: labels[score] });
  }, [formData.password]);

  const validate = () => {
    const newErrors = {};
    if (strength.score < 3) newErrors.password = "Password is too weak";
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      await resetPassword({ email, new_password: formData.password });
      navigate('/login');
    } catch (err) {}
  };

  return (
    <FormCard 
      title="Reset Password" 
      subtitle="Create a strong new password for your account"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <InputField
            id="password"
            label="New Password"
            type="password"
            placeholder="••••••••"
            icon={Lock}
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            error={errors.password}
          />
          
          <div className="px-1 space-y-1">
            <div className="flex justify-between text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              <span>Strength: <b className={strength.score > 2 ? 'text-emerald-500' : 'text-amber-500'}>{strength.label}</b></span>
            </div>
            <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-500 ${
                  strength.score < 2 ? 'bg-red-500' : strength.score < 4 ? 'bg-amber-500' : 'bg-emerald-500'
                }`}
                style={{ width: `${(strength.score / 4) * 100}%` }}
              />
            </div>
          </div>
        </div>

        <InputField
          id="confirmPassword"
          label="Confirm New Password"
          type="password"
          placeholder="••••••••"
          icon={CheckSquare}
          value={formData.confirmPassword}
          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
          error={errors.confirmPassword}
        />

        <Button 
          type="submit" 
          className="w-full" 
          loading={loading}
          icon={ShieldCheck}
        >
          Update Password
        </Button>
      </form>
    </FormCard>
  );
};

export default ResetPasswordPage;
