import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Play, Download, Calendar, DollarSign } from 'lucide-react';
import './Backtesting.css';

const backtestResults = [
  { date: '2024-01', portfolio: 100000, benchmark: 100000 },
  { date: '2024-02', portfolio: 105000, benchmark: 102000 },
  { date: '2024-03', portfolio: 108000, benchmark: 103500 },
  { date: '2024-04', portfolio: 112000, benchmark: 105000 },
  { date: '2024-05', portfolio: 118000, benchmark: 107000 },
  { date: '2024-06', portfolio: 125000, benchmark: 109000 },
  { date: '2024-07', portfolio: 122000, benchmark: 108500 },
  { date: '2024-08', portfolio: 130000, benchmark: 111000 },
];

const previousBacktests = [
  { id: 1, name: 'NIFTY 50 Momentum Strategy', date: '2025-10-05', return: 28.5, sharpe: 1.85, status: 'completed' },
  { id: 2, name: 'Mean Reversion Strategy', date: '2025-10-03', return: 15.2, sharpe: 1.42, status: 'completed' },
  { id: 3, name: 'Sector Rotation Test', date: '2025-10-01', return: 22.8, sharpe: 1.67, status: 'completed' },
];

export default function Backtesting() {
  const [formData, setFormData] = useState({
    name: '',
    strategy: 'simple_strategy',
    tickers: 'NIFTY-50',
    startDate: '2024-01-01',
    endDate: '2025-08-31',
    initialCapital: '100000',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Running backtest with:', formData);
  };

  return (
    <div className="backtesting">
      <div className="page-header">
        <div>
          <h1>Backtesting</h1>
          <p className="subtitle">Test your strategies against historical data</p>
        </div>
      </div>

      <div className="backtest-grid">
        <div className="backtest-form-section">
          <h2>Configure Backtest</h2>
          <form onSubmit={handleSubmit} className="backtest-form">
            <div className="form-group">
              <label htmlFor="name">Backtest Name</label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., NIFTY 50 Strategy Test"
              />
            </div>

            <div className="form-group">
              <label htmlFor="strategy">Strategy</label>
              <select
                id="strategy"
                value={formData.strategy}
                onChange={(e) => setFormData({ ...formData, strategy: e.target.value })}
              >
                <option value="simple_strategy">Simple Strategy</option>
                <option value="momentum">Momentum Strategy</option>
                <option value="mean_reversion">Mean Reversion</option>
                <option value="sector_rotation">Sector Rotation</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="tickers">Stock Universe</label>
              <select
                id="tickers"
                value={formData.tickers}
                onChange={(e) => setFormData({ ...formData, tickers: e.target.value })}
              >
                <option value="NIFTY-50">NIFTY 50</option>
                <option value="NIFTY-100">NIFTY 100</option>
                <option value="NIFTY-200">NIFTY 200</option>
                <option value="custom">Custom Selection</option>
              </select>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="startDate">
                  <Calendar size={16} />
                  Start Date
                </label>
                <input
                  type="date"
                  id="startDate"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label htmlFor="endDate">
                  <Calendar size={16} />
                  End Date
                </label>
                <input
                  type="date"
                  id="endDate"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="initialCapital">
                <DollarSign size={16} />
                Initial Capital (₹)
              </label>
              <input
                type="number"
                id="initialCapital"
                value={formData.initialCapital}
                onChange={(e) => setFormData({ ...formData, initialCapital: e.target.value })}
              />
            </div>

            <button type="submit" className="btn-run">
              <Play size={18} />
              Run Backtest
            </button>
          </form>
        </div>

        <div className="backtest-results-section">
          <div className="results-header">
            <h2>Backtest Results</h2>
            <button className="btn-secondary">
              <Download size={16} />
              Export
            </button>
          </div>

          <div className="metrics-row">
            <div className="result-metric">
              <span className="metric-label">Total Return</span>
              <span className="metric-value positive">+30.0%</span>
            </div>
            <div className="result-metric">
              <span className="metric-label">Sharpe Ratio</span>
              <span className="metric-value">1.85</span>
            </div>
            <div className="result-metric">
              <span className="metric-label">Max Drawdown</span>
              <span className="metric-value negative">-8.5%</span>
            </div>
            <div className="result-metric">
              <span className="metric-label">Win Rate</span>
              <span className="metric-value">65.2%</span>
            </div>
          </div>

          <div className="chart-container">
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={backtestResults}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2a3547" />
                <XAxis dataKey="date" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1a2332',
                    border: '1px solid #2a3547',
                    borderRadius: '8px',
                    color: '#ffffff'
                  }}
                />
                <Legend />
                <Line type="monotone" dataKey="portfolio" stroke="#3b82f6" strokeWidth={2} name="Strategy" />
                <Line type="monotone" dataKey="benchmark" stroke="#9ca3af" strokeWidth={2} strokeDasharray="5 5" name="Benchmark" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="trades-summary">
            <h3>Trade Statistics</h3>
            <div className="trades-grid">
              <div className="trade-stat">
                <span className="stat-label">Total Trades</span>
                <span className="stat-value">45</span>
              </div>
              <div className="trade-stat">
                <span className="stat-label">Winning Trades</span>
                <span className="stat-value positive">28</span>
              </div>
              <div className="trade-stat">
                <span className="stat-label">Losing Trades</span>
                <span className="stat-value negative">17</span>
              </div>
              <div className="trade-stat">
                <span className="stat-label">Avg Win</span>
                <span className="stat-value">₹2,450</span>
              </div>
              <div className="trade-stat">
                <span className="stat-label">Avg Loss</span>
                <span className="stat-value">₹1,280</span>
              </div>
              <div className="trade-stat">
                <span className="stat-label">Profit Factor</span>
                <span className="stat-value">1.91</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="previous-backtests">
        <h2>Previous Backtests</h2>
        <div className="backtests-list">
          {previousBacktests.map((test) => (
            <div key={test.id} className="backtest-item">
              <div className="backtest-info">
                <h3>{test.name}</h3>
                <span className="backtest-date">{test.date}</span>
              </div>
              <div className="backtest-metrics">
                <div className="backtest-metric">
                  <span className="label">Return</span>
                  <span className="value positive">+{test.return}%</span>
                </div>
                <div className="backtest-metric">
                  <span className="label">Sharpe</span>
                  <span className="value">{test.sharpe}</span>
                </div>
              </div>
              <div className="backtest-actions">
                <button className="btn-sm btn-secondary">View</button>
                <button className="btn-sm btn-secondary">Clone</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
