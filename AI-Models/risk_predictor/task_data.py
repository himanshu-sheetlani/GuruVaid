def get_tasks_by_risk_level(risk_level):
    task_data = {
        0: {  # Low Risk
            "daily_tasks": [
                "🚶‍♂ Walk for 30 minutes",
                "💧 Drink at least 2L of water",
                "🥗 Eat 5 servings of fruits/vegetables"
            ],
            "weekly_tasks": [
                "🏃‍♂ Jog for 60 minutes total",
                "🧘 Attend a yoga/meditation session"
            ]
        },
        1: {  # Medium Risk
            "daily_tasks": [
                "🚶‍♂ Walk for 45 minutes",
                "💧 Drink 2.5L of water",
                "🥗 Eat a high-fiber diet",
                "🧘 Do 10 min meditation"
            ],
            "weekly_tasks": [
                "🏃‍♀ Do 90 minutes of cardio",
                "🩺 Monitor blood pressure twice"
            ]
        },
        2: {  # High Risk
            "daily_tasks": [
                "🚶 Walk for 60 minutes",
                "💊 Take medications (if prescribed)",
                "📖 Read health tips 10 min",
                "🥦 Follow strict low-sodium diet"
            ],
            "weekly_tasks": [
                "👨‍⚕ Consult doctor or health coach",
                "📝 Maintain a health diary"
            ]
        }
    }

    return task_data.get(risk_level, {
        "daily_tasks": ["⚠ No recommendations - Unknown risk level"],
        "weekly_tasks": ["❓ Please check input"]
    })
