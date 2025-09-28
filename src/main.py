from src.data_processing import update_data
from src.utils import get_config

config = get_config.read_yaml()

choice = input("Do you want to update the data: ")
load_data = choice.lower() == "yes"

if load_data:
    update_data.update_equity_data()