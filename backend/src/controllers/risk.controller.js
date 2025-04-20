
import dotenv from "dotenv";
dotenv.config();





// Initialize Gemini

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const predictMentalHealthScore = async (req, res) => {
  try {
    const user = req.user;
    const manualInput = user.manualInput;
    const smartWatchInput = user.smartWatchInput;

    const prompt = `
You are an expert psychologist. Based on the following health and lifestyle data, return a **single number** from 0 to 100 representing the user's mental health score. Do not return explanation — just the number.

Manual Input:
- Age: ${manualInput.age}
- Height: ${manualInput.height} cm
- Weight: ${manualInput.weight} kg
- Body Fat: ${manualInput.bodyFat}%
- Smoker: ${manualInput.isSmoker}
- Drinker: ${manualInput.isDrinker}
- Diabetic: ${manualInput.isDiabetic}

Smart Watch Input:
- Heart Rate: ${smartWatchInput.heartrate} bpm
- Sleep Hours: ${smartWatchInput.sleephour}
- Steps: ${smartWatchInput.steps}
- Calories Burned: ${smartWatchInput.caloriesburned}
- Blood Oxygen: ${smartWatchInput.bloodoxygen}%
- Respiratory Rate: ${smartWatchInput.respiratoryrate}
- Blood Pressure: ${smartWatchInput.blood_pressure_systolic}/${smartWatchInput.blood_pressure_diastolic}
    `;

    // Use free-tier model like "gemini-1.5-flash"
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(prompt);
    const text = result.response.text().trim();

    const score = parseInt(text.match(/\d+/)?.[0], 10);

    if (isNaN(score)) {
      return res.status(400).json({ error: "Invalid score from Gemini response." });
    }

    res.status(200).json({ mental_health_score: score });
  } catch (error) {
    console.error("Gemini Mental Health Prediction Error:", error);
    res.status(500).json({ error: "Failed to get mental health score." });
  }
};


