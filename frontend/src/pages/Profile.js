import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify'; // Import Toastify
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS
import Sidebar from '../components/Sidebar';
import '../styles/Profile.modules.css';
import userimage from '../assets/user.webp';

const Profile = ({ user }) => {
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    profilePicture: '',
  });

  const [profilePicture, setProfilePicture] = useState(null);
  const [previewPicture, setPreviewPicture] = useState(null);

  useEffect(() => {
    // Fetch profile
    const token = localStorage.getItem('token'); // Retrieve the token from local storage
    axios
      .get('http://localhost:5000/api/profile/profile', {
        headers: {
          Authorization: `Bearer ${token}`, // Add the token to the Authorization header
        },
      })
      .then((response) => setProfile(response.data.data))
      .catch((error) => {
        console.error(error);
        toast.error('Failed to fetch profile data.');
      });
  }, []);

  // Handle input changes for text fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  // Handle file change for profile picture upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProfilePicture(file);
    setPreviewPicture(file ? URL.createObjectURL(file) : null); // Update the preview image
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('firstName', profile.firstName);
    formData.append('lastName', profile.lastName);
    formData.append('phoneNumber', profile.phoneNumber);
    if (profilePicture) {
      formData.append('profilePicture', profilePicture);
    }

    const token = localStorage.getItem('token'); // Retrieve the token

    try {
      const response = await axios.put('http://localhost:5000/api/profile/profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`, // Add the token here
        },
      });
      setProfile(response.data.data);
      toast.success('Profile updated successfully!');
    } catch (error) {
      console.error(error);
      toast.error('Failed to update profile.');
    }
  };

  return (
    <div className="profile-page">
      <Sidebar user={user} />
      <div className="profile-content">
        <h1 className="header">Personal Information</h1>
        <form className="profile-card" onSubmit={handleSubmit}>
          <div className="profile-picture-section">
            <img
              src={previewPicture || profile.profilePicture || userimage} // Use preview first, then profile picture, then fallback
              alt="Profile"
              className="profile-picture"
            />
            <div>
              <input type="file" onChange={handleFileChange} />
            </div>
          </div>

          <div className="form-section">
            <div className="row">
              <div className="field">
                <label>First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={profile.firstName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="field">
                <label>Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={profile.lastName}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="row">
              <div className="field">
                <label>Email</label>
                <input type="email" name="email" value={profile.email} disabled />
              </div>
              <div className="field">
                <label>Phone Number</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={profile.phoneNumber}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <button type="submit" className="save-button">
              Save Changes
            </button>
          </div>
        </form>
        <ToastContainer /> {/* Toastify container */}
      </div>
    </div>
  );
};

export default Profile;
