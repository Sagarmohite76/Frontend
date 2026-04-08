import React from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  GraduationCap, 
  TrendingUp, 
  Users, 
  Calendar,
  Search,
  Bell,
  CheckCircle2,
  FileText,
  Clock
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';
import { motion } from 'framer-motion';
import Sidebar from '../components/layout/Sidebar';
import StatCard from '../components/dashboard/StatCard';
import { clsx } from 'clsx';

const Dashboard = () => {
  const { user } = useAuth();

  const attendanceData = [
    { name: 'Week 1', attendance: 88 },
    { name: 'Week 2', attendance: 92 },
    { name: 'Week 3', attendance: 90 },
    { name: 'Week 4', attendance: 94 },
    { name: 'Week 5', attendance: 96 },
    { name: 'Week 6', attendance: 94 },
  ];

  const performanceData = [
    { subject: 'Math', current: 85, predicted: 92 },
    { subject: 'Science', current: 78, predicted: 85 },
    { subject: 'History', current: 92, predicted: 94 },
    { subject: 'Literature', current: 88, predicted: 90 },
    { subject: 'Computer', current: 75, predicted: 88 },
  ];

  const recentPredictions = [
    { id: 1, subject: 'Advanced Mathematics', date: '2 hours ago', status: 'PASS PROBABLE', confidence: '94%' },
    { id: 2, subject: 'Organic Chemistry', date: 'Yesterday', status: 'NEEDS ATTENTION', confidence: '68%' },
    { id: 3, subject: 'World History', date: '2 days ago', status: 'PASS PROBABLE', confidence: '82%' },
    { id: 4, subject: 'Data Structures', date: 'Apr 04, 2026', status: 'PASS PROBABLE', confidence: '91%' },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-[#0b1120] transition-colors duration-300 w-full">
      <Sidebar />
      
      <main className="flex-1 lg:ml-64 p-4 md:p-8 space-y-8 animate-fade-in relative z-10 overflow-hidden">
        {/* Decorative Glows */}
        <div className="absolute top-[-10%] right-[-10%] w-[400px] h-[400px] bg-primary-500/10 rounded-full blur-[120px] -z-10" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[100px] -z-10" />

        {/* Top Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-card p-6 border-none shadow-sm group">
          <div className="space-y-1">
            <h1 className="text-2xl font-black text-slate-800 dark:text-white tracking-tight">
              Dashboard Overview
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium flex items-center gap-2">
              <Calendar size={14} className="text-primary-500" />
              Welcome back, {user?.name || 'Student'}. Today is April 07, 2026.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative group/search hidden sm:block">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within/search:text-primary-500 transition-colors" />
              <input 
                type="text" 
                placeholder="Search analytics..." 
                className="pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800/50 border-none rounded-xl text-sm focus:ring-2 focus:ring-primary-500 w-64 transition-all"
              />
            </div>
            <button className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 hover:text-primary-500 transition-colors relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-primary-500 rounded-full border-2 border-white dark:border-slate-800" />
            </button>
          </div>
        </header>

        {/* Grid Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          <StatCard label="Overall Attendance" value="94.2%" icon={CheckCircle2} trend="up" trendValue="+2.4%" color="blue" delay={0.1} />
          <StatCard label="Predicted GPA" value="3.85" icon={GraduationCap} trend="up" trendValue="+0.12" color="emerald" delay={0.2} />
          <StatCard label="Course Progress" value="78%" icon={TrendingUp} trend="down" trendValue="-3%" color="blue" delay={0.3} />
          <StatCard label="Peer Ranking" value="Top 4%" icon={Users} trend="up" trendValue="+1%" color="emerald" delay={0.4} />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Engagement Card */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card p-6 space-y-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-800 dark:text-white">Engagement Trends</h3>
                <p className="text-slate-500 dark:text-slate-400 text-xs font-medium uppercase tracking-widest mt-1">Attendance last 6 weeks</p>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold px-3 py-1 bg-primary-500/10 text-primary-600 rounded-full">
                <div className="w-1.5 h-1.5 rounded-full bg-primary-500" />
                WEEKLY TREND
              </div>
            </div>

            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={attendanceData}>
                  <defs>
                    <linearGradient id="colorAttendance" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.1} />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }} 
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }} 
                    domain={[0, 100]}
                    dx={-10}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1e293b', 
                      border: 'none', 
                      borderRadius: '12px', 
                      boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                      color: '#fff'
                    }}
                    itemStyle={{ color: '#3b82f6', fontWeight: 600 }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="attendance" 
                    stroke="#3b82f6" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorAttendance)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Performance Card */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card p-6 space-y-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-800 dark:text-white">Performance Trends</h3>
                <p className="text-slate-500 dark:text-slate-400 text-xs font-medium uppercase tracking-widest mt-1">Current Score vs Predicted</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-[10px] font-black text-slate-400">
                  <div className="w-2 h-2 rounded-sm bg-slate-300 dark:bg-slate-700" />
                  CURRENT
                </div>
                <div className="flex items-center gap-2 text-[10px] font-black text-primary-500">
                  <div className="w-2 h-2 rounded-sm bg-primary-500" />
                  PREDICTED
                </div>
              </div>
            </div>

            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={performanceData} barGap={8}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.1} />
                  <XAxis 
                    dataKey="subject" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#64748b', fontSize: 11, fontWeight: 700 }} 
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }} 
                    dx={-10}
                  />
                  <Tooltip 
                     cursor={{ fill: 'rgba(59, 130, 246, 0.05)' }}
                     contentStyle={{ 
                      backgroundColor: '#1e293b', 
                      border: 'none', 
                      borderRadius: '12px', 
                      color: '#fff'
                    }}
                  />
                  <Bar dataKey="current" fill="#94a3b8" radius={[4, 4, 0, 0]} opacity={0.2} />
                  <Bar dataKey="predicted" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* Activity Feed Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 glass-card overflow-hidden"
          >
            <div className="p-6 border-b border-slate-200 dark:border-slate-800/50 flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-800 dark:text-white">Recent Predictions</h3>
              <button className="text-sm font-bold text-primary-600 hover:text-primary-700">View All Records</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50/50 dark:bg-slate-800/30 text-slate-400 text-xs font-black uppercase tracking-wider">
                    <th className="px-6 py-4">Subject Course</th>
                    <th className="px-6 py-4">Status Badge</th>
                    <th className="px-6 py-4 text-center">Confidence</th>
                    <th className="px-6 py-4 text-right">Activity Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800/50">
                  {recentPredictions.map((prediction) => (
                    <tr key={prediction.id} className="group hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-primary-100 dark:bg-primary-900/20 flex items-center justify-center text-primary-600">
                             <FileText size={16} />
                          </div>
                          <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{prediction.subject}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={clsx(
                          "px-3 py-1 rounded-full text-[10px] font-black tracking-tighter",
                          prediction.status === 'PASS PROBABLE' 
                            ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20" 
                            : "bg-amber-500/10 text-amber-500 border border-amber-500/20"
                        )}>
                          {prediction.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="text-sm font-black text-slate-800 dark:text-primary-400">{prediction.confidence}</span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className="text-xs font-medium text-slate-500 flex items-center justify-end gap-1.5">
                          <Clock size={12} />
                          {prediction.date}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-6 space-y-6"
          >
             <h3 className="text-lg font-bold text-slate-800 dark:text-white">Profile Insights</h3>
             <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-white/50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700/50 space-y-2">
                   <p className="text-xs font-black text-primary-500 uppercase tracking-widest">Strength</p>
                   <p className="text-sm font-bold text-slate-700 dark:text-slate-200">You are performing exceptionally well in Analytical subjects.</p>
                </div>
                <div className="p-4 rounded-2xl bg-white/50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700/50 space-y-2">
                   <p className="text-xs font-black text-rose-500 uppercase tracking-widest">Growth</p>
                   <p className="text-sm font-bold text-slate-700 dark:text-slate-200">Increase participation in Lab sessions to boost Science scores.</p>
                </div>
             </div>
             <button className="w-full py-4 bg-primary-600/10 text-primary-600 rounded-2xl font-black text-sm hover:bg-primary-600 hover:text-white transition-all shadow-lg shadow-primary-500/10">
                Generate Full Analysis
             </button>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

