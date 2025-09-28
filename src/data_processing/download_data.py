import yfinance as yf
import time
from datetime import date
from dateutil.relativedelta import relativedelta
import warnings
warnings.filterwarnings("ignore")

def download_equity_data(ticker, DATA_DIR, period):
    print(f"Downloading: {ticker} !")
    start = (date.today() - relativedelta(years=period)).strftime('%Y-%m-%d')
    end = (date.today()).strftime('%Y-%m-%d')
    try:
        df = yf.download(ticker, start=start, end=end)
        df.to_csv(f'{DATA_DIR}/{ticker}.csv')
        print(f"Successfully downloaded: {ticker} !")
    except Exception as e:
        print(f"Failed to download {ticker}: {e} !")
    time.sleep(1)