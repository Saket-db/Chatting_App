import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessageSquare, Settings, User, Menu, Bell, BellOff } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { io } from "socket.io-client";
import toast from "react-hot-toast";

const socket = io("http://localhost:5000", { withCredentials: true });

const Navbar = () => {
  const { logout, authUser } = useAuthStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [notificationsMuted, setNotificationsMuted] = useState(false);

  // Join user to socket when component mounts
  useEffect(() => {
    if (authUser) {
      socket.emit("join", authUser._id);
    }

    return () => {
      socket.disconnect();
    };
  }, [authUser]);

  // Listen for real-time notifications
  useEffect(() => {
    socket.on("receiveNotification", (data) => {
      if (!notificationsMuted) {
        toast(`${data.senderName}: ${data.message}`, {
          icon: "🔔",
        });
      }
    });

    return () => {
      socket.off("receiveNotification");
    };
  }, [notificationsMuted]);

  return (
    <>
      {/* ✅ Desktop Sidebar */}
      <aside className="hidden sm:flex flex-col items-center fixed right-0 top-0 h-screen w-20 bg-base-100 border-l border-base-300 shadow-lg py-6">
        <Link to="/" className="flex items-center justify-center p-3 hover:opacity-80 transition-all">
          <motion.div whileHover={{ scale: 1.1 }} className="size-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <MessageSquare className="w-6 h-6 text-primary" />
          </motion.div>
        </Link>

        <div className="mt-8 flex flex-col gap-4">
          <Link to="/settings" className="btn btn-square">
            <Settings className="w-5 h-5" />
          </Link>

          {authUser && (
            <>
              <Link to="/profile" className="btn btn-square">
                <User className="w-5 h-5" />
              </Link>

              <div className="flex-grow"></div>

              <div className="flex flex-col mt-5 gap-5 mb-6">
              {/* ✅ Mute/Unmute Notifications Button */}
              <button className="btn btn-square" onClick={() => setNotificationsMuted(!notificationsMuted)}>
                {notificationsMuted ? <BellOff className="w-5 h-5 text-red-500" /> : <Bell className="w-5 h-5 text-green-500" />}
              </button>

              {/* ✅ Logout Button */}
              <button className="btn btn-square btn-error" onClick={() => setShowLogoutConfirm(true)}>
                <LogOut className="w-5 h-5" />
              </button>
              </div>
            </>
          )}
        </div>
      </aside>

      {/* ✅ Mobile View Navbar */}
      <header className="sm:hidden bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 backdrop-blur-lg bg-base-100/80 shadow-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-all">
            <motion.div whileHover={{ scale: 1.1 }} className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-primary" />
            </motion.div>
            <h1 className="text-lg font-bold">Chatify</h1>
          </Link>

          {/* Mobile Menu Button */}
          <button className="sm:hidden btn btn-sm" onClick={() => setMenuOpen(!menuOpen)}>
            <Menu className="w-5 h-5" />
          </button>

          {/* ✅ Mobile Dropdown Menu */}
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute right-4 top-16 w-40 bg-base-200 shadow-lg rounded-lg overflow-hidden"
              >
                {authUser && (
                  <>
                    <Link to="/profile" className="flex items-center gap-2 px-4 py-2 hover:bg-base-300 transition-all" onClick={() => setMenuOpen(false)}>
                      <User className="w-4 h-4" />
                      Profile
                    </Link>
                    <Link to="/settings" className="flex items-center gap-2 px-4 py-2 hover:bg-base-300 transition-all" onClick={() => setMenuOpen(false)}>
                      <Settings className="w-4 h-4" />
                      Settings
                    </Link>

                    {/* ✅ Mute/Unmute Notifications */}
                    <button className="flex items-center gap-2 w-full px-4 py-2 hover:bg-base-300 transition-all" onClick={() => setNotificationsMuted(!notificationsMuted)}>
                      {notificationsMuted ? (
                        <>
                          <BellOff className="w-4 h-4 text-red-500" />
                          Unmute
                        </>
                      ) : (
                        <>
                          <Bell className="w-4 h-4 text-green-500" />
                          Mute
                        </>
                      )}
                    </button>

                    {/* Logout */}
                    <button className="flex items-center gap-2 w-full px-4 py-2 text-red-500 hover:bg-red-100 transition-all" onClick={() => setShowLogoutConfirm(true)}>
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* ✅ Logout Confirmation Modal */}
      <AnimatePresence>
        {showLogoutConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={() => setShowLogoutConfirm(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 10 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-xl max-w-md w-full mx-4 border border-gray-200 dark:border-gray-700"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl font-bold text-gray-800 dark:text-white">Are you sure you want to logout?</h2>
              <p className="mt-2 text-gray-600 dark:text-gray-300">You'll need to sign in again to access your account.</p>
              <div className="mt-6 flex justify-end gap-3">
                <button className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium" onClick={() => setShowLogoutConfirm(false)}>
                  Cancel
                </button>
                <button className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-medium" onClick={() => logout()}>
                  Logout
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
