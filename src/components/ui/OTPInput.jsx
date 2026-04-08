import React, { useState, useRef, useEffect } from 'react';

const OTPInput = ({ length = 6, onComplete }) => {
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const [canSubmit, setCanSubmit] = useState(true);
  const inputRefs = useRef([]);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);
    setCanSubmit(true);

    if (element.value !== "" && index < length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  useEffect(() => {
    if (otp.join("").length === length && canSubmit) {
      setCanSubmit(false);
      onComplete(otp.join(""));
    }
  }, [otp, length, onComplete, canSubmit]);

  return (
    <div className="flex justify-between gap-2 max-w-sm mx-auto animate-fade-in">
      {otp.map((data, index) => (
        <input
          key={index}
          type="text"
          maxLength="1"
          ref={(el) => (inputRefs.current[index] = el)}
          value={data}
          onChange={(e) => handleChange(e.target, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          className="w-12 h-14 text-center text-2xl font-bold rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 focus:border-primary-500 focus:ring-2 focus:ring-primary-500 outline-none transition-all duration-200"
        />
      ))}
    </div>
  );
};

export default OTPInput;
