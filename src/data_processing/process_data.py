import numpy as np
from src.utils import read_files

def extract_stock(df, ticker):
    cols = [col for col in df.columns if col[1] == ticker]
    ret_df = df[cols]
    for datafield in ret_df.columns:
        ret_df.rename(columns = {datafield: datafield[0]}, inplace = True)
    return ret_df

def process_equity_data(ticker, processed_data_dir):
    print(f"Processing: {ticker} !")
    try:
        data = read_files.read_raw_equity_data(ticker)
        data.columns = data.columns.to_flat_index()
        data = extract_stock(data, ticker)
        data['Returns'] = np.log(data.Close.div(data.Close.shift(1)))
        data.dropna(inplace = True)
        data['B&H Returns'] = data['Returns'].cumsum().apply(np.exp)
        data['B&H Max'] = data['B&H Returns'].cummax()
        data['B&H Drawdown'] = data['B&H Max'] - data['B&H Returns']
        data['B&H Drawdown %'] = (data['B&H Drawdown'] / data['B&H Max']) * 100
        data.to_csv(f'{processed_data_dir}/{ticker}.csv')
        print(f"Successfully processed: {ticker} !")
    except Exception as e:
        print(f"Failed to process {ticker}: {e} !")
        return None