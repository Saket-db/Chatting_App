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
            
            set(({authUser: res.data}));
            console.log('klara',authUser);
            console.log('itsme',res.status);
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
        console.log('karan',data)
        set({ isSigningUp: true });
        try {
          const res = await axiosInstance.post("/auth/signup", data);
          set({ authUser: res.data });
          console.log("hello woerld",authUser)
          toast.success("Account created successfully");
        //   get().connectSocket();
        } catch (error) {
        console.log("Error in signup:");
          toast.error(error.response.data.message);
        } finally {
          set({ isSigningUp: false });
          }
    },
}));