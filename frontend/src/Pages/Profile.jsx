import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import userAvatar from "../assets/user.png";
import { Camera } from "lucide-react";

export default function Profile() {
    const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();

    const [selectedImage, setSelectedImage] = useState(null);

    const [formData, setFormData] = useState({
        fullName: authUser?.fullName || "",
        email: authUser?.email || "",
    });

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = async () => {
            const baseImage = reader.result;
            setSelectedImage(baseImage);
            await updateProfile({ profilePic: baseImage });
        };
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        await updateProfile({
            ...formData,
            profilePic: selectedImage,
        });
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white flex justify-center items-center px-4 py-10">
            <div className="w-full max-w-2xl bg-gray-800 rounded-2xl shadow-xl p-8">
                {/* Header */}
                <div className="flex flex-col items-center gap-4 relative">
                    <div className="relative">
                        <img
                            src={
                                selectedImage ||
                                authUser?.profilePic ||
                                userAvatar
                            }
                            alt="Profile"
                            className="w-28 h-28 rounded-full object-cover border-4 border-blue-500 shadow-lg"
                        />

                        {/* Hidden File Input */}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                            id="avatarUpload"
                        />

                        {/* Camera Button */}
                        <label
                            htmlFor="avatarUpload"
                            className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full cursor-pointer hover:bg-blue-700 transition"
                        >
                            <Camera size={18} />
                        </label>
                    </div>

                    <h2 className="text-3xl font-bold">Your Profile</h2>
                    <p className="text-gray-400 text-sm">
                        Manage your personal information
                    </p>
                </div>

                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    className="mt-8 flex flex-col gap-6"
                >
                    {/* Full Name */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm text-gray-300">
                            Full Name
                        </label>
                        <input
                            type="text"
                            value={formData.fullName}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    fullName: e.target.value,
                                })
                            }
                            className="bg-gray-700 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                            placeholder="Enter your name"
                        />
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm text-gray-300">
                            Email Address
                        </label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    email: e.target.value,
                                })
                            }
                            className="bg-gray-700 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                            placeholder="Enter your email"
                        />
                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        disabled={isUpdatingProfile}
                        className="bg-blue-600 hover:bg-blue-700 transition rounded-xl py-3 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isUpdatingProfile ? "Updating..." : "Update Profile"}
                    </button>
                </form>
            </div>
        </div>
    );
}
