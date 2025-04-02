import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
  messages: [],
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
    // console.log("Hello");
    try {
      // console.log("HH");
      const res = await axiosInstance.get(`/messages/${userId}`);
      // console.log("I");
      console.log("Fetched messages:", res.data);

      set({ messages: res.data });
      // console.log("Hi");
    } 
    catch (error)
    {
      toast.error(error.response?.data?.message || "Failed to load messages.");
    } 
    finally 
    {
      set({ isMessagesLoading: false });
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

      set((state) => ({ messages: [...state.messages, res.data] }));
    } catch (error) {
      console.error("Failed to send message:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Failed to send message.");
    }
  },

  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;
    socket.off("newMessage"); // Remove previous listeners to avoid duplicates

    socket.on("newMessage", (newMessage) => {
      set((state) => {
        if (newMessage.senderId !== selectedUser._id) return state; // Ignore messages not from selected user
        return { messages: [...state.messages, newMessage] };
      });
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
  },

  setSelectedUser: (selectedUser) => {
    set({ selectedUser, messages: [] }); // Reset messages when selecting a new user
    get().getMessages(selectedUser?._id); // Fetch messages for the selected user
  },
}));
