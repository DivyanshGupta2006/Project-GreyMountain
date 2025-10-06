import pandas as pd
from src.utils import get_config, get_absolute_path, read_files

config = get_config.read_yaml()

def link(data = 'val-test'):
    tickers = config['data'][config['data']['selected_tickers']]
    for symbol in tickers:
        if data == 'training-val':
            data1 = read_files.read_raw_training_data(symbol)
            data2 = read_files.read_raw_val_data(symbol)
            data1 = data1.tail(config['data']['backdate'])
            data2 = pd.concat([data1, data2])
            data_dir = get_absolute_path.absolute(config['paths']['raw_val_data_directory'])
            symbol = symbol.split('.')[0]
            path = f'{symbol}.csv'
            data2.to_csv(data_dir / path)
        else:
            data1 = read_files.read_raw_val_data(symbol)
            data2 = read_files.read_raw_test_data(symbol)
            data1 = data1.tail(config['data']['backdate'])
            data2 = pd.concat([data1, data2])
            data_dir = get_absolute_path.absolute(config['paths']['raw_test_data_directory'])
            symbol = symbol.split('.')[0]
            path = f'{symbol}.csv'
            data2.to_csv(data_dir / path)