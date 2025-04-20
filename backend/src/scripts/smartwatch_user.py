import numpy as np
import pandas as pd
import json

def generate_smartwatch_user():
    user = {
        "heart_rate": np.random.randint(55, 120),
        "steps_per_day": np.random.randint(1000, 15000),
        "sleep_hours": round(np.random.uniform(6, 9.5), 1),
        "calories_burned": np.random.randint(1300, 3500),
        "blood_oxygen": np.random.randint(88, 100),
        "respiratory_rate": np.random.randint(12, 25),
        "blood_pressure_systolic": np.random.randint(90, 180),
        "blood_pressure_diastolic": np.random.randint(60, 120),
        "cholesterol": np.random.randint(120, 300),
        "family_history": np.random.choice(["yes", "no"])
    }

    user["bmi"] = round(np.random.randint(45, 120) / ((np.random.randint(140, 200) / 100) ** 2), 1)
    return user

if __name__ == "__main__":
    data = generate_smartwatch_user()
    print(json.dumps(data))  # Output JSON string to be captured by Node
