import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import axios from "axios";
// import { updateProfile } from "../../../Backend/src/controllers/auth.controller.js";
// import { updateProfile } from "../../../Backend/src/controllers/auth.controller.js";


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
            console.log("Hi");
            const res = await axios.get("/auth/check");
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
    
            console.log("Signup Response:", res.data); 
    
            
            set(() => ({ authUser: res.data }));
    
            toast.success("Account created successfully"); 
        } 
        catch (error) {
            console.error("Error in signup:", error?.response?.data || error.message);
    
            toast.error(error?.response?.data?.message || "Signup failed");
        } 
        finally {
            set(() => ({ isSigningUp: false }));
        }
    },

    logout: async () => {

        console.log("Logout");
        try{
            await axiosInstance.post("/auth/logout");
            set({authUser:null});
            toast.success("Logged out successfully");
        }
        catch(error)
        {
            toast.error(error.response.data.message);
        }
    },
    
    login: async (data) => {  // <-- Accept data as a parameter
        console.log("Login", data);
        set({ isLoggingIn: true });
    
        try {
            const res = await axiosInstance.post("/auth/login", data);
            set({ authUser: res.data });
            toast.success("Logged in successfully");
        }
        catch (error) {
            console.error("Error in login:", error?.response?.data || error.message);
            toast.error(error?.response?.data?.message || "Login failed");
        }
        finally {
            set({ isLoggingIn: false });
        }
    },


    UpdateProfile: async(data) => {
        set({ isUpdatingProfile: true });
        try{
            console.log("Helo");
            const res = await axiosInstance.put("/auth/update-profile",data);
            set({ authUser: res.data });
            toast.success("Profile updated successfully");
        }
        catch(error){
            console.log("Error: ", error);
            toast.error(error.response.data.message);   
        }
        finally{
            set({isUpdatingProfile:false});
        }
    }
}));