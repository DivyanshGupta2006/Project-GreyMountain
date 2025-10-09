# Project - QuantX

A comprehensive quantitative trading platform for Indian equity markets (NIFTY 50/100/200).

## Overview

QuantX is a full-featured trading system with both backend Python infrastructure for data processing, strategy development, and backtesting, plus a modern interactive web interface for monitoring and management.

## Project Structure

### Backend (Python)
- **src/** - Core Python modules
  - **data_processing/** - Data download, preprocessing, and feature engineering
  - **strategies/** - Trading strategy implementations
  - **backtester/** - Backtesting engine
  - **interface/** - API interface
  - **utils/** - Utility functions

- **notebooks/** - Jupyter notebooks for analysis and exploration
- **data/** - Market data storage (raw, processed, featured)
- **models/** - Trained models and preprocessors
- **config.yaml** - Configuration file for all parameters

### Frontend (React/TypeScript)
- **frontend/** - Production-level interactive web UI
  - Dashboard with portfolio performance
  - Portfolio management
  - Backtesting interface
  - Strategy configuration
  - Trade signals
  - Data management

## Features

### Data Management
- Automated download of NIFTY 50/100/200 stock data via yfinance
- Data preprocessing and feature engineering
- Configurable date ranges and timeframes
- Support for multiple stock universes

### Trading Strategies
- Simple strategy (open/close based signals)
- Momentum strategy
- Mean reversion
- Custom strategy support

### Backtesting
- Historical strategy testing
- Performance metrics (returns, Sharpe ratio, max drawdown)
- Trade analysis and statistics
- Visual performance comparison

### Portfolio Management
- Real-time position tracking
- P&L calculations
- Sector allocation
- Risk management

### Web Interface
- Modern dark-themed UI
- Interactive charts and visualizations
- Responsive design for all devices
- Real-time updates

## Getting Started

### Prerequisites
- Python 3.8+
- Node.js 18+
- npm or yarn

### Backend Setup

1. Install Python dependencies:
```bash
pip install -r requirements.txt
```

2. Configure settings in `config.yaml`

3. Run the main script:
```bash
python launch.py
```

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

## Configuration

Edit `config.yaml` to configure:
- Stock universes (NIFTY 50/100/200)
- Date ranges for training/validation/testing
- Strategy parameters
- Data paths

## Authors

- Divyansh Gupta
- Rishan Gobse
- Kartik Budhani