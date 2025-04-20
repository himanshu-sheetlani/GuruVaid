import pickle

with open('imputer(3).pkl', 'rb') as f:
    obj = pickle.load(f)

print(f"Type of object in imputer(3).pkl: {type(obj)}")
