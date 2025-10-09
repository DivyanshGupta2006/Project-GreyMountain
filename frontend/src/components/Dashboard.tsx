import { TrendingUp, TrendingDown, Activity, DollarSign } from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './Dashboard.css';

const portfolioData = [
  { date: 'Jan', value: 100000 },
  { date: 'Feb', value: 105000 },
  { date: 'Mar', value: 102000 },
  { date: 'Apr', value: 110000 },
  { date: 'May', value: 115000 },
  { date: 'Jun', value: 120000 },
  { date: 'Jul', value: 118000 },
  { date: 'Aug', value: 125000 },
];

const topPerformers = [
  { ticker: 'RELIANCE.NS', return: 15.4, value: 45000 },
  { ticker: 'TCS.NS', return: 12.8, value: 38000 },
  { ticker: 'INFY.NS', return: 10.2, value: 32000 },
  { ticker: 'HDFCBANK.NS', return: 8.7, value: 28000 },
];

const recentSignals = [
  { ticker: 'BAJFINANCE.NS', type: 'BUY', confidence: 0.85, price: 6542.30, time: '2 hours ago' },
  { ticker: 'MARUTI.NS', type: 'SELL', confidence: 0.78, price: 12345.50, time: '4 hours ago' },
  { ticker: 'TITAN.NS', type: 'BUY', confidence: 0.92, price: 3245.80, time: '5 hours ago' },
];

const volumeData = [
  { day: 'Mon', volume: 1200 },
  { day: 'Tue', volume: 1800 },
  { day: 'Wed', volume: 1500 },
  { day: 'Thu', volume: 2100 },
  { day: 'Fri', volume: 1900 },
];

export default function Dashboard() {
  return (
    <div className="dashboard">
      <div className="page-header">
        <div>
          <h1>Dashboard</h1>
          <p className="subtitle">Overview of your trading performance</p>
        </div>
        <div className="header-actions">
          <button className="btn-secondary">Export Report</button>
          <button>Refresh Data</button>
        </div>
      </div>

      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-header">
            <span className="metric-label">Total Portfolio Value</span>
            <DollarSign className="metric-icon" size={20} />
          </div>
          <div className="metric-value">₹125,000</div>
          <div className="metric-change positive">
            <TrendingUp size={16} />
            <span>+25.0% from start</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <span className="metric-label">Total Return</span>
            <TrendingUp className="metric-icon" size={20} />
          </div>
          <div className="metric-value">+25.0%</div>
          <div className="metric-change positive">
            <TrendingUp size={16} />
            <span>+3.2% this month</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <span className="metric-label">Active Positions</span>
            <Activity className="metric-icon" size={20} />
          </div>
          <div className="metric-value">12</div>
          <div className="metric-change neutral">
            <span>4 NIFTY 50 stocks</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <span className="metric-label">Win Rate</span>
            <Activity className="metric-icon" size={20} />
          </div>
          <div className="metric-value">68.5%</div>
          <div className="metric-change positive">
            <TrendingUp size={16} />
            <span>+2.5% vs avg</span>
          </div>
        </div>
      </div>

      <div className="charts-grid">
        <div className="chart-card large">
          <div className="chart-header">
            <h3>Portfolio Performance</h3>
            <div className="chart-controls">
              <button className="btn-tab active">1M</button>
              <button className="btn-tab">3M</button>
              <button className="btn-tab">6M</button>
              <button className="btn-tab">1Y</button>
              <button className="btn-tab">ALL</button>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={portfolioData}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
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
              <Area type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorValue)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <div className="chart-header">
            <h3>Trading Volume</h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={volumeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a3547" />
              <XAxis dataKey="day" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1a2332',
                  border: '1px solid #2a3547',
                  borderRadius: '8px',
                  color: '#ffffff'
                }}
              />
              <Bar dataKey="volume" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="info-grid">
        <div className="info-card">
          <h3>Top Performers</h3>
          <div className="performers-list">
            {topPerformers.map((stock) => (
              <div key={stock.ticker} className="performer-item">
                <div className="performer-info">
                  <span className="performer-ticker">{stock.ticker}</span>
                  <span className="performer-value">₹{stock.value.toLocaleString()}</span>
                </div>
                <div className={`performer-return ${stock.return > 0 ? 'positive' : 'negative'}`}>
                  {stock.return > 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                  <span>{stock.return > 0 ? '+' : ''}{stock.return}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="info-card">
          <h3>Recent Signals</h3>
          <div className="signals-list">
            {recentSignals.map((signal, idx) => (
              <div key={idx} className="signal-item">
                <div className="signal-header">
                  <span className="signal-ticker">{signal.ticker}</span>
                  <span className={`signal-badge ${signal.type.toLowerCase()}`}>{signal.type}</span>
                </div>
                <div className="signal-details">
                  <span className="signal-price">₹{signal.price.toLocaleString()}</span>
                  <span className="signal-confidence">{Math.round(signal.confidence * 100)}% confidence</span>
                </div>
                <span className="signal-time">{signal.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
