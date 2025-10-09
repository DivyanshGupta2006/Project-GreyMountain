import { Bell, TrendingUp, TrendingDown, Clock, Target } from 'lucide-react';
import './Signals.css';

const signals = [
  {
    id: 1,
    ticker: 'RELIANCE.NS',
    name: 'Reliance Industries',
    type: 'BUY',
    price: 2830.50,
    confidence: 0.89,
    strategy: 'Momentum Strategy',
    timestamp: '2025-10-09 10:30:45',
    executed: false,
  },
  {
    id: 2,
    ticker: 'TCS.NS',
    name: 'Tata Consultancy Services',
    type: 'SELL',
    price: 3610.20,
    confidence: 0.76,
    strategy: 'Simple Strategy',
    timestamp: '2025-10-09 09:15:22',
    executed: true,
  },
  {
    id: 3,
    ticker: 'INFY.NS',
    name: 'Infosys',
    type: 'BUY',
    price: 1564.80,
    confidence: 0.92,
    strategy: 'Mean Reversion',
    timestamp: '2025-10-09 08:45:10',
    executed: false,
  },
  {
    id: 4,
    ticker: 'HDFCBANK.NS',
    name: 'HDFC Bank',
    type: 'SELL',
    price: 1580.00,
    confidence: 0.68,
    strategy: 'Momentum Strategy',
    timestamp: '2025-10-08 16:20:35',
    executed: true,
  },
  {
    id: 5,
    ticker: 'ICICIBANK.NS',
    name: 'ICICI Bank',
    type: 'BUY',
    price: 1050.45,
    confidence: 0.85,
    strategy: 'Simple Strategy',
    timestamp: '2025-10-08 14:10:50',
    executed: false,
  },
];

export default function Signals() {
  const activeSignals = signals.filter(s => !s.executed);
  const executedSignals = signals.filter(s => s.executed);

  return (
    <div className="signals">
      <div className="page-header">
        <div>
          <h1>Trade Signals</h1>
          <p className="subtitle">Real-time trading signals from your strategies</p>
        </div>
        <div className="header-actions">
          <button className="btn-secondary">
            <Bell size={16} />
            Configure Alerts
          </button>
          <button>Refresh</button>
        </div>
      </div>

      <div className="signals-stats">
        <div className="stat-card">
          <div className="stat-icon buy">
            <TrendingUp size={20} />
          </div>
          <div className="stat-info">
            <span className="stat-label">Buy Signals</span>
            <span className="stat-value">{activeSignals.filter(s => s.type === 'BUY').length}</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon sell">
            <TrendingDown size={20} />
          </div>
          <div className="stat-info">
            <span className="stat-label">Sell Signals</span>
            <span className="stat-value">{activeSignals.filter(s => s.type === 'SELL').length}</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon neutral">
            <Target size={20} />
          </div>
          <div className="stat-info">
            <span className="stat-label">Avg Confidence</span>
            <span className="stat-value">
              {Math.round(activeSignals.reduce((sum, s) => sum + s.confidence, 0) / activeSignals.length * 100)}%
            </span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon neutral">
            <Clock size={20} />
          </div>
          <div className="stat-info">
            <span className="stat-label">Executed Today</span>
            <span className="stat-value">{executedSignals.length}</span>
          </div>
        </div>
      </div>

      <div className="signals-section">
        <div className="section-header">
          <h2>Active Signals</h2>
          <div className="filter-tabs">
            <button className="filter-tab active">All</button>
            <button className="filter-tab">Buy</button>
            <button className="filter-tab">Sell</button>
          </div>
        </div>

        <div className="signals-grid">
          {activeSignals.map((signal) => (
            <div key={signal.id} className={`signal-card ${signal.type.toLowerCase()}`}>
              <div className="signal-badge-wrapper">
                <span className={`signal-type-badge ${signal.type.toLowerCase()}`}>
                  {signal.type === 'BUY' ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                  {signal.type}
                </span>
                <span className="confidence-badge">
                  {Math.round(signal.confidence * 100)}%
                </span>
              </div>

              <div className="signal-main">
                <h3>{signal.ticker}</h3>
                <p className="signal-name">{signal.name}</p>
              </div>

              <div className="signal-details">
                <div className="detail-row">
                  <span className="detail-label">Price</span>
                  <span className="detail-value">₹{signal.price.toLocaleString()}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Strategy</span>
                  <span className="detail-value">{signal.strategy}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Time</span>
                  <span className="detail-value">{signal.timestamp.split(' ')[1]}</span>
                </div>
              </div>

              <div className="signal-actions">
                <button className="btn-secondary">View Details</button>
                <button className={signal.type === 'BUY' ? 'btn-buy' : 'btn-sell'}>
                  Execute {signal.type}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="executed-section">
        <h2>Recently Executed</h2>
        <div className="executed-table">
          <div className="table-header">
            <div>Ticker</div>
            <div>Type</div>
            <div>Price</div>
            <div>Confidence</div>
            <div>Strategy</div>
            <div>Time</div>
          </div>
          {executedSignals.map((signal) => (
            <div key={signal.id} className="table-row">
              <div className="ticker-cell">
                <span className="ticker">{signal.ticker}</span>
                <span className="name">{signal.name}</span>
              </div>
              <div>
                <span className={`type-badge ${signal.type.toLowerCase()}`}>
                  {signal.type}
                </span>
              </div>
              <div className="price">₹{signal.price.toLocaleString()}</div>
              <div className="confidence">{Math.round(signal.confidence * 100)}%</div>
              <div className="strategy">{signal.strategy}</div>
              <div className="time">{signal.timestamp}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
