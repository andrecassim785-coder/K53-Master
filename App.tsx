
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import DashboardView from './components/DashboardView';
import LearnersTestView from './components/LearnersTestView';
import SimulatorView from './components/SimulatorView';
import ChatbotView from './components/ChatbotView';
import ProgressView from './components/ProgressView';
import { View } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('dashboard');

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <DashboardView setCurrentView={setCurrentView} />;
      case 'learners':
        return <LearnersTestView />;
      case 'drivers':
        return <SimulatorView />;
      case 'chatbot':
        return <ChatbotView />;
      case 'progress':
        return <ProgressView />;
      default:
        return <DashboardView setCurrentView={setCurrentView} />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-900 text-slate-100 font-sans">
      <Sidebar currentView={currentView} setCurrentView={setCurrentView} />
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">
        {renderView()}
      </main>
    </div>
  );
};

export default App;
