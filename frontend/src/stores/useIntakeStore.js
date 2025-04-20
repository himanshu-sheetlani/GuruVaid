import { create } from "zustand";
import { axiosInstance } from "../utils/axios";

export const useIntakeStore = create((set) => ({
  isLoading: false,
  error: null,
  upload: async (data) => {
    try {
      set({ isLoading: true });
      const response = await axiosInstance.post("/data/upload", data); // Pass data!
      return response.data; // ✅ Return response
    } catch (error) {
      console.log(error);
      set({ error: error.response?.data?.message || "Something went wrong" });
      throw error; // so the calling function can handle it
    } finally {
      set({ isLoading: false });
    }
  },
}));
