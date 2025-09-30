from src.backtester import backtest
from src.update_files import update_data
from src.utils import get_config

config = get_config.read_yaml()

choice = input("Do you want to update the data: ")
load_data = choice.lower() == "yes"

if load_data:
    update_data.update_equity_data()

choice = input("Do you want to backtest the strategy: ")
backtest_strategy = choice.lower() == "yes"

if backtest_strategy:
    print(f'Returns: {backtest.backtest_strategy('ABB.NS')}')