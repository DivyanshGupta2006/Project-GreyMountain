import yfinance as yf
import time
from datetime import datetime
from dateutil.relativedelta import relativedelta
import numpy as np
import warnings
warnings.filterwarnings("ignore")

from src.update_files import update_date
from src.utils import check_dir, get_absolute_path, get_config, read_files

update_date.update()
config = get_config.read_yaml()

def download_equity_data():
    print(f"Downloading the data...")
    tickers = config['data'][config['data']['selected_tickers']]
    data_dir = get_absolute_path.absolute(config['paths']['raw_data_directory'])
    check_dir.check(data_dir)
    start = (datetime.strptime(config['data']['begin_train_date'], '%Y-%m-%d') - relativedelta(days=config['data']['backdate'])).strftime('%Y-%m-%d')
    end = config['data']['end_date']
    for ticker in tickers:
        ticker = ticker.split('.')[0]
        print(ticker + '...')
        try:
            data = yf.download(f'{ticker}.NS', start=start, end=end, interval=config['data']['timeframe'])
            data.columns = data.columns.to_flat_index()
            for datafield in data.columns:
                data.rename(columns={datafield: datafield[0]}, inplace=True)
            data['Returns'] = np.log(data.Close.div(data.Close.shift(1)))
            data.dropna(inplace=True)
            data['B&H Returns'] = data['Returns'].cumsum().apply(np.exp)
            data['B&H Max'] = data['B&H Returns'].cummax()
            data['B&H Drawdown'] = data['B&H Max'] - data['B&H Returns']
            data['B&H Drawdown %'] = (data['B&H Drawdown'] / data['B&H Max']) * 100
            path = f'{ticker}.csv'
            data.to_csv(data_dir / path)
            print(f"Successfully downloaded: {ticker} !")
        except Exception as e:
            print(f"Failed to download {ticker}: {e} !")
        time.sleep(1.5)