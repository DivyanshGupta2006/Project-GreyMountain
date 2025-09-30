import numpy as np

def generate_signal(data):
    data['Signal'] = np.where(data['Close']>data['Open'], -1, 1)
    return data