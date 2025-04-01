import { create } from "zustand";
import { persist } from "zustand/middleware"; // ✅ Add persist
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const useAuthStore = create(
  persist(
    (set, get) => ({
      authUser: null,
      isCheckingAuth: false,
      isLoggingIn: false,
      isUpdatingProfile: false,
      onlineUsers: [],

      // ✅ Fix: Use axiosInstance to ensure auth headers are included
      checkAuth: async () => {
        set({ isCheckingAuth: true });
        try {
          const res = await axiosInstance.get("/auth/check");
          console.log("Auth Check Response:", res.data);
          set({ authUser: res.data }); // ✅ Fix: Use res.data instead of undefined authUser
        } catch (error) {
          console.error("Error in checkAuth:", error?.response?.data || error.message);
          set({ authUser: null });
        } finally {
          set({ isCheckingAuth: false });
        }
      },

      signup: async (data) => {
        set({ isSigningUp: true });
        try {
          const res = await axiosInstance.post("/auth/signup", data);
      
          // ✅ Store token after signup
          localStorage.setItem("authToken", res.data.token);
      
          set({ authUser: res.data });
          toast.success("Account created successfully");
        } catch (error) {
          console.error("Error in signup:", error?.response?.data || error.message);
          toast.error(error?.response?.data?.message || "Signup failed");
        } finally {
          set({ isSigningUp: false });
        }
      },

      login: async (data) => {
        set({ isLoggingIn: true });
        try {
          const res = await axiosInstance.post("/auth/login", data);
          
          // ✅ Store token in localStorage
          localStorage.setItem("authToken", res.data.token);
      
          set({ authUser: res.data });
          toast.success("Logged in successfully");
        } catch (error) {
          console.error("Error in login:", error?.response?.data || error.message);
          toast.error(error?.response?.data?.message || "Login failed");
        } finally {
          set({ isLoggingIn: false });
        }
      },

      logout: async () => {
        try {
          await axiosInstance.post("/auth/logout");
          set({ authUser: null });
          toast.success("Logged out successfully");
        } catch (error) {
          toast.error(error?.response?.data?.message || "Logout failed");
        }
      },

      UpdateProfile: async (data) => {
        set({ isUpdatingProfile: true });
        try {
          const res = await axiosInstance.put("/auth/update-profile", data);
          set({ authUser: res.data });
          toast.success("Profile updated successfully");
        } catch (error) {
          console.error("Error in updateProfile:", error?.response?.data || error.message);
          toast.error(error?.response?.data?.message || "Profile update failed");
        } finally {
          set({ isUpdatingProfile: false });
        }
      }
    }),
    {
      name: "auth-storage", // ✅ Store auth state in localStorage
      getStorage: () => localStorage,
    }
  )
);