# QuantX Frontend

Interactive production-level UI for the QuantX quantitative trading platform.

## Features

### Dashboard
- Portfolio performance overview with interactive charts
- Key metrics display (Total Value, Returns, Win Rate)
- Top performing stocks
- Recent trade signals
- Trading volume visualization

### Portfolio Management
- Real-time position tracking
- Profit/Loss calculations
- Sector allocation visualization
- Interactive position management

### Backtesting
- Configure and run strategy backtests
- Visual performance comparison with benchmark
- Detailed trade statistics
- Historical backtest results

### Strategy Configuration
- Manage multiple trading strategies
- Configure strategy parameters
- View strategy performance metrics
- Strategy code visualization

### Trade Signals
- Real-time trading signals
- Signal confidence levels
- Filter by signal type (Buy/Sell)
- Track executed signals

### Data Management
- Monitor data status across stock universe
- Update market data
- Configure data ranges
- Bulk data download

## Tech Stack

- **React** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Recharts** - Data visualization
- **Lucide React** - Icons

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── Dashboard.tsx       # Main dashboard view
│   │   ├── Portfolio.tsx       # Portfolio management
│   │   ├── Backtesting.tsx     # Backtesting interface
│   │   ├── Strategies.tsx      # Strategy configuration
│   │   ├── Signals.tsx         # Trade signals
│   │   ├── DataManagement.tsx  # Data management
│   │   └── Sidebar.tsx         # Navigation sidebar
│   ├── App.tsx                 # Main application component
│   ├── App.css                 # Application styles
│   └── index.css               # Global styles
├── public/
└── package.json
```

## Design Features

- Dark mode optimized interface
- Responsive design for all screen sizes
- Smooth transitions and hover effects
- Professional color scheme (blues, greens)
- Clean typography and spacing
- Interactive charts and visualizations

## Authors

- Divyansh Gupta
- Rishan Gobse
- Kartik Budhani
