import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { TrendingUp, TrendingDown, Plus, Minus } from 'lucide-react';
import './Portfolio.css';

const positions = [
  { ticker: 'RELIANCE.NS', name: 'Reliance Industries', quantity: 50, avgPrice: 2450, currentPrice: 2830, sector: 'Energy' },
  { ticker: 'TCS.NS', name: 'Tata Consultancy Services', quantity: 30, avgPrice: 3200, currentPrice: 3610, sector: 'IT' },
  { ticker: 'HDFCBANK.NS', name: 'HDFC Bank', quantity: 100, avgPrice: 1450, currentPrice: 1580, sector: 'Banking' },
  { ticker: 'INFY.NS', name: 'Infosys', quantity: 80, avgPrice: 1420, currentPrice: 1564, sector: 'IT' },
  { ticker: 'ICICIBANK.NS', name: 'ICICI Bank', quantity: 120, avgPrice: 920, currentPrice: 1050, sector: 'Banking' },
  { ticker: 'HINDUNILVR.NS', name: 'Hindustan Unilever', quantity: 40, avgPrice: 2380, currentPrice: 2520, sector: 'FMCG' },
];

const sectorData = [
  { name: 'IT', value: 35, color: '#3b82f6' },
  { name: 'Banking', value: 30, color: '#10b981' },
  { name: 'Energy', value: 20, color: '#f59e0b' },
  { name: 'FMCG', value: 15, color: '#8b5cf6' },
];

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'];

export default function Portfolio() {
  const calculatePnL = (position: typeof positions[0]) => {
    const invested = position.quantity * position.avgPrice;
    const current = position.quantity * position.currentPrice;
    const pnl = current - invested;
    const pnlPercent = ((pnl / invested) * 100).toFixed(2);
    return { pnl, pnlPercent };
  };

  const totalInvested = positions.reduce((sum, p) => sum + (p.quantity * p.avgPrice), 0);
  const totalCurrent = positions.reduce((sum, p) => sum + (p.quantity * p.currentPrice), 0);
  const totalPnL = totalCurrent - totalInvested;
  const totalPnLPercent = ((totalPnL / totalInvested) * 100).toFixed(2);

  return (
    <div className="portfolio">
      <div className="page-header">
        <div>
          <h1>Portfolio</h1>
          <p className="subtitle">Manage and track your positions</p>
        </div>
        <div className="header-actions">
          <button className="btn-secondary">
            <Minus size={16} />
            Close Position
          </button>
          <button>
            <Plus size={16} />
            Add Position
          </button>
        </div>
      </div>

      <div className="portfolio-summary">
        <div className="summary-card">
          <span className="summary-label">Total Invested</span>
          <span className="summary-value">₹{totalInvested.toLocaleString()}</span>
        </div>
        <div className="summary-card">
          <span className="summary-label">Current Value</span>
          <span className="summary-value">₹{totalCurrent.toLocaleString()}</span>
        </div>
        <div className="summary-card">
          <span className="summary-label">Total P&L</span>
          <div className="summary-pnl">
            <span className={`summary-value ${totalPnL >= 0 ? 'positive' : 'negative'}`}>
              ₹{Math.abs(totalPnL).toLocaleString()}
            </span>
            <span className={`pnl-badge ${totalPnL >= 0 ? 'positive' : 'negative'}`}>
              {totalPnL >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
              {totalPnL >= 0 ? '+' : '-'}{Math.abs(parseFloat(totalPnLPercent))}%
            </span>
          </div>
        </div>
      </div>

      <div className="portfolio-grid">
        <div className="positions-section">
          <h2>Active Positions</h2>
          <div className="positions-table">
            <div className="table-header">
              <div>Ticker</div>
              <div>Quantity</div>
              <div>Avg Price</div>
              <div>Current Price</div>
              <div>P&L</div>
              <div>Actions</div>
            </div>
            {positions.map((position) => {
              const { pnl, pnlPercent } = calculatePnL(position);
              const isProfit = pnl >= 0;

              return (
                <div key={position.ticker} className="table-row">
                  <div className="position-info">
                    <span className="position-ticker">{position.ticker}</span>
                    <span className="position-name">{position.name}</span>
                  </div>
                  <div className="position-quantity">{position.quantity}</div>
                  <div className="position-price">₹{position.avgPrice.toLocaleString()}</div>
                  <div className="position-price">₹{position.currentPrice.toLocaleString()}</div>
                  <div className="position-pnl">
                    <span className={isProfit ? 'positive' : 'negative'}>
                      ₹{Math.abs(pnl).toLocaleString()}
                    </span>
                    <span className={`pnl-percent ${isProfit ? 'positive' : 'negative'}`}>
                      {isProfit ? '+' : '-'}{Math.abs(parseFloat(pnlPercent))}%
                    </span>
                  </div>
                  <div className="position-actions">
                    <button className="btn-sm btn-secondary">View</button>
                    <button className="btn-sm btn-danger">Close</button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="allocation-section">
          <h2>Sector Allocation</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={sectorData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }: any) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {sectorData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1a2332',
                  border: '1px solid #2a3547',
                  borderRadius: '8px',
                  color: '#ffffff'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="allocation-legend">
            {sectorData.map((sector, idx) => (
              <div key={sector.name} className="legend-item">
                <div className="legend-color" style={{ backgroundColor: COLORS[idx] }}></div>
                <span className="legend-name">{sector.name}</span>
                <span className="legend-value">{sector.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
