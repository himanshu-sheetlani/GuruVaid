from flask import Flask, request, jsonify
import pickle
import joblib
import numpy as np
from task_data import get_tasks_by_risk_level  # External task logic
from flask_cors import CORS  # Import CORS

app = Flask(__name__)

# Enable CORS for all routes
CORS(app)

# Load the risk model
try:
    risk_model = joblib.load('risk_predictor(3).pkl')
    print(f"Loaded risk model type: {type(risk_model)}")  # Debugging line to check type
except Exception as e:
    print(f"Error loading risk model: {str(e)}")

# Load the imputer
try:
    with open('imputer(3).pkl', 'rb') as f:
        imputer = pickle.load(f)
    print(f"Loaded imputer type: {type(imputer)}")  # Debugging line to check type
except Exception as e:
    print(f"Error loading imputer: {str(e)}")

@app.route("/predict-risk", methods=["POST"])
def predict_risk():
    try:
        data = request.get_json()

        # Extract features from input data
        features = np.array([[ 
            data['age'],
            data['bmi'],
            data['heart_rate'],
            data['steps_per_day'],
            data['sleep_hours'],
            data['calories_burned'],
            data['blood_oxygen'],
            data['respiratory_rate']
        ]])

        # Debugging: Check the shape of features
        print(f"Features shape for risk prediction: {features.shape}")

        # Check if the imputer is valid and apply transformation if possible
        if hasattr(imputer, 'transform'):
            features = imputer.transform(features)
        else:
            # If the imputer is not valid, apply a manual fallback solution
            print("Imputer does not have a 'transform' method. Falling back to manual imputation.")
            # Handle missing data by filling with mean (manual imputation)
            features = np.nan_to_num(features, nan=np.nanmean(features, axis=0))

        # Check if the model is valid and predict
        if hasattr(risk_model, 'predict'):
            risk_level = int(risk_model.predict(features)[0])
        else:
            raise Exception("Risk model object does not have a 'predict' method.")

        return jsonify({
            "risk_level": risk_level
        })

    except Exception as e:
        return jsonify({
            "error": "Risk prediction failed",
            "details": str(e)
        }), 500


@app.route("/get-tasks", methods=["POST"])
def get_tasks():
    try:
        data = request.get_json()

        # Extract features from input data
        features = np.array([[ 
            data['age'],
            data['bmi'],
            data['heart_rate'],
            data['steps_per_day'],
            data['sleep_hours'],
            data['calories_burned'],
            data['blood_oxygen'],
            data['respiratory_rate']
        ]])

        # Handle missing values using imputer or manually if imputer fails
        if hasattr(imputer, 'transform'):
            features = imputer.transform(features)
        else:
            # Fallback to manual imputation if imputer fails
            print("Imputer does not have a 'transform' method. Falling back to manual imputation.")
            features = np.nan_to_num(features, nan=np.nanmean(features, axis=0))

        # Predict the risk level using the model
        if hasattr(risk_model, 'predict'):
            risk_level = int(risk_model.predict(features)[0])
        else:
            raise Exception("Risk model object does not have a 'predict' method.")

        # Get tasks based on the risk level
        tasks = get_tasks_by_risk_level(risk_level)

        return jsonify({
            "risk_level": risk_level,
            "recommended_tasks": tasks
        })

    except Exception as e:
        return jsonify({"error": "Task suggestion failed", "details": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)
