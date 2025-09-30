
import React from 'react';
import { TestIcon, CarIcon, ChartIcon, ChatIcon } from './icons/Icons';
import { View } from '../types';

interface DashboardViewProps {
  setCurrentView: (view: View) => void;
}

const ProgressSummary: React.FC<{setCurrentView: (view: View) => void}> = ({setCurrentView}) => (
    <div className="bg-slate-800 p-6 rounded-lg shadow-lg mb-8 flex flex-col md:flex-row items-center justify-between">
        <div>
            <h2 className="text-xl font-bold text-white">Your Learning Journey</h2>
            <p className="text-slate-400">Overall Progress: <span className="text-brand-green font-semibold">45% Complete</span></p>
        </div>
        <div className="flex items-center gap-6 mt-4 md:mt-0">
            <div className="text-center">
                <p className="text-slate-300 text-sm">Avg. Test Score</p>
                <p className="text-2xl font-bold text-brand-light">82%</p>
            </div>
            <div className="text-center">
                <p className="text-slate-300 text-sm">Sim Sessions</p>
                <p className="text-2xl font-bold text-brand-light">3</p>
            </div>
            <button onClick={() => setCurrentView('progress')} className="bg-slate-700 hover:bg-brand-blue text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center">
                <ChartIcon className="w-5 h-5 mr-2" />
                View Full Report
            </button>
        </div>
    </div>
);


const DashboardView: React.FC<DashboardViewProps> = ({ setCurrentView }) => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-100 mb-2">Welcome Back, Learner!</h1>
      <p className="text-slate-400 mb-8">Follow your personalized learning path to ace your tests.</p>
      
      <ProgressSummary setCurrentView={setCurrentView} />

      <div className="space-y-6">
        {/* Module 1 */}
        <div className="bg-slate-800 p-6 rounded-lg shadow-lg">
            <div className="flex items-center mb-4">
                <div className="bg-brand-blue text-white rounded-full h-10 w-10 flex items-center justify-center font-bold text-xl">1</div>
                <h3 className="text-xl font-semibold text-white ml-4">K53 Foundations</h3>
            </div>
            <p className="text-slate-400 text-sm mb-4 ml-14">Start with the basics. Understand the rules of the road and get your questions answered by our AI Tutor.</p>
            <div className="ml-14 flex flex-wrap gap-4">
                 <button onClick={() => alert('Study materials coming soon!')} className="bg-slate-700 hover:bg-brand-blue text-white font-semibold py-2 px-4 rounded-lg transition-colors">
                    Read Study Guide
                </button>
                 <button onClick={() => setCurrentView('chatbot')} className="bg-slate-700 hover:bg-brand-blue text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center">
                    <ChatIcon className="w-5 h-5 mr-2" /> Ask AI Tutor
                </button>
            </div>
        </div>

        {/* Module 2 */}
        <div className="bg-slate-800 p-6 rounded-lg shadow-lg">
            <div className="flex items-center mb-4">
                <div className="bg-brand-blue text-white rounded-full h-10 w-10 flex items-center justify-center font-bold text-xl">2</div>
                <h3 className="text-xl font-semibold text-white ml-4">Learner's Test Preparation</h3>
            </div>
            <p className="text-slate-400 text-sm mb-4 ml-14">Put your knowledge to the test with unlimited, AI-generated practice exams that mimic the real thing.</p>
            <div className="ml-14">
                 <button onClick={() => setCurrentView('learners')} className="bg-brand-green hover:bg-brand-light text-brand-dark font-bold py-3 px-6 rounded-lg transition-colors flex items-center text-lg">
                    <TestIcon className="w-6 h-6 mr-2" /> Take a Mock Test
                </button>
            </div>
        </div>

        {/* Module 3 */}
        <div className="bg-slate-800 p-6 rounded-lg shadow-lg">
            <div className="flex items-center mb-4">
                <div className="bg-brand-blue text-white rounded-full h-10 w-10 flex items-center justify-center font-bold text-xl">3</div>
                <h3 className="text-xl font-semibold text-white ml-4">Practical Driving Skills</h3>
            </div>
            <p className="text-slate-400 text-sm mb-4 ml-14">Hone your skills in the driver's simulator. Review your performance with detailed telemetry and AI feedback.</p>
            <div className="ml-14">
                 <button onClick={() => setCurrentView('drivers')} className="bg-slate-700 hover:bg-brand-blue text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center">
                    <CarIcon className="w-5 h-5 mr-2" /> Launch Simulator
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
