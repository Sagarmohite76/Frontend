import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  BarChart3, 
  Settings, 
  LogOut,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { clsx } from 'clsx';

const Sidebar = () => {
  const { logout } = useAuth();

  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { name: 'Input Data', icon: FileText, path: '/input-data' },
    { name: 'Analytics', icon: BarChart3, path: '/analytics' },
    { name: 'Settings', icon: Settings, path: '/settings' },
  ];

  return (
    <aside className="w-64 hidden lg:flex flex-col fixed left-0 top-0 h-screen bg-white/50 dark:bg-[#0b1120]/50 backdrop-blur-xl border-r border-slate-200 dark:border-slate-800/50 z-40 transition-all duration-300">
      <div className="p-6">
        <div className="flex items-center gap-3 group px-2 mb-10">
          <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center text-white shadow-lg shadow-primary-500/30">
            <span className="text-lg font-bold">S</span>
          </div>
          <span className="text-lg font-bold tracking-tight text-slate-800 dark:text-white">
            Performance<span className="text-primary-600">Pro</span>
          </span>
        </div>

        <nav className="space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) => clsx(
                "flex items-center justify-between p-3 rounded-xl transition-all duration-200 group",
                isActive 
                  ? "bg-primary-600 text-white shadow-lg shadow-primary-500/20" 
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:text-primary-600 dark:hover:text-primary-400"
              )}
            >
              <div className="flex items-center gap-3">
                <item.icon size={20} />
                <span className="font-semibold text-sm">{item.name}</span>
              </div>
              <ChevronRight 
                size={16} 
                className={clsx(
                  "opacity-0 -translate-x-2 transition-all duration-200",
                  "group-hover:opacity-100 group-hover:translate-x-0"
                )} 
              />
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="mt-auto p-6 border-t border-slate-200 dark:border-slate-800/50">
        <button
          onClick={logout}
          className="flex items-center gap-3 p-3 w-full rounded-xl text-slate-600 dark:text-slate-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 hover:text-rose-600 transition-all duration-200"
        >
          <LogOut size={20} />
          <span className="font-semibold text-sm">Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
