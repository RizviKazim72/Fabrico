import { useState } from "react";
import {
  User,
  Mail,
  Phone,
  Calendar,
  Shield,
  Edit2,
  Save,
  X,
} from "lucide-react";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";

function ProfilePage() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    phoneNumber: user?.phoneNumber || "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    if (formData.name.length < 2) {
      toast.error("Name must be at least 2 characters");
      return;
    }
    const updatedUser = {
      ...user,
      name: formData.name,
      phoneNumber: formData.phoneNumber,
    };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setIsEditing(false);
    toast.success("Profile updated successfully!");
    window.location.reload();
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || "",
      phoneNumber: user?.phoneNumber || "",
    });
    setIsEditing(false);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const getAccountAge = () => {
    if (!user?.createdAt) return "Recently joined";
    const created = new Date(user.createdAt);
    const now = new Date();
    const diffDays = Math.floor((now - created) / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return "Joined today";
    if (diffDays === 1) return "Joined yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="bg-gradient-to-r from-brand-500 to-brand-600 text-white pt-20">
        <div className="container mx-auto px-4 py-16">
          <div className="flex items-center gap-4">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
              <User className="w-12 h-12 text-brand-600" />
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2">{user?.name}</h1>
              <p className="text-brand-100">{user?.email}</p>
              <p className="text-sm text-brand-200 mt-1">{getAccountAge()}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Account Overview
              </h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Shield className="w-5 h-5 text-brand-600" />
                  <div>
                    <p className="text-xs text-gray-500">Role</p>
                    <p className="font-semibold text-gray-800 capitalize">
                      {user?.role || "User"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Calendar className="w-5 h-5 text-brand-600" />
                  <div>
                    <p className="text-xs text-gray-500">Member Since</p>
                    <p className="font-semibold text-gray-800">
                      {formatDate(user?.createdAt || new Date().toISOString())}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Mail className="w-5 h-5 text-brand-600" />
                  <div>
                    <p className="text-xs text-gray-500">Email Status</p>
                    <p className="font-semibold text-green-600">Verified ✓</p>
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">
                  Quick Stats
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-brand-50 rounded-lg">
                    <p className="text-2xl font-bold text-brand-600">0</p>
                    <p className="text-xs text-gray-600">Orders</p>
                  </div>
                  <div className="text-center p-3 bg-brand-50 rounded-lg">
                    <p className="text-2xl font-bold text-brand-600">0</p>
                    <p className="text-xs text-gray-600">Reviews</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-800">
                  Profile Information
                </h2>
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-2 text-brand-600 hover:text-brand-700 font-medium transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                    Edit Profile
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={handleCancel}
                      className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-700 font-medium transition-colors"
                    >
                      <X className="w-4 h-4" />
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      className="flex items-center gap-2 px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white font-medium rounded-lg transition-colors"
                    >
                      <Save className="w-4 h-4" />
                      Save
                    </button>
                  </div>
                )}
              </div>
              <div className="p-6">
                <div className="space-y-6">
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                      <User className="w-4 h-4" />
                      Full Name
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                        placeholder="Enter your name"
                      />
                    ) : (
                      <p className="text-lg text-gray-800">{user?.name}</p>
                    )}
                  </div>
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                      <Mail className="w-4 h-4" />
                      Email Address
                    </label>
                    <p className="text-lg text-gray-800 flex items-center gap-2">
                      {user?.email}
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                        Verified
                      </span>
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Email cannot be changed
                    </p>
                  </div>
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                      <Phone className="w-4 h-4" />
                      Phone Number
                    </label>
                    {isEditing ? (
                      <input
                        type="tel"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                        placeholder="Enter your phone number"
                      />
                    ) : (
                      <p className="text-lg text-gray-800">
                        {user?.phoneNumber || "Not provided"}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      User ID
                    </label>
                    <p className="text-sm text-gray-600 font-mono bg-gray-50 px-3 py-2 rounded">
                      #{user?.id || "00000"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Account Security
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-800">Password</p>
                    <p className="text-sm text-gray-500">
                      Last changed recently
                    </p>
                  </div>
                  <button className="text-brand-600 hover:text-brand-700 font-medium text-sm">
                    Change Password
                  </button>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-800">
                      Two-Factor Authentication
                    </p>
                    <p className="text-sm text-gray-500">
                      Add extra security to your account
                    </p>
                  </div>
                  <button className="text-brand-600 hover:text-brand-700 font-medium text-sm">
                    Enable
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;