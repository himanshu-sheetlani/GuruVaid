import React from "react";
import { useFitStore } from "../../../stores/useFitStore";

export default function FitConnect() {
  const { fetchFitUrl, isLoading } = useFitStore();

  return (
    <div className="p-4">
      <button
        onClick={fetchFitUrl}
        disabled={isLoading}
        className="bg-green-500 text-white px-4 py-2 rounded mt-24"
      >
        {isLoading ? "Connecting..." : "Connect Google Fit"}
      </button>
    </div>
  );
}
