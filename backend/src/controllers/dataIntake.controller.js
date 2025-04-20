import { User } from "../models/user.model.js"; // Make sure this path is correct based on your structure
import { spawn } from "child_process";
import path from "path";

import axios from "axios"; // Import axios for making HTTP requests

export const uploadHealthData = async (req, res) => {
  try {
    const { age, height, weight, bodyFat, isSmoker, isDrinker, isDiabetic } =
      req.body;

    // Check for missing fields in manual input
    if (
      age === undefined ||
      height === undefined ||
      weight === undefined ||
      bodyFat === undefined ||
      isSmoker === undefined ||
      isDrinker === undefined ||
      isDiabetic === undefined
    ) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const userId = req.user?._id;
    if (!userId) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized: User not found" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Fetch the smartwatch data from the given URL
    const response = await axios.get(
      "http://localhost:4000/api/v1/data/smartwatch-user"
    );

    if (!response.data.success) {
      return res
        .status(400)
        .json({ success: false, message: "Failed to fetch smartwatch data" });
    }

    // Save the fetched smartwatch data into the user model
    const smartwatchData = response.data.data; // Assuming the data is in the `data` field of the response

    // Update manual input data
    user.manualInput = {
      age: Number(age),
      height: Number(height),
      weight: Number(weight),
      bodyFat: Number(bodyFat),
      isSmoker: Boolean(isSmoker),
      isDrinker: Boolean(isDrinker),
      isDiabetic: Boolean(isDiabetic),
    };

    // Save smartwatch data into the `smartWatchInput` field
    user.smartWatchInput = {
      heartrate: smartwatchData.heart_rate,
      steps: smartwatchData.steps_per_day,
      sleephour: smartwatchData.sleep_hours,
      caloriesburned: smartwatchData.calories_burned,
      bloodoxygen: smartwatchData.blood_oxygen,
      respiratoryrate: smartwatchData.respiratory_rate,
      blood_pressure_systolic: smartwatchData.blood_pressure_systolic,
      blood_pressure_diastolic: smartwatchData.blood_pressure_diastolic,
    };

    // Optional: Store additional fields like cholesterol and bmi
    user.cholesterol = smartwatchData.cholesterol;
    user.familyHistory = smartwatchData.family_history;
    user.bmi = smartwatchData.bmi;

    // Mark user as having updated health information
    user.isUserInfoAvailable = true;

    // Save the updated user
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Health information updated successfully",
      manualInput: user.manualInput,
      smartWatchInput: user.smartWatchInput,
    });
  } catch (error) {
    console.error("Error in uploadHealthData:", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const getSmartWatchData = async (req, res) => {
  try {
    const scriptPath = path.resolve("src/scripts/smartwatch_user.py");

    const python = spawn("python", [scriptPath]);

    let data = "";
    let errorData = "";

    python.stdout.on("data", (chunk) => {
      data += chunk.toString();
    });

    python.stderr.on("data", (chunk) => {
      errorData += chunk.toString();
    });

    python.on("close", (code) => {
      if (code !== 0) {
        console.error("❌ Python error output:", errorData);
        return res.status(500).json({
          success: false,
          message: "Python script failed",
          error: errorData,
        });
      }

      try {
        const parsed = JSON.parse(data.trim());
        return res.status(200).json({
          success: true,
          data: parsed,
        });
      } catch (err) {
        console.error("❌ Failed to parse JSON from Python:", data);
        return res.status(500).json({
          success: false,
          message: "Invalid JSON output from Python",
        });
      }
    });
  } catch (error) {
    console.error("💥 Node error in controller:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
