from src.data_processing import update_data
from src.utils import get_config

config = get_config.read_yaml()

TICKERS = config['data']['tickers_nifty_50']

choice = input("Do you want to update / refresh the data: ")

load_data = choice.lower() == "yes"

if load_data:
    for stock in TICKERS:
        update_data.update_equity_data(stock)