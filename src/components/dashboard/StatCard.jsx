import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { clsx } from 'clsx';

const StatCard = ({ label, value, icon: Icon, trend, trendValue, color, delay = 0 }) => {
  const isPositive = trend === 'up';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="glass-card p-6 flex flex-col gap-4 group hover:scale-[1.02] transition-transform duration-300 cursor-pointer"
    >
      <div className="flex items-center justify-between">
        <div className={clsx(
          "w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-300",
          color === 'blue' ? "bg-blue-100/50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white" :
          color === 'emerald' ? "bg-emerald-100/50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 group-hover:bg-emerald-600 group-hover:text-white" :
          "bg-amber-100/50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 group-hover:bg-amber-600 group-hover:text-white"
        )}>
          <Icon size={24} />
        </div>
        
        {trendValue && (
          <div className={clsx(
            "flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold",
            isPositive 
              ? "bg-emerald-100/50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" 
              : "bg-rose-100/50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400"
          )}>
            {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            {trendValue}
          </div>
        )}
      </div>

      <div>
        <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">
          {label}
        </p>
        <h3 className="text-3xl font-extrabold text-slate-800 dark:text-white tracking-tight">
          {value}
        </h3>
      </div>
    </motion.div>
  );
};

export default StatCard;
