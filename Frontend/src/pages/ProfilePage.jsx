import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User } from "lucide-react";
import { motion } from "framer-motion";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, UpdateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await UpdateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className="h-screen pt-20">
      <div className="max-w-2xl mx-auto p-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-base-300 rounded-xl p-6 space-y-8 shadow-lg"
        >
          {/* Header */}
          <div className="text-center">
            <h1 className="text-2xl font-semibold">Profile</h1>
            <p className="mt-2 text-base-content/70">Your profile information</p>
          </div>

          {/* Avatar Upload Section */}
          <div className="flex flex-col items-center gap-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              <img
                src={
                  selectedImg ||
                  authUser.profilePic ||
                  "https://res.cloudinary.com/dyy1u7wvc/image/upload/v1742831930/skyswnfq1cpwysmf7slp.png"
                }
                alt="Profile"
                className="size-32 rounded-full object-cover border-4 shadow-md"
              />
              <motion.label
                whileHover={{ scale: 1.1 }}
                className={`absolute bottom-0 right-0 p-2 rounded-full cursor-pointer 
                  bg-base-content transition-all duration-200 shadow-md 
                  ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
                `}
                htmlFor="avatar-upload"
              >
                <Camera className="w-5 h-5 text-base-200" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </motion.label>
            </motion.div>
            <p className="text-sm text-base-content/60">
              {isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo"}
            </p>
          </div>

          {/* Profile Information */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            className="space-y-6"
          >
            <div className="space-y-2">
              <div className="text-sm text-base-content/60 flex items-center gap-2">
                <User className="w-4 h-4" />
                Full Name
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border shadow-sm">{authUser?.fullName}</p>
            </div>

            <div className="space-y-2">
              <div className="text-sm text-base-content/60 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border shadow-sm">{authUser?.email}</p>
            </div>
          </motion.div>

          {/* Account Information */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.3 }}
            className="mt-6 bg-base-300 rounded-xl p-6 shadow-md"
          >
            <h2 className="text-lg font-medium mb-4">Account Information</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-base-400">
                <span>Member Since</span>
                <span>{authUser.createdAt?.split("T")[0]}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span>Account Status</span>
                <span className="text-green-500">Active</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};
export default ProfilePage;
