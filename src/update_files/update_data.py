from src.data_processing import download_data, process_data
from src.utils import get_config, get_absolute_path, check_dir

def update_equity_data():
    print(f"Updating equity data...")
    config = get_config.read_yaml()
    raw_data_dir = get_absolute_path.absolute(config['paths']['raw_data_directory'])
    processed_data_dir = get_absolute_path.absolute(config['paths']['processed_data_directory'])
    period = config['data']['max_backtesting_time']

    check_dir.check(raw_data_dir)
    check_dir.check(processed_data_dir)

    tickers = config['data']['tickers']

    for ticker in tickers:
        download_data.download_equity_data(ticker, raw_data_dir, period)
        process_data.process_equity_data(ticker, processed_data_dir)


    print(f"Finished updating equity data.")

from src.data_processing import download_data, preprocess_data, split_data, feature_engineer, link_data, merge_data

def update():
    a = input('Download Data? (y/n): ')
    if a.lower() == 'y':
        download_data.download()
    split_data.split()
    link_data.link('training-val')
    link_data.link('val-test')
    feature_engineer.create_features(type='training')
    feature_engineer.create_features(type='val')
    feature_engineer.create_features(type='test')
    preprocess_data.preprocess(type='training')
    preprocess_data.preprocess(type='val')
    preprocess_data.preprocess(type='test')
    merge_data.merge(type='training')
    merge_data.merge(type='val')
    merge_data.merge(type='test')