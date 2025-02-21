import { create } from "zustand";

export const useAuthStore = create((set) => ({
    authUser: null,
    isCheckAuth: false,
    isLoggingIng: false,
    isUpdateProfile: false,

    isCheckingAuth: true,
}));