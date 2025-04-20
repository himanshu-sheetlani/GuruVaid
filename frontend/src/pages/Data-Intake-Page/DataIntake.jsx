import { useForm } from "react-hook-form";
import { useIntakeStore } from "../../stores/useIntakeStore.js";

const DataIntake = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { upload } = useIntakeStore();

  const onSubmit = async (data) => {
    const parsedData = {
      age: Number(data.age),
      height: Number(data.height),
      weight: Number(data.weight),
      bodyFat: Number(data.bodyFat),
      isSmoker: data.isSmoker === "true",
      isDrinker: data.isDrinker === "true",
      isDiabetic: data.isDiabetic === "true",
      goal: data.goal,
    };

    try {
      const res = await upload(parsedData);
      if (res?.success) window.location.reload();
      console.log("Submitted:", parsedData);
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 py-12 px-6 md:px-20 text-gray-800">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl p-10 shadow-xl border border-gray-200">
        <h2 className="text-4xl font-bold mb-10 text-center text-blue-600">
          Health Information Intake
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-semibold mb-4 text-blue-500">
              Personal Information
            </h3>
          </div>

          {[
            { name: "age", label: "Age", type: "number" },
            { name: "height", label: "Height (cm)", type: "number" },
            { name: "weight", label: "Weight (kg)", type: "number" },
            {
              name: "bodyFat",
              label: "Body Fat (%)",
              type: "number",
              step: "0.1",
            },
          ].map(({ name, label, type, step }) => (
            <div key={name}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {label}
              </label>
              <input
                type={type}
                step={step}
                {...register(name, { required: true })}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors[name] && (
                <span className="text-red-500 text-sm">
                  This field is required
                </span>
              )}
            </div>
          ))}

          {/* ✅ Goal SELECT Field */}
          <div className="col-span-1 md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Your Goal
            </label>
            <select
              {...register("goal", { required: true })}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a goal...</option>
              <option value="Lose weight">Lose weight</option>
              <option value="Build muscle">Build muscle</option>
              <option value="Improve stamina">Improve stamina</option>
              <option value="Maintain current fitness">Maintain current fitness</option>
              <option value="Gain healthy weight">Gain healthy weight</option>
            </select>
            {errors.goal && (
              <span className="text-red-500 text-sm">
                This field is required
              </span>
            )}
          </div>

          <div className="col-span-1 md:col-span-2 mt-6">
            <h3 className="text-2xl font-semibold mb-4 text-blue-500">
              Lifestyle & Health Habits
            </h3>
          </div>

          {[
            { name: "isSmoker", label: "Do you smoke?" },
            { name: "isDrinker", label: "Do you drink alcohol?" },
            { name: "isDiabetic", label: "Are you diabetic?" },
          ].map(({ name, label }) => (
            <div key={name}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {label}
              </label>
              <select
                {...register(name, { required: true })}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select...</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
              {errors[name] && (
                <span className="text-red-500 text-sm">
                  This field is required
                </span>
              )}
            </div>
          ))}

          <div className="col-span-1 md:col-span-2 text-center pt-6">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 transition-all px-10 py-4 text-lg rounded-xl font-semibold text-white shadow-lg"
            >
              Submit Info
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DataIntake;
