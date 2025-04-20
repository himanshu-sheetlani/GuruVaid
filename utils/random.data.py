import numpy as np
import pandas as pd

def generate_smartwatch_user():
    user = {
        "age": np.random.randint(18, 80),
        "weight_kg": np.random.randint(45, 120),
        "height_cm": np.random.randint(140, 200),
        "heart_rate": np.random.randint(55, 120),
        "steps_per_day": np.random.randint(1000, 15000),
        "sleep_hours": round(np.random.uniform(3.5, 9.5), 1),
        "calories_burned": np.random.randint(1300, 3500),
        "blood_oxygen": np.random.randint(88, 100),
        "respiratory_rate": np.random.randint(12, 25),
        "blood_pressure_systolic": np.random.randint(90, 180),
        "blood_pressure_diastolic": np.random.randint(60, 120),
        "cholesterol": np.random.randint(120, 300),
        "glucose_level": np.random.randint(70, 200),
        "smoker": np.random.choice(["yes", "no"]),
        "alcohol_use": np.random.choice(["yes", "no"]),
        "family_history": np.random.choice(["yes", "no"])
    }

    # Auto-calculate BMI
    user["bmi"] = round(user["weight_kg"] / ((user["height_cm"] / 100) ** 2), 1)

    return pd.DataFrame([user])

# Generate the user
smartwatch_user_df = generate_smartwatch_user()

# Display user data
print("📡 Smartwatch User Data:")
print(smartwatch_user_df.T)
