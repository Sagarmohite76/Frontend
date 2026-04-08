import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const InputField = ({ 
  label, 
  error, 
  icon: Icon, 
  className, 
  id, 
  ...props 
}) => {
  return (
    <div className="w-full space-y-1.5 transition-all duration-300 animate-slide-up">
      {label && (
        <label 
          htmlFor={id} 
          className="block text-sm font-medium text-slate-700 dark:text-slate-300 ml-1"
        >
          {label}
        </label>
      )}
      <div className="relative group">
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-500 transition-colors duration-200">
            <Icon size={20} />
          </div>
        )}
        <input
          id={id}
          className={twMerge(
            "input-field",
            Icon ? "pl-11" : "pl-4",
            error ? "border-red-500 focus:ring-red-500" : "focus:ring-primary-500",
            className
          )}
          {...props}
        />
      </div>
      {error && (
        <p className="text-xs text-red-500 font-medium ml-1 animate-fade-in">
          {error}
        </p>
      )}
    </div>
  );
};

export default InputField;
