import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { User, Mail, Edit3, Save, Camera } from "lucide-react";
import { getCurrentUser, updateUserProfile } from "../lib/auth"; // example auth helpers

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    role: "",
    bio: "",
    avatar_url: "",
  });

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
      setFormData({
        full_name: currentUser.full_name,
        email: currentUser.email,
        role: currentUser.role || "Student",
        bio: currentUser.bio || "",
        avatar_url: currentUser.avatar_url || "",
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    updateUserProfile(formData);
    setUser(formData);
    setEditMode(false);
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imgURL = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, avatar: imgURL }));
    }
  };

  if (!user) return <div className="p-6 text-gray-500">Loading profile...</div>;

  return (
    <Layout>
    <div className="flex justify-between items-center mb-4 border-sky-600 border-[0.5pt] bg-sky-800 rounded-lg p-4">
        <h2 className="text-3xl font-bold text-gray-200">My Profile</h2>
    </div>

    <div className="bg-sky-800 border-sky-600 border-[0.5pt] rounded-lg p-8">
      <div className="max-w-6xl">
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          {/* Avatar Section */}
          <div className="relative hover:scale-105 transition-transform duration-300">
            {formData.avatar_url ? (
            <img
              src={formData.avatar_url ? `http://localhost:5000${formData.avatar_url}` : "https://via.placeholder.com/150"}
              alt="Avatar"
              className="w-32 h-32 rounded-full object-cover border-4 border-gray-200"
            />
            ) : (
              <div className="w-32 h-32 rounded-full bg-gray-500 flex items-center justify-center border-4 border-gray-200">
                <User className="w-16 h-16 text-white" />
              </div>
            )}
            {editMode && (
              <label className="absolute bottom-2 right-2 bg-gray-600 text-white p-2 rounded-full cursor-pointer hover:bg-gray-700">
                <Camera size={16} />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarChange}
                />
              </label>
            )}
          </div>

          {/* Profile Info */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-300">
                {formData.full_name}
              </h2>
              <button
                onClick={() => setEditMode(!editMode)}
                className="flex items-center border-[1pt] border-sky-700 gap-2 px-3 py-1.5 bg-sky-900 text-gray-300 rounded-lg hover:bg-sky-800 transition-colors duration-300"
              >
                {editMode ? <Save size={16} /> : <Edit3 size={16} />}
                {editMode ? "Save" : "Edit"}
              </button>
            </div>

            <div className="space-y-3 text-xl">
              <div className="flex border-sky-600 border-[0.5pt] p-2 rounded-lg bg-sky-900 items-center gap-7">
                
                {editMode ? (
                  <input
                    name="name"
                    value={formData.full_name}
                    onChange={handleChange}
                    className="border bg-sky-900 text-white rounded px-2 py-1 w-full"
                  />
                ) : (
                  <span className="text-gray-300">{formData.full_name}</span>
                )}
              </div>
              <div className="flex border-sky-600 border-[0.5pt] p-2 rounded-lg bg-sky-900 items-center gap-7">
                {editMode ? (
                  <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="border bg-sky-900 text-white rounded px-2 py-1 w-full"
                  />
                ) : (
                  <span className="text-gray-300">{formData.email}</span>
                )}
              </div>

              <div className="flex border-sky-600 border-[0.5pt] p-2 rounded-lg bg-sky-900 items-center gap-3">
                
                {editMode ? (
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="border rounded bg-sky-900 text-white px-2 py-1 w-full"
                  >
                    <option value="Student">Student</option>
                    <option value="Professor">Professor</option>
                    <option value="Admin">Admin</option>
                  </select>
                ) : (
                  <span className="text-gray-300">{formData.role}</span>
                )}
              </div>

              <div className=" border-sky-600 border-[0.5pt] p-2 rounded-lg bg-sky-900">
                {editMode ? (
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    className="border rounded bg-sky-900 text-white px-3 py-2 w-full"
                    rows={3}
                  />
                ) : (
                  <p className="text-gray-300">{formData.bio || "No bio yet."}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </Layout>
  );
}
