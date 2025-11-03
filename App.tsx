import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import DashboardView from './components/DashboardView';
import LearnersTestView from './components/LearnersTestView';
import SimulatorView from './components/SimulatorView';
import ChatbotView from './components/ChatbotView';
import ProgressView from './components/ProgressView';
import UserProfileView from './components/UserProfileView';
import LoginView from './components/LoginView';
import FloatingTutor from './components/FloatingTutor';
import { View } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [hasProfile, setHasProfile] = useState<boolean>(false);

  useEffect(() => {
    const storedProfile = localStorage.getItem('userProfile');
    if (storedProfile) {
      try {
        const { name } = JSON.parse(storedProfile);
        if (name && name.trim()) {
          setHasProfile(true);
        }
      } catch (e) {
        console.error("Failed to parse user profile", e);
        localStorage.removeItem('userProfile');
        setHasProfile(false);
      }
    }
  }, []);

  const handleLogin = () => {
    setHasProfile(true);
  };
  
  const handleLogout = () => {
    localStorage.removeItem('userProfile');
    setHasProfile(false);
    setCurrentView('dashboard');
  };

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <DashboardView setCurrentView={setCurrentView} onLogout={handleLogout} />;
      case 'learners':
        return <LearnersTestView />;
      case 'drivers':
        return <SimulatorView />;
      case 'chatbot':
        return <ChatbotView />;
      case 'progress':
        return <ProgressView />;
      case 'profile':
        return <UserProfileView />;
      default:
        return <DashboardView setCurrentView={setCurrentView} onLogout={handleLogout} />;
    }
  };

  if (!hasProfile) {
    return <LoginView onLogin={handleLogin} />;
  }

  return (
    <div className="flex h-screen bg-slate-900 text-slate-100 font-sans">
      <Sidebar currentView={currentView} setCurrentView={setCurrentView} />
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">
        {renderView()}
      </main>
      <FloatingTutor />
    </div>
  );
};

export default App;