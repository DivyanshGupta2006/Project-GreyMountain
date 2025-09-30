import numpy as np
from src.strategies import simple_strategy
from src.utils import read_files
def backtest_strategy(ticker):
    data = read_files.read_processed_data(ticker)
    data = simple_strategy.generate_signal(data)
    data['Position'] = data['Signal'].shift(1) * np.exp(data['Returns'])
    data.dropna(inplace = True)
    return np.exp(data['Position'].sum())