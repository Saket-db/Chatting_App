import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const [showProfile, setShowProfile] = useState(false);
  const profileRef = useRef(null);

  // Close profile when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfile(false);
      }
    };

    if (showProfile) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showProfile]);

  return (
    <div className="p-2.5 border-b border-base-300 relative">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="avatar">
            <div className="size-10 rounded-full relative">
              <img
                src={
                  selectedUser.profilePic ||
                  "https://res.cloudinary.com/dyy1u7wvc/image/upload/v1742831930/skyswnfq1cpwysmf7slp.png"
                }
                alt={selectedUser.fullName}
              />
            </div>
          </div>
          {/* User info */}
          <div className="relative">
            <h3
              className="font-medium cursor-pointer hover:underline"
              onClick={() => setShowProfile(!showProfile)}
            >
              {selectedUser.fullName}
            </h3>
            <p className="text-sm text-base-content/70">
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>
        {/* Close button */}
        <button onClick={() => setSelectedUser(null)}>
          <X />
        </button>
      </div>

      {/* Profile Popup - now positioned within the chat container */}
      <AnimatePresence>
        {showProfile && (
          <motion.div
            ref={profileRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute left-0 top-full mt-2 bg-base-200 p-4 rounded-lg shadow-lg z-20 w-64 border border-base-300"
            style={{ maxWidth: "calc(100% - 2rem)" }}
          >
            <button
              className="absolute top-2 right-2 p-1 rounded-full hover:bg-base-300 transition-colors"
              onClick={() => setShowProfile(false)}
              aria-label="Close profile"
            >
              <X size={18} />
            </button>
            <div className="flex flex-col items-center pt-4">
              <img
                src={
                  selectedUser.profilePic ||
                  "https://res.cloudinary.com/dyy1u7wvc/image/upload/v1742831930/skyswnfq1cpwysmf7slp.png"
                }
                alt={selectedUser.fullName}
                className="w-16 h-16 rounded-full border mb-3"
              />
              <h3 className="font-medium text-center">{selectedUser.fullName}</h3>
              <p className="text-xs text-base-content/70 text-center mt-1">{selectedUser.email}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatHeader;