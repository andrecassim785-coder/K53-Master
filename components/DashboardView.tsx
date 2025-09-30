
import React from 'react';
import Card from './Card';
import { TestIcon, CarIcon, ChartIcon, ChatIcon } from './icons/Icons';

const DashboardView: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-100 mb-2">Welcome Back, Learner!</h1>
      <p className="text-slate-400 mb-8">Your journey to getting your license starts here. Let's get practicing.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card title="Learner's Test Practice" icon={<TestIcon className="w-8 h-8 text-brand-green" />} description="Take mock tests to prepare for your learner's license exam. Powered by AI-generated questions." buttonText="Start Test" />
        
        <Card title="Driving Simulator" icon={<CarIcon className="w-8 h-8 text-brand-green" />} description="Practice your driving skills in our simulator and get instant AI feedback on your performance." buttonText="Launch Simulator" />

        <Card title="Progress Reports" icon={<ChartIcon className="w-8 h-8 text-brand-green" />} description="Track your test scores and simulator performance over time. Identify areas for improvement." buttonText="View Reports" />

        <Card title="AI Tutor Chatbot" icon={<ChatIcon className="w-8 h-8 text-brand-green" />} description="Have questions about K53 rules or driving maneuvers? Ask our AI Tutor anytime." buttonText="Ask a Question" />

        <div className="md:col-span-2 p-6 bg-slate-800 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold text-white mb-3">Your Recent Activity</h3>
            <ul className="space-y-3 text-slate-300">
                <li className="flex items-center">
                    <span className="bg-green-500/20 text-green-300 text-sm font-medium mr-3 px-2.5 py-0.5 rounded-full">PASS</span>
                    Learner's Test: Road Signs - Score: 92%
                    <span className="ml-auto text-xs text-slate-400">Yesterday</span>
                </li>
                <li className="flex items-center">
                    <span className="bg-blue-500/20 text-blue-300 text-sm font-medium mr-3 px-2.5 py-0.5 rounded-full">SESSION</span>
                    Simulator: Urban Driving - 15 mins
                    <span className="ml-auto text-xs text-slate-400">2 days ago</span>
                </li>
                 <li className="flex items-center">
                    <span className="bg-yellow-500/20 text-yellow-300 text-sm font-medium mr-3 px-2.5 py-0.5 rounded-full">REVIEW</span>
                    AI Feedback on Parallel Parking received.
                    <span className="ml-auto text-xs text-slate-400">2 days ago</span>
                </li>
            </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
