
import React from 'react';
import type { View } from '../types';
import { DashboardIcon, TestIcon, CarIcon, ChatIcon, LogoIcon, ChartIcon } from './icons/Icons';

interface SidebarProps {
  currentView: View;
  setCurrentView: (view: View) => void;
}

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: DashboardIcon },
  { id: 'learners', label: 'Learner\'s Test', icon: TestIcon },
  { id: 'drivers', label: 'Driver\'s Simulator', icon: CarIcon },
  { id: 'progress', label: 'Progress Reports', icon: ChartIcon },
  { id: 'chatbot', label: 'AI Tutor', icon: ChatIcon },
];

const Sidebar: React.FC<SidebarProps> = ({ currentView, setCurrentView }) => {
  return (
    <aside className="bg-slate-800 text-white w-20 md:w-64 flex flex-col transition-all duration-300">
      <div className="flex items-center justify-center md:justify-start p-4 md:pl-6 h-20 border-b border-slate-700">
        <LogoIcon className="h-10 w-10 text-brand-green" />
        <h1 className="hidden md:block ml-3 text-xl font-bold tracking-wider">K53 Master</h1>
      </div>
      <nav className="flex-1 mt-4">
        <ul>
          {navItems.map((item) => (
            <li key={item.id} className="px-2 md:px-4 mb-2">
              <button
                onClick={() => setCurrentView(item.id as View)}
                className={`flex items-center w-full p-3 rounded-lg transition-colors duration-200 ${
                  currentView === item.id
                    ? 'bg-brand-blue text-white'
                    : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                }`}
              >
                <item.icon className="h-6 w-6 flex-shrink-0" />
                <span className="hidden md:block ml-4 font-medium">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t border-slate-700">
        <p className="hidden md:block text-center text-xs text-slate-400">© 2024 K53 Master AI</p>
      </div>
    </aside>
  );
};

export default Sidebar;
