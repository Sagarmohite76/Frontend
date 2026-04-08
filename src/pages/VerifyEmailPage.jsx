import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { RefreshCw } from 'lucide-react';
import Button from '../components/ui/Button';
import FormCard from '../components/ui/FormCard';
import OTPInput from '../components/ui/OTPInput';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const VerifyEmailPage = () => {
  const [timer, setTimer] = useState(60);
  const [submitted, setSubmitted] = useState(false);

  const timeoutRef = useRef(null);

  const { verifyOTP, loading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email || "your email";
  const navigateTo = location.state?.next || '/login';

  // ⏳ Timer Logic (clean + safe)
  useEffect(() => {
    if (timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  // 🔐 OTP Submit Handler (FIXED 🔥)
  const handleOTPComplete = useCallback((otp) => {
    if (submitted || loading) return;

    // debounce (avoid rapid multiple triggers)
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(async () => {
      try {
        setSubmitted(true);

        await verifyOTP({ email, otp });

        toast.success("OTP Verified!");

        navigate(navigateTo, { state: { email } });
      } catch (err) {


        setSubmitted(false); // allow retry

      }
    }, 300);
  }, [email, loading, navigate, navigateTo, submitted, verifyOTP]);

  // 🔁 Resend OTP
  const handleResend = async () => {
    if (timer > 0) return;

    try {
      setTimer(60);
      setSubmitted(false); // allow fresh OTP usage

      const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8000';
      const response = await fetch(`${API_URL}/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      if (!response.ok) throw new Error();

      toast.success("New OTP sent!");
    } catch (err) {
      toast.error("Failed to resend OTP");
    }
  };

  return (
    <FormCard
      title="Verify Your Email"
      subtitle={`We've sent a 4-digit code to ${email}`}
    >
      <div className="space-y-8 mt-4">

        {/* 🔢 OTP Input */}
        <OTPInput
          length={4}
          onComplete={handleOTPComplete}
          disabled={submitted || loading}
        />

        {/* ⏳ Timer + Resend */}
        <div className="text-center space-y-4">
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            {timer > 0 ? (
              <span>
                Resend code in{" "}
                <b className="text-primary-600">{timer}s</b>
              </span>
            ) : (
              <span>Didn't receive the code?</span>
            )}
          </p>

          <Button
            variant="secondary"
            className="w-full"
            onClick={handleResend}
            disabled={timer > 0 || loading}
            icon={RefreshCw}
          >
            {loading ? "Sending..." : "Resend OTP"}
          </Button>
        </div>

      </div>
    </FormCard>
  );
};

export default VerifyEmailPage;