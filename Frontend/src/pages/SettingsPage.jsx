import { THEMES } from "../constants";
import { useThemeStore } from "../store/useThemeStore";
import { Send } from "lucide-react";
import { motion } from "framer-motion";

const PREVIEW_MESSAGES = [
  { id: 1, content: "Hey! How's it going?", isSent: false },
  { id: 2, content: "I'm doing great!", isSent: true },
];

const SettingsPage = () => {
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="h-screen container mx-auto px-4 pt-20 max-w-4xl">
      <div className="space-y-8">
        {/* Theme Selection */}
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-semibold">Theme</h2>
          <p className="text-sm text-base-content/60">
            Choose a theme for your chat interface
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
          {THEMES.map((t) => (
            <motion.button
              key={t}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`group flex flex-col items-center gap-2 p-3 rounded-lg 
                border border-base-300 shadow-md transition-all 
                ${theme === t ? "bg-primary/20 scale-105 shadow-lg" : "hover:bg-base-200/50"}
              `}
              onClick={() => setTheme(t)}
            >
              <div className="relative h-10 w-full rounded-md overflow-hidden" data-theme={t}>
                <div className="absolute inset-0 grid grid-cols-4 gap-px p-1">
                  <div className="rounded bg-primary"></div>
                  <div className="rounded bg-secondary"></div>
                  <div className="rounded bg-accent"></div>
                  <div className="rounded bg-neutral"></div>
                </div>
              </div>
              <span className="text-[12px] font-medium truncate w-full text-center">
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </span>
            </motion.button>
          ))}
        </div>

        {/* Preview Section */}
        <h3 className="text-xl font-semibold mb-3">Preview</h3>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="rounded-xl border border-base-300 bg-base-100 shadow-lg overflow-hidden"
        >
          <div className="p-5 bg-base-200">
            <div className="max-w-lg mx-auto">
              {/* Chat Header */}
              <div className="bg-base-100 rounded-xl shadow-lg">
                <div className="px-5 py-4 border-b border-base-300 bg-base-100 flex items-center gap-3">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-primary-content font-medium"
                  >
                    S
                  </motion.div>
                  <div>
                    <h3 className="font-medium text-sm">Saket DB</h3>
                    <p className="text-xs text-base-content/70">Online</p>
                  </div>
                </div>

                {/* Messages */}
                <div className="p-4 space-y-4 min-h-[200px] max-h-[200px] overflow-y-auto bg-base-100">
                  {PREVIEW_MESSAGES.map((message, index) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.2 }}
                      className={`flex ${message.isSent ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[75%] rounded-lg px-4 py-2 shadow-md transition-all 
                          ${message.isSent ? "bg-primary text-primary-content" : "bg-base-200"}
                        `}
                      >
                        <p className="text-sm">{message.content}</p>
                        <p
                          className={`text-[10px] mt-1 text-right 
                            ${message.isSent ? "text-primary-content/70" : "text-base-content/60"}
                          `}
                        >
                          12:00 PM
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Chat Input */}
                <div className="p-4 border-t border-base-300 bg-base-100">
                  <div className="flex gap-3">
                    <input
                      type="text"
                      className="input input-bordered flex-1 text-sm h-10 rounded-lg shadow-sm focus:ring-2 focus:ring-primary transition-all"
                      placeholder="Type a message..."
                      value="This is a preview"
                      readOnly
                    />
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      className="btn btn-primary h-10 min-h-0 shadow-md hover:scale-105 transition-all"
                    >
                      <Send size={18} />
                    </motion.button>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
export default SettingsPage;
