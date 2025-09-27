import os
import yfinance as yf
import time
from datetime import date
from dateutil.relativedelta import relativedelta
import warnings
warnings.filterwarnings("ignore")
from src.utils import get_config, get_absolute_path

config = get_config.read_yaml()
DATA_DIR = get_absolute_path.absolute(config['paths']['raw_data_directory'])

def update_equity_data(ticker):
    if not os.path.exists(DATA_DIR):
        print(f"Creating directory: {DATA_DIR}")
        os.makedirs(DATA_DIR)
    else:
        print(f"Directory already exists: {DATA_DIR}")
    start = (date.today() - relativedelta(years=config['data']['max_backtesting_time'])).strftime('%Y-%m-%d')
    end = (date.today()).strftime('%Y-%m-%d')
    print(f"Updating: {ticker} !")
    try:
        df = yf.download(ticker, start=start, end=end)
        df.to_csv(f'{DATA_DIR}/{ticker}.csv')
        print(f"Successfully updated: {ticker} !")
    except Exception as e:
        print(f"Failed to update {ticker}: {e} !")
    time.sleep(1)