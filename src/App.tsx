import React, { useState } from 'react';
import { User } from './types';
import LoginScreen from './components/Auth/LoginScreen';
import Sidebar from './components/Layout/Sidebar';
import Dashboard from './components/Dashboard/Dashboard';
import AICalls from './components/AICalls/AICalls';
import TradeProcess from './components/TradeProcess/TradeProcess';
import Documents from './components/Documents/Documents';
import MarketAnalysis from './components/MarketAnalysis/MarketAnalysis';
import Profile from './components/Profile/Profile';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [activeSection, setActiveSection] = useState('dashboard');

  const handleLogin = (loggedInUser: User) => {
    setUser(loggedInUser);
  };

  const handleLogout = () => {
    setUser(null);
    setActiveSection('dashboard');
  };

  const renderContent = () => {
    if (!user) return null;

    switch (activeSection) {
      case 'dashboard':
        return <Dashboard user={user} />;
      case 'ai-calls':
        return <AICalls user={user} />;
      case 'trade-process':
        return <TradeProcess user={user} />;
      case 'documents':
        return <Documents user={user} />;
      case 'market-analysis':
        return <MarketAnalysis user={user} />;
      case 'profile':
        return <Profile user={user} />;
      default:
        return <Dashboard user={user} />;
    }
  };

  if (!user) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        userType={user.type}
        onLogout={handleLogout}
      />
      <main className="flex-1 overflow-auto">
        <div className="p-6">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}

export default App;
