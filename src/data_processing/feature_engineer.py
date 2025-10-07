import numpy as np
import pandas as pd
import talib as ta
from src.utils import get_config, get_absolute_path, read_files, check_dir

config = get_config.read_yaml()

def create_features(type='training'):
    print('Creating features...')
    data_dir = get_absolute_path.absolute(config['paths'][f'featured_{type}_data_directory'])
    check_dir.check(data_dir)
    tickers = config['data'][config['data']['selected_tickers']]
    for ticker in tickers:
        data = pd.DataFrame()
        if type == 'training':
            data = read_files.read_raw_training_data(ticker)
        elif type == 'val':
            data = read_files.read_raw_val_data(ticker)
        elif type == 'test':
            data = read_files.read_raw_test_data(ticker)
        data['returns'] = np.log(data.close.div(data.close.shift(1)))
        data['rsi'] = ta.RSI(data['close'], timeperiod=14)
        data['sma-50'] = ta.SMA(data['close'], timeperiod=50)
        data['sma-100'] = ta.SMA(data['close'], timeperiod=100)
        data['sma-200'] = ta.SMA(data['close'], timeperiod=200)
        data['ema-50'] = ta.EMA(data['close'], timeperiod=50)
        data['ema-100'] = ta.EMA(data['close'], timeperiod=100)
        data['ema-200'] = ta.EMA(data['close'], timeperiod=200)
        data['atr'] = ta.ATR(data['high'], data['low'], data['close'], timeperiod=14)
        data['adx'] = ta.ADX(data['high'], data['low'], data['close'], timeperiod=14)
        ticker = ticker.split('.')[0]
        path = f'{ticker}.csv'
        data.to_csv(data_dir / path)