import React, { useState, useEffect, useContext } from "react";
import { assets } from "../assets/assets.js";
import axios from "../config/axiosConfig.js";
import { toast } from "react-toastify";
import { AuthContext } from "../auth/AuthProvider.jsx";

const MyProfile = () => {
  const { user, isAuthenticated, fetchUser } = useContext(AuthContext);
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (user) {
      setUserData({
        ...user,
        address: user.address || {
          line1: "",
          line2: "",
          city: "",
          state: "",
          zip: "",
        },
        skills: user.skills || [],
        languages: user.languages || [],
        certifications: user.certifications || [],
        projects: user.projects || [],
        achievements: user.achievements || [],
        codingTracks: user.codingTracks || [],
      });
    }
  }, [user]);

  const handleArrayInput = (key, value) => {
    setUserData((prev) => ({
      ...prev,
      [key]: value.split(",").map((item) => item.trim()),
    }));
  };

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();
      formData.append("name", userData.name);
      formData.append("phone", userData.phone);
      formData.append("dob", userData.dob);
      formData.append("gender", userData.gender);
      formData.append("branch", userData.branch);
      formData.append("semester", userData.semester);
      formData.append("resumeUrl", userData.resumeUrl);
      formData.append("address", JSON.stringify(userData.address));
      formData.append("skills", JSON.stringify(userData.skills));
      formData.append("languages", JSON.stringify(userData.languages));
      formData.append(
        "certifications",
        JSON.stringify(userData.certifications)
      );
      formData.append("projects", JSON.stringify(userData.projects));
      formData.append("achievements", JSON.stringify(userData.achievements));
      formData.append("codingTracks", JSON.stringify(userData.codingTracks));
      if (image) formData.append("image", image);

      const { data } = await axios.put("/api/users/update-user", formData);

      if (data.success) {
        toast.success(data.message);
        await fetchUser();
        setIsEdit(false);
        setImage(null);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Error updating profile");
    }
  };

  if (!isAuthenticated || !userData) return <p>Loading...</p>;

  return (
    <div className="flex flex-col max-w-lg gap-2 text-sm">
      {/* Image Upload */}
      {isEdit ? (
        <label htmlFor="image">
          <div className="relative inline-block cursor-pointer">
            <img
              className="rounded opacity-75 w-36"
              src={image ? URL.createObjectURL(image) : userData.image}
              alt="Profile"
            />
            {!image && (
              <img
                className="absolute w-10 bottom-12 right-12"
                src={assets.upload_icon}
                alt="upload"
              />
            )}
          </div>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
          />
        </label>
      ) : (
        <img className="rounded w-36" src={userData.image} alt="Profile" />
      )}

      {/* Name */}
      {isEdit ? (
        <input
          className="mt-4 text-3xl font-medium bg-gray-50 max-w-60"
          value={userData.name}
          onChange={(e) =>
            setUserData((prev) => ({ ...prev, name: e.target.value }))
          }
        />
      ) : (
        <p className="mt-4 text-3xl font-medium text-neutral-800">
          {userData.name}
        </p>
      )}

      {/* Contact Info */}
      <div>
        <p className="mt-3 underline text-neutral-500">CONTACT INFORMATION</p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
          <p className="font-medium">Email:</p>
          <p>{userData.email}</p>

          <p className="font-medium">Phone:</p>
          {isEdit ? (
            <input
              value={userData.phone}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, phone: e.target.value }))
              }
            />
          ) : (
            <p>{userData.phone}</p>
          )}

          <p className="font-medium">Address:</p>
          {isEdit ? (
            <>
              {["line1", "line2", "city", "state", "zip"].map((field) => (
                <input
                  key={field}
                  placeholder={field}
                  value={userData.address[field]}
                  className="bg-gray-50"
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      address: { ...prev.address, [field]: e.target.value },
                    }))
                  }
                />
              ))}
            </>
          ) : (
            <p>
              {userData.address.line1}
              <br />
              {userData.address.line2}
              <br />
              {userData.address.city}, {userData.address.state}{" "}
              {userData.address.zip}
            </p>
          )}
        </div>
      </div>

      {/* Basic Info */}
      <div>
        <p className="mt-3 underline text-neutral-500">BASIC INFORMATION</p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
          <p className="font-medium">Gender:</p>
          {isEdit ? (
            <select
              value={userData.gender}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, gender: e.target.value }))
              }
              className="bg-gray-100 max-w-20"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          ) : (
            <p>{userData.gender}</p>
          )}

          <p className="font-medium">Birthday:</p>
          {isEdit ? (
            <input
              type="date"
              value={userData.dob}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, dob: e.target.value }))
              }
            />
          ) : (
            <p>{userData.dob}</p>
          )}
        </div>
      </div>

      {/* Student Info */}
      <div>
        <p className="mt-6 underline text-neutral-500">STUDENT INFORMATION</p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
          <p className="font-medium">Branch:</p>
          {isEdit ? (
            <input
              value={userData.branch}
              className="bg-gray-50"
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, branch: e.target.value }))
              }
            />
          ) : (
            <p>{userData.branch}</p>
          )}

          <p className="font-medium">Semester:</p>
          {isEdit ? (
            <input
              value={userData.semester}
              className="bg-gray-50"
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, semester: e.target.value }))
              }
            />
          ) : (
            <p>{userData.semester}</p>
          )}

          <p className="font-medium">Resume URL:</p>
          {isEdit ? (
            <input
              value={userData.resumeUrl}
              className="bg-gray-50"
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, resumeUrl: e.target.value }))
              }
            />
          ) : (
            <a
              href={userData.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 underline"
            >
              {userData.resumeUrl}
            </a>
          )}
        </div>
      </div>

      {/* Arrays */}
      <div>
        <p className="mt-6 underline text-neutral-500">SKILLS & MORE</p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
          {[
            "skills",
            "languages",
            "certifications",
            "projects",
            "achievements",
            "codingTracks",
          ].map((key) => (
            <React.Fragment key={key}>
              <p className="font-medium">
                {key.charAt(0).toUpperCase() + key.slice(1)}:
              </p>
              {isEdit ? (
                <input
                  value={userData[key].join(", ")}
                  className="bg-gray-50"
                  onChange={(e) => handleArrayInput(key, e.target.value)}
                />
              ) : (
                <p>{userData[key].join(", ") || "None"}</p>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Action Button */}
      <div className="mt-10">
        {isEdit ? (
          <button
            onClick={updateUserProfileData}
            className="px-6 py-2 border rounded-full hover:bg-blue-600 hover:text-white"
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => setIsEdit(true)}
            className="px-6 py-2 border rounded-full hover:bg-blue-600 hover:text-white"
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
