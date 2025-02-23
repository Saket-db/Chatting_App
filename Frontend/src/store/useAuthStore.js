import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";

export const useAuthStore = create((set) => ({
    authUser: null,
    isCheckAuth: false,
    isLoggingIng: false,
    isUpdateProfile: false,

    isCheckingAuth: true,
//Function is always async  
    checkAuth: async() => {
        try{
            const res = await axiosInstance.get("/auth/check");
            
            set(({authUser: res.data}));
        }
        catch(error)
        {
            console.log("Error in checkAuth:", error);
            set({authUser: null});
        }
        finally {
            set({ isCheckingAuth: false});
        }
    },
    
    signup: async (data) => {
        set({ isSigningUp: true });
        try {
          const res = await axiosInstance.post("/auth/signup", data);
          set({ authUser: res.data });
        }
        finally {
            set({ isSigningUp: false });
          }
    },
}));