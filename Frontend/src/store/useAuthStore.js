import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";


export const useAuthStore = create((set) => ({
    authUser: null,
    isCheckAuth: false,
    isLoggingIng: false,
    isUpdateProfile: false,

    isCheckingAuth: true,
//Function is always async  
    checkAuth: async() => {
        console.log('hjk')
        try{
            const res = await axiosInstance.get("/auth/check");
            
            set((state) => ({ authUser: res.data }));
            console.log('klara',authUser);
            console.log('itsme',res.status);
        }
        catch(error)
        {
            console.log("Error in checkAuth:", error?.response?.data || error.message); 
            set(() => ({ authUser: null }));
        }
        finally {
            set(() => ({ isCheckingAuth: false }));
        }
    },
    
    signup: async (data) => {
        console.log("Signup Data:", data);
        set({ isSigningUp: true });
    
        try {
            const res = await axiosInstance.post("/auth/signup", data);
    
            console.log("Signup Response:", res.data); // ✅ Log API response
    
            // Ensure `authUser` is correctly set in the store
            set(() => ({ authUser: res.data }));
    
            toast.success("Account created successfully"); // ✅ Success message
        } 
        catch (error) {
            console.error("Error in signup:", error?.response?.data || error.message);
    
            toast.error(error?.response?.data?.message || "Signup failed");
        } 
        finally {
            set(() => ({ isSigningUp: false }));
        }
    },
    
}));