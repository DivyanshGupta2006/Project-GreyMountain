import { useState } from 'react';
import { Plus, Settings, Play, Pause, TrendingUp } from 'lucide-react';
import './Strategies.css';

const strategies = [
  {
    id: 1,
    name: 'Simple Strategy',
    description: 'Basic signal generation based on open/close prices',
    isActive: true,
    performance: { return: 25.5, winRate: 68.2, trades: 156 },
    parameters: { threshold: 0.02, holding_period: 5 },
  },
  {
    id: 2,
    name: 'Momentum Strategy',
    description: 'Identifies and follows strong price momentum',
    isActive: false,
    performance: { return: 18.3, winRate: 62.5, trades: 98 },
    parameters: { lookback: 20, momentum_threshold: 0.05 },
  },
  {
    id: 3,
    name: 'Mean Reversion',
    description: 'Trades on price deviations from moving average',
    isActive: false,
    performance: { return: 15.7, winRate: 71.3, trades: 203 },
    parameters: { ma_period: 50, std_dev: 2 },
  },
];

export default function Strategies() {
  const [selectedStrategy, setSelectedStrategy] = useState(strategies[0]);
  const [showNewStrategy, setShowNewStrategy] = useState(false);

  return (
    <div className="strategies">
      <div className="page-header">
        <div>
          <h1>Strategies</h1>
          <p className="subtitle">Configure and manage your trading strategies</p>
        </div>
        <button onClick={() => setShowNewStrategy(true)}>
          <Plus size={16} />
          New Strategy
        </button>
      </div>

      <div className="strategies-grid">
        <div className="strategies-list-section">
          <h2>Your Strategies</h2>
          <div className="strategies-list">
            {strategies.map((strategy) => (
              <div
                key={strategy.id}
                className={`strategy-card ${selectedStrategy.id === strategy.id ? 'active' : ''}`}
                onClick={() => setSelectedStrategy(strategy)}
              >
                <div className="strategy-header">
                  <div>
                    <h3>{strategy.name}</h3>
                    <p className="strategy-description">{strategy.description}</p>
                  </div>
                  <button
                    className={`status-toggle ${strategy.isActive ? 'active' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    {strategy.isActive ? <Pause size={16} /> : <Play size={16} />}
                  </button>
                </div>
                <div className="strategy-metrics">
                  <div className="metric">
                    <span className="metric-label">Return</span>
                    <span className="metric-value positive">+{strategy.performance.return}%</span>
                  </div>
                  <div className="metric">
                    <span className="metric-label">Win Rate</span>
                    <span className="metric-value">{strategy.performance.winRate}%</span>
                  </div>
                  <div className="metric">
                    <span className="metric-label">Trades</span>
                    <span className="metric-value">{strategy.performance.trades}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="strategy-details-section">
          <div className="details-header">
            <h2>{selectedStrategy.name}</h2>
            <div className="details-actions">
              <button className="btn-secondary">
                <Settings size={16} />
                Configure
              </button>
              <button>
                <TrendingUp size={16} />
                Backtest
              </button>
            </div>
          </div>

          <div className="performance-overview">
            <h3>Performance Overview</h3>
            <div className="performance-grid">
              <div className="performance-card">
                <span className="perf-label">Total Return</span>
                <span className="perf-value positive">+{selectedStrategy.performance.return}%</span>
              </div>
              <div className="performance-card">
                <span className="perf-label">Win Rate</span>
                <span className="perf-value">{selectedStrategy.performance.winRate}%</span>
              </div>
              <div className="performance-card">
                <span className="perf-label">Total Trades</span>
                <span className="perf-value">{selectedStrategy.performance.trades}</span>
              </div>
              <div className="performance-card">
                <span className="perf-label">Status</span>
                <span className={`status-badge ${selectedStrategy.isActive ? 'active' : 'inactive'}`}>
                  {selectedStrategy.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>
          </div>

          <div className="parameters-section">
            <h3>Strategy Parameters</h3>
            <div className="parameters-form">
              {Object.entries(selectedStrategy.parameters).map(([key, value]) => (
                <div key={key} className="parameter-field">
                  <label htmlFor={key}>{key.replace(/_/g, ' ').toUpperCase()}</label>
                  <input
                    type="number"
                    id={key}
                    defaultValue={value as number}
                    step={key.includes('threshold') ? 0.01 : 1}
                  />
                </div>
              ))}
              <button className="btn-save">Save Parameters</button>
            </div>
          </div>

          <div className="strategy-code">
            <h3>Strategy Logic</h3>
            <pre className="code-block">
              <code>{`def generate_signal(data):
    """
    ${selectedStrategy.description}
    """
    # Calculate signals based on price action
    data['Signal'] = np.where(
        data['Close'] > data['Open'],
        -1,  # Sell signal
        1    # Buy signal
    )
    return data`}</code>
            </pre>
          </div>
        </div>
      </div>

      {showNewStrategy && (
        <div className="modal-overlay" onClick={() => setShowNewStrategy(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Create New Strategy</h2>
            <form className="strategy-form">
              <div className="form-group">
                <label htmlFor="strategyName">Strategy Name</label>
                <input type="text" id="strategyName" placeholder="e.g., RSI Divergence" />
              </div>
              <div className="form-group">
                <label htmlFor="strategyDesc">Description</label>
                <textarea id="strategyDesc" rows={3} placeholder="Describe your strategy..." />
              </div>
              <div className="form-group">
                <label htmlFor="strategyType">Strategy Type</label>
                <select id="strategyType">
                  <option value="momentum">Momentum</option>
                  <option value="mean_reversion">Mean Reversion</option>
                  <option value="breakout">Breakout</option>
                  <option value="custom">Custom</option>
                </select>
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={() => setShowNewStrategy(false)}>
                  Cancel
                </button>
                <button type="submit">Create Strategy</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
