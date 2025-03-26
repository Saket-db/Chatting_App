import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessageSquare, Settings, User, Menu } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 backdrop-blur-lg bg-base-100/80 shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Left: Logo */}
        <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-all">
          <motion.div whileHover={{ scale: 1.1 }} className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
            <MessageSquare className="w-5 h-5 text-primary" />
          </motion.div>
          <h1 className="text-lg font-bold">Chatify</h1>
        </Link>

        {/* Right: User Options */}
        <div className="relative flex items-center">
          {/* Desktop View: Show Inline Buttons */}
          <div className="hidden sm:flex items-center gap-2">
            <Link to="/settings" className="btn btn-sm flex items-center gap-2">
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </Link>
            {authUser && (
              <>
                <Link to="/profile" className="btn btn-sm flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>Profile</span>
                </Link>
                <button className="btn btn-sm flex items-center gap-2" onClick={logout}>
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </>
            )}
          </div>

          {/* Mobile View: Dropdown Menu */}
          <button className="sm:hidden btn btn-sm" onClick={() => setMenuOpen(!menuOpen)}>
            <Menu className="w-5 h-5" />
          </button>

          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute right-0 top-12 w-40 bg-base-200 shadow-lg rounded-lg overflow-hidden sm:hidden"
            >
              <Link
                to="/profile"
                className="flex items-center gap-2 px-4 py-2 hover:bg-base-300 transition-all"
                onClick={() => setMenuOpen(false)}
              >
                <User className="w-4 h-4" />
                Profile
              </Link>
              <Link
                to="/settings"
                className="flex items-center gap-2 px-4 py-2 hover:bg-base-300 transition-all"
                onClick={() => setMenuOpen(false)}
              >
                <Settings className="w-4 h-4" />
                Settings
              </Link>
              <button
                className="flex items-center gap-2 w-full px-4 py-2 text-red-500 hover:bg-red-100 transition-all"
                onClick={() => {
                  logout();
                  setMenuOpen(false);
                }}
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
