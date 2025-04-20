import pickle
import numpy as np
import pandas as pd
from sklearn.datasets import load_iris
from sklearn.tree import DecisionTreeClassifier
from sklearn.impute import SimpleImputer
from sklearn.ensemble import RandomForestClassifier

def train_and_save_models():
    # Train risk predictor model on iris dataset (example)
    iris = load_iris()
    X_risk, y_risk = iris.data, iris.target

    risk_model = DecisionTreeClassifier()
    risk_model.fit(X_risk, y_risk)

    with open("risk_predictor_v2.pkl", "wb") as f:
        pickle.dump(risk_model, f)

    print("Risk predictor model trained and saved as risk_predictor.pkl")

    # Create example data for disease model training
    # For demonstration, generate dummy data with 4 features and 5 classes
    np.random.seed(42)
    X_disease = np.random.rand(100, 4)
    y_disease = np.random.randint(0, 5, 100)

    # Train disease model
    disease_model = RandomForestClassifier()
    disease_model.fit(X_disease, y_disease)

    with open("diseasemodel.pkl", "wb") as f:
        pickle.dump(disease_model, f)

    print("Disease model trained and saved as diseasemodel.pkl")

    # Create and fit imputer on dummy data (using X_disease)
    imputer = SimpleImputer(strategy='mean')
    imputer.fit(X_disease)

    with open("imputer.pkl", "wb") as f:
        pickle.dump(imputer, f)

    print("Imputer trained and saved as imputer.pkl")

if __name__ == "__main__":
    train_and_save_models()
