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

    tickers = config['data']['tickers_nifty_200']

    for ticker in tickers:
        # download_data.download_equity_data(ticker, raw_data_dir, period)
        process_data.process_equity_data(ticker, processed_data_dir)


    print(f"Finished updating equity data.")