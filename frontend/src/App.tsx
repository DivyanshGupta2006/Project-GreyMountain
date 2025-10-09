import { useState } from 'react';
import Dashboard from './components/Dashboard';
import Portfolio from './components/Portfolio';
import Backtesting from './components/Backtesting';
import Strategies from './components/Strategies';
import DataManagement from './components/DataManagement';
import Signals from './components/Signals';
import Sidebar from './components/Sidebar';
import './App.css';

type View = 'dashboard' | 'portfolio' | 'backtesting' | 'strategies' | 'data' | 'signals';

function App() {
  const [currentView, setCurrentView] = useState<View>('dashboard');

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'portfolio':
        return <Portfolio />;
      case 'backtesting':
        return <Backtesting />;
      case 'strategies':
        return <Strategies />;
      case 'data':
        return <DataManagement />;
      case 'signals':
        return <Signals />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="app">
      <Sidebar currentView={currentView} onViewChange={setCurrentView} />
      <main className="main-content">
        {renderView()}
      </main>
    </div>
  );
}

export default App;
