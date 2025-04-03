import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainerSelected from "../components/ChatContainerSelected";
import { Search } from "lucide-react"; 
import toast from "react-hot-toast";

const HomePage = () => {
  const { users, selectedUser, setSelectedUser, getUsers } = useChatStore();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getUsers(); // Fetch users on mount
  }, [getUsers]);

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      toast.error("Enter a username to search!");
      return;
    }

    const foundUser = users.find((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (foundUser) {
      setSelectedUser(foundUser); 
      setSearchTerm(""); 
    } else {
      toast.error("User not found!");
    }
  };

  return (
    <div className="h-screen bg-base-200">
      {/* Search Bar */}
      <div className="fixed top-0 left-0 right-0 shadow-md blur-0 p-4 flex justify-center z-10">
        <div className="relative w-full max-w-lg">
          <input
            type="text"
            placeholder="Search user..."
            className="input input-bordered w-full bg-base-200 pr-10 rounded-full shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <button
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-primary transition"
            onClick={handleSearch}
          >
            <Search size={20} />
          </button>
        </div>
      </div>

      {/* Main Layout */}
      <div className="flex items-center justify-center pt-20 px-4">
        <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-7xl h-[calc(100vh-8rem)]">
          <div className="flex h-full rounded-lg overflow-hidden">
            <Sidebar />
            {!selectedUser ? <NoChatSelected /> : <ChatContainerSelected />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
