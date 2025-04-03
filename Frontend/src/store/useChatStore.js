import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
//import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
  messages: {}, // Store messages by user ID
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/users");
      set({ users: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load users.");
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId) => {
    if (!userId) {
      toast.error("User ID is required to fetch messages.");
      return;
    }

    set({ isMessagesLoading: true });

    try {
      console.log("Fetching messages for user:", userId); // Debugging Log
      const res = await axiosInstance.get(`/messages/${userId}`);

      console.log("Fetched messages:", res.data); // Debugging Log

      set((state) => ({
        messages: { ...state.messages, [userId]: res.data || [] }, // Ensure it's always an array
        isMessagesLoading: false,
      }));
    } catch (error) {
      console.error("Error fetching messages:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Failed to load messages.");
      set({ isMessagesLoading: false }); // Ensure loading state resets
    }
  },

  sendMessage: async (messageData) => {
    const { selectedUser } = get();
    if (!selectedUser?._id) {
      toast.error("No user selected for messaging!");
      return;
    }

    try {
      const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);

      if (!res.data) {
        throw new Error("Empty response from server");
      }

      set((state) => ({
        messages: {
          ...state.messages,
          [selectedUser._id]: [...(state.messages[selectedUser._id] || []), res.data],
        },
      }));
    } catch (error) {
      console.error("Failed to send message:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Failed to send message.");
    }
  },

  setSelectedUser: (selectedUser) => {
    if (!selectedUser) return;
    set({ selectedUser });

    // Ensure we reset messages if not fetched
    if (!get().messages[selectedUser._id]) {
      set((state) => ({ messages: { ...state.messages, [selectedUser._id]: [] } }));
      get().getMessages(selectedUser._id);
    }
  },

  clearMessages: () => {
    set({ messages: {} });
  },
}));
