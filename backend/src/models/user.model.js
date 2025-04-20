import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    uid: { type: String, required: true, unique: true },
    name: String,
    email: { type: String, required: true, unique: true },
    photoURL: String,
    googleFit: {
      accessToken: String,
      refreshToken: String,
      expiryDate: Date,
    },
    isUserInfoAvailable: { type: Boolean, default: false },
    manualInput: {
      age: Number,
      height: Number,
      weight: Number,
      bodyFat: Number,
      isSmoker: Boolean,
      isDrinker: Boolean,
      isDiabetic: Boolean,
    },
    smartWatchInput: {
      heartrate: Number,
      steps: Number,
      sleephour: Number,
      caloriesburned: Number,
      bloodoxygen: Number,
      respiratoryrate: Number,
      blood_pressure_systolic: Number,
      blood_pressure_diastolic: Number,
    },
    goal: {
      type: String,
      required : false,
      default:"None"
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
