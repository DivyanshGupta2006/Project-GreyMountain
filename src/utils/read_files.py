import pandas as pd
from src.utils import get_config, get_absolute_path

config = get_config.read_yaml()

def read_raw_equity_data(ticker):
    data_dir = get_absolute_path.absolute(config['paths']['raw_data_directory'])
    print(f"Reading Raw Equity data: {ticker} !")
    try:
        data = pd.read_csv(f'{data_dir}/{ticker}.csv', header=[0, 1], index_col=[0], parse_dates=[0])
        print(f"Successfully read: {ticker} !")
        return data
    except Exception as e:
        print(f"Failed to read {ticker}: {e} !")
        return None

def read_processed_data(ticker):
    data_dir = get_absolute_path.absolute(config['paths']['processed_data_directory'])
    print(f"Reading Processed Equity data: {ticker} !")
    try:
        data = pd.read_csv(f'{data_dir}/{ticker}.csv', index_col=[0], parse_dates=[0])
        print(f"Successfully read: {ticker} !")
        return data
    except Exception as e:
        print(f"Failed to read {ticker}: {e} !")
        return None