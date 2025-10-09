import { LayoutDashboard, Wallet, TrendingUp, Settings, Database, Bell } from 'lucide-react';
import './Sidebar.css';

type View = 'dashboard' | 'portfolio' | 'backtesting' | 'strategies' | 'data' | 'signals';

interface SidebarProps {
  currentView: View;
  onViewChange: (view: View) => void;
}

const menuItems = [
  { id: 'dashboard' as View, label: 'Dashboard', icon: LayoutDashboard },
  { id: 'portfolio' as View, label: 'Portfolio', icon: Wallet },
  { id: 'backtesting' as View, label: 'Backtesting', icon: TrendingUp },
  { id: 'strategies' as View, label: 'Strategies', icon: Settings },
  { id: 'signals' as View, label: 'Signals', icon: Bell },
  { id: 'data' as View, label: 'Data Management', icon: Database },
];

export default function Sidebar({ currentView, onViewChange }: SidebarProps) {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="logo">
          <div className="logo-icon">Q</div>
          <span className="logo-text">QuantX</span>
        </div>
        <p className="tagline">Quantitative Trading Platform</p>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              className={`nav-item ${currentView === item.id ? 'active' : ''}`}
              onClick={() => onViewChange(item.id)}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <div className="user-info">
          <div className="avatar">DG</div>
          <div>
            <p className="user-name">Divyansh Gupta</p>
            <p className="user-role">Admin</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
