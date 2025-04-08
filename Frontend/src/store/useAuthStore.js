import { create } from "zustand";
import { persist } from "zustand/middleware"; // ✅ Add persist
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL = "http://localhost:5002"

export const useAuthStore = create(
  persist(
    (set, get) => ({
      authUser: null,
      isCheckingAuth: false,
      isLoggingIn: false,
      isUpdatingProfile: false,
      onlineUsers: [],
      socket:null,

      // ✅ Fix: Use axiosInstance to ensure auth headers are included
      checkAuth: async () => {
        set({ isCheckingAuth: true });
        try {
          const res = await axiosInstance.get("/auth/check");
          console.log("Auth Check Response:", res.data);
          set({ authUser: res.data }); // ✅ Fix: Use res.data instead of undefined authUser
          get().connectSocket(); 
        } 
        catch (error) {
          console.error("Error in checkAuth FULL:", error);
          console.error("Error in checkAuth MESSAGE:", error?.response?.data || error.message);
          set({ authUser: null });
        }
         finally {
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
          get().connectSocket(); 
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
          localStorage.setItem("authToken", res.data.token);
          set({ authUser: res.data });
          toast.success("Logged in successfully");
          get().connectSocket(); 
        } 
        catch (error) {
          console.error("Error in login:", error?.response?.data || error.message);
          toast.error(error?.response?.data?.message || "Login failed");
        } 
        finally {
          set({ isLoggingIn: false });
        }
      },

      logout: async () => {
        try {
          await axiosInstance.post("/auth/logout");
          set({ authUser: null });
          toast.success("Logged out successfully");
          get().disconnectSocket();
        } catch (error) {
          toast.error(error?.response?.data?.message || "Logout failed");
        }
      },

      connectSocket: () => {
        const { authUser } = get();
        if (!authUser || get().socket?.connected) return;
    
        const socket = io(BASE_URL, {
          withCredentials: true,
          query: {
            userId: authUser._id,
          },
        });
        socket.connect();
    
        set({ socket: socket });
    
        socket.on("getOnlineUsers", (userIds) => {
          set({ onlineUsers: userIds });
        });
      },


      disconnectSocket: () => {
      if(get().socket?.connected) get().socket.disconnect();
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
  name: "auth-storage",
  getStorage: () => localStorage,
  partialize: (state) => {
    const { socket, ...rest } = state;
    return rest;
  },
})
    
);