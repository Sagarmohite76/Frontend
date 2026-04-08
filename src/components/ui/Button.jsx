import React from 'react';
import { Loader2 } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const Button = ({ 
  children, 
  variant = 'primary', 
  loading = false, 
  icon: Icon, 
  className, 
  disabled, 
  ...props 
}) => {
  const variants = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    ghost: 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 p-2 rounded-lg transition-colors',
  };

  return (
    <button
      className={twMerge(
        variants[variant],
        (loading || disabled) && "opacity-50 cursor-not-allowed pointer-events-none",
        className
      )}
      disabled={loading || disabled}
      {...props}
    >
      {loading ? (
        <Loader2 className="animate-spin" size={20} />
      ) : (
        <>
          {Icon && <Icon size={20} />}
          {children}
        </>
      )}
    </button>
  );
};

export default Button;
