import { create } from "zustand";
import { axiosInstance, axiosPredict } from "../utils/axios";
import { AuthStore } from "../stores/useAuthStore.js";

export const usePredictStore = create((set) => ({
  risk_level: null,
  tasks: [],
  mental_score: null,

  predict: async () => {
    try {
      const { user } = AuthStore.getState();

      const height = user?.manualInput?.height;
      const weight = user?.manualInput?.weight;

      const bmi = height && weight ? weight / (height / 100) ** 2 : null;

      const payload = {
        age: user?.manualInput?.age,
        bmi: bmi,
        heart_rate: user?.smartWatchInput?.heartrate,
        steps_per_day: user?.smartWatchInput?.steps,
        sleep_hours: user?.smartWatchInput?.sleephour,
        calories_burned: user?.smartWatchInput?.caloriesburned,
        blood_oxygen: user?.smartWatchInput?.bloodoxygen,
        respiratory_rate: user?.smartWatchInput?.respiratoryrate,
      };

      const response = await axiosPredict.post("/predict-risk", payload);

      set({ risk_level: response.data.risk_level });
    } catch (error) {
      console.error("Prediction error:", error);
    }
  },

  generate_task: async () => {
    try {
      // Define the payload to be sent in the request
      const payload = {
        age: 45,
        bmi: 25,
        heart_rate: 78,
        steps_per_day: 1000,
        sleep_hours: 7,
        calories_burned: 2200,
        blood_oxygen: 90,
        respiratory_rate: 20,
      };

      // Make the POST request to the /get-tasks endpoint
      const response = await axiosPredict.post("/get-tasks", payload);

      // Handle the response
      if (response.status === 200) {
        const data = response.data;

        // You can now process the recommended tasks, such as displaying them in the UI
        set({ tasks: data.recommended_tasks });
      } else {
        console.log("Error in response:", response.status);
      }
    } catch (error) {
      console.log("Prediction error:", error);
    }
  },

  predict_mental_score: async () => {
    try {
      const response = await axiosInstance.get(
        "/prediction/predict-mental-health"
      );
      set({ mental_score: response.data.mental_health_score });
    } catch (error) {
      console.log(error);
    }
  },
}));
