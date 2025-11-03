import React, { useState, useEffect } from 'react';
import { TestIcon, CarIcon, ChartIcon, ChatIcon, EditIcon, LogoutIcon, UserIcon, FeedbackIcon } from './icons/Icons';
import { View } from '../types';
import FeedbackModal from './FeedbackModal';

interface DashboardViewProps {
  setCurrentView: (view: View) => void;
  onLogout: () => void;
}

const ProgressSummary: React.FC<{setCurrentView: (view: View) => void; progress: number}> = ({setCurrentView, progress}) => (
    <div className="bg-slate-800 p-6 rounded-lg shadow-lg mb-8 flex flex-col md:flex-row items-center justify-between">
        <div>
            <h2 className="text-xl font-bold text-white">Your Learning Journey</h2>
            <p className="text-slate-400">Overall Progress: <span className="text-brand-green font-semibold">{progress}% Complete</span></p>
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


const DashboardView: React.FC<DashboardViewProps> = ({ setCurrentView, onLogout }) => {
    const [userName, setUserName] = useState('Learner');
    const [progress, setProgress] = useState(0);
    const [profilePicture, setProfilePicture] = useState<string | null>(null);
    const [isFeedbackModalOpen, setFeedbackModalOpen] = useState(false);

    useEffect(() => {
        const storedProfile = localStorage.getItem('userProfile');
        if (storedProfile) {
            const profile = JSON.parse(storedProfile);
            if (profile.name) {
                setUserName(profile.name);
            }
            setProgress(profile.progress || 0);
            setProfilePicture(profile.profilePicture || null);
        }
    }, []);
    
    const handleFeedbackSubmit = (feedbackText: string) => {
        try {
            const existingFeedback = JSON.parse(localStorage.getItem('userFeedback') || '[]');
            const newFeedback = {
                text: feedbackText,
                timestamp: new Date().toISOString(),
            };
            localStorage.setItem('userFeedback', JSON.stringify([...existingFeedback, newFeedback]));
            return true;
        } catch (error) {
            console.error("Failed to save feedback:", error);
            return false;
        }
    };


  return (
    <div>
        <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-4">
                {profilePicture ? (
                    <img src={profilePicture} alt="Profile" className="w-12 h-12 rounded-full object-cover" />
                ) : (
                    <div className="w-12 h-12 rounded-full bg-slate-700 flex items-center justify-center">
                        <UserIcon className="w-8 h-8 text-slate-400"/>
                    </div>
                )}
                <h1 className="text-3xl font-bold text-slate-100">Welcome Back, {userName}!</h1>
            </div>
            <div className="flex items-center gap-2">
                <button
                    onClick={() => setCurrentView('profile')}
                    className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors py-1 px-3 rounded-lg hover:bg-slate-700"
                    aria-label="Edit user profile"
                >
                    <EditIcon className="w-5 h-5" />
                    <span className="text-sm font-medium hidden sm:inline">Edit Profile</span>
                </button>
                 <button
                    onClick={() => setFeedbackModalOpen(true)}
                    className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors py-1 px-3 rounded-lg hover:bg-slate-700"
                    aria-label="Give feedback"
                >
                    <FeedbackIcon className="w-5 h-5" />
                    <span className="text-sm font-medium hidden sm:inline">Feedback</span>
                </button>
                <button
                    onClick={onLogout}
                    className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors py-1 px-3 rounded-lg hover:bg-slate-700"
                    aria-label="Log out"
                >
                    <LogoutIcon className="w-5 h-5" />
                    <span className="text-sm font-medium hidden sm:inline">Logout</span>
                </button>
            </div>
        </div>
      <p className="text-slate-400 mb-8 ml-16">Follow your personalized learning path to ace your tests.</p>
      
      <ProgressSummary setCurrentView={setCurrentView} progress={progress} />

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
       <FeedbackModal 
        isOpen={isFeedbackModalOpen}
        onClose={() => setFeedbackModalOpen(false)}
        onSubmit={handleFeedbackSubmit}
      />
    </div>
  );
};

export default DashboardView;