import React from 'react';
import { motion } from 'framer-motion';

const FormCard = ({ children, title, subtitle }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="glass-card w-full max-w-md p-8 md:p-10"
    >
      <div className="space-y-2 mb-10 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-slate-800 dark:text-white leading-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base font-medium">
            {subtitle}
          </p>
        )}
      </div>
      {children}
    </motion.div>
  );
};

export default FormCard;
