import React, { useState } from 'react';
import { LogoIcon } from './icons/Icons';

interface LoginViewProps {
    onLogin: () => void;
}

const LoginView: React.FC<LoginViewProps> = ({ onLogin }) => {
    const [name, setName] = useState('');

    const handleLogin = () => {
        if (name.trim()) {
            const userProfile = { name, targetDate: '', progress: 0, profilePicture: null }; // Initialize with null picture
            localStorage.setItem('userProfile', JSON.stringify(userProfile));
            onLogin();
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-slate-900 text-slate-100">
            <div className="w-full max-w-sm text-center bg-slate-800 p-8 rounded-2xl shadow-2xl">
                <LogoIcon className="h-16 w-16 text-brand-green mx-auto mb-4" />
                <h1 className="text-2xl font-bold mb-2">Welcome to K53 Master</h1>
                <p className="text-slate-400 mb-8">What should we call you?</p>
                <div className="space-y-6">
                    <div>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                            placeholder="Enter your name"
                            className="w-full bg-slate-700 border border-slate-600 rounded-lg p-3 text-center text-slate-100 focus:ring-2 focus:ring-brand-blue focus:outline-none"
                            aria-label="Your Name"
                        />
                    </div>
                    <button
                        onClick={handleLogin}
                        disabled={!name.trim()}
                        className="w-full bg-brand-blue hover:bg-brand-green text-white font-bold py-3 px-6 rounded-lg transition-colors disabled:bg-slate-600 disabled:cursor-not-allowed"
                    >
                        Continue
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginView;