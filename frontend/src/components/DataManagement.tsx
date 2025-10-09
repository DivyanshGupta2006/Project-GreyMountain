import { useState } from 'react';
import { Database, Download, RefreshCw, Calendar, CheckCircle, AlertCircle } from 'lucide-react';
import './DataManagement.css';

const dataStatus = [
  { ticker: 'RELIANCE.NS', lastUpdate: '2025-10-09 09:30', records: 1250, status: 'current' },
  { ticker: 'TCS.NS', lastUpdate: '2025-10-09 09:30', records: 1250, status: 'current' },
  { ticker: 'HDFCBANK.NS', lastUpdate: '2025-10-09 09:30', records: 1250, status: 'current' },
  { ticker: 'INFY.NS', lastUpdate: '2025-10-08 16:00', records: 1248, status: 'outdated' },
  { ticker: 'ICICIBANK.NS', lastUpdate: '2025-10-09 09:30', records: 1250, status: 'current' },
];

const niftyLists = [
  { name: 'NIFTY 50', stocks: 50, enabled: true },
  { name: 'NIFTY 100', stocks: 100, enabled: false },
  { name: 'NIFTY 200', stocks: 200, enabled: false },
];

export default function DataManagement() {
  const [updating, setUpdating] = useState(false);
  const [selectedUniverse, setSelectedUniverse] = useState('NIFTY-50');

  const handleUpdate = () => {
    setUpdating(true);
    setTimeout(() => setUpdating(false), 3000);
  };

  return (
    <div className="data-management">
      <div className="page-header">
        <div>
          <h1>Data Management</h1>
          <p className="subtitle">Manage and update market data</p>
        </div>
        <div className="header-actions">
          <button className="btn-secondary">
            <Download size={16} />
            Export Data
          </button>
          <button onClick={handleUpdate} disabled={updating}>
            <RefreshCw size={16} className={updating ? 'spinning' : ''} />
            {updating ? 'Updating...' : 'Update All'}
          </button>
        </div>
      </div>

      <div className="data-overview">
        <div className="overview-card">
          <Database className="overview-icon" size={24} />
          <div className="overview-info">
            <span className="overview-label">Total Records</span>
            <span className="overview-value">6,250</span>
          </div>
        </div>

        <div className="overview-card">
          <Calendar className="overview-icon" size={24} />
          <div className="overview-info">
            <span className="overview-label">Last Full Update</span>
            <span className="overview-value">Today, 09:30</span>
          </div>
        </div>

        <div className="overview-card">
          <CheckCircle className="overview-icon success" size={24} />
          <div className="overview-info">
            <span className="overview-label">Current Data</span>
            <span className="overview-value">{dataStatus.filter(d => d.status === 'current').length}</span>
          </div>
        </div>

        <div className="overview-card">
          <AlertCircle className="overview-icon warning" size={24} />
          <div className="overview-info">
            <span className="overview-label">Outdated</span>
            <span className="overview-value">{dataStatus.filter(d => d.status === 'outdated').length}</span>
          </div>
        </div>
      </div>

      <div className="data-grid">
        <div className="universe-section">
          <h2>Stock Universe</h2>
          <p className="section-desc">Select which stock indices to track</p>

          <div className="universe-list">
            {niftyLists.map((list) => (
              <div key={list.name} className="universe-item">
                <div className="universe-info">
                  <h3>{list.name}</h3>
                  <span className="stock-count">{list.stocks} stocks</span>
                </div>
                <label className="toggle-switch">
                  <input type="checkbox" checked={list.enabled} onChange={() => {}} />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            ))}
          </div>

          <div className="date-range-section">
            <h3>Data Range Configuration</h3>
            <div className="date-inputs">
              <div className="date-field">
                <label htmlFor="startDate">Start Date</label>
                <input type="date" id="startDate" defaultValue="2015-07-01" />
              </div>
              <div className="date-field">
                <label htmlFor="endDate">End Date</label>
                <input type="date" id="endDate" defaultValue="2025-06-30" />
              </div>
            </div>
            <button className="btn-update">Update Configuration</button>
          </div>
        </div>

        <div className="data-status-section">
          <div className="status-header">
            <h2>Data Status</h2>
            <select
              value={selectedUniverse}
              onChange={(e) => setSelectedUniverse(e.target.value)}
              className="universe-select"
            >
              <option value="NIFTY-50">NIFTY 50</option>
              <option value="NIFTY-100">NIFTY 100</option>
              <option value="NIFTY-200">NIFTY 200</option>
            </select>
          </div>

          <div className="status-table">
            <div className="status-table-header">
              <div>Ticker</div>
              <div>Last Update</div>
              <div>Records</div>
              <div>Status</div>
              <div>Actions</div>
            </div>
            {dataStatus.map((item) => (
              <div key={item.ticker} className="status-table-row">
                <div className="ticker-name">{item.ticker}</div>
                <div className="update-time">{item.lastUpdate}</div>
                <div className="record-count">{item.records.toLocaleString()}</div>
                <div className="status-cell">
                  <span className={`status-badge ${item.status}`}>
                    {item.status === 'current' ? (
                      <>
                        <CheckCircle size={14} />
                        Current
                      </>
                    ) : (
                      <>
                        <AlertCircle size={14} />
                        Outdated
                      </>
                    )}
                  </span>
                </div>
                <div className="action-cell">
                  <button className="btn-icon" title="Update">
                    <RefreshCw size={16} />
                  </button>
                  <button className="btn-icon" title="Download">
                    <Download size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="download-section">
        <h2>Bulk Download</h2>
        <p className="section-desc">Download historical data for selected stocks</p>

        <div className="download-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="downloadUniverse">Stock Universe</label>
              <select id="downloadUniverse">
                <option value="NIFTY-50">NIFTY 50</option>
                <option value="NIFTY-100">NIFTY 100</option>
                <option value="NIFTY-200">NIFTY 200</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="timeframe">Timeframe</label>
              <select id="timeframe">
                <option value="1d">Daily</option>
                <option value="1h">Hourly</option>
                <option value="15m">15 Minutes</option>
              </select>
            </div>
          </div>

          <button className="btn-download">
            <Download size={16} />
            Download Data
          </button>
        </div>
      </div>
    </div>
  );
}
