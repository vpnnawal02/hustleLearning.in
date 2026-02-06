import React, { useState } from 'react';
import { userAPI } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import ImageUpload from './ImageUpload';

const ProfileHeader = ({ profileData, onRefresh }) => {
    const { token } = useAuth();
    const [showUpload, setShowUpload] = useState(false);

    const getInitials = (name) => {
        if (!name) return 'U';
        return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    };

    // Fix: Safe date formatting function
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';

        try {
            const date = new Date(dateString);

            // Check if date is valid
            if (isNaN(date.getTime())) {
                return 'N/A';
            }

            return date.toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
            });
        } catch (error) {
            console.error('Date formatting error:', error);
            return 'N/A';
        }
    };

    const handleImageUpload = async (file) => {
        try {
            await userAPI.uploadProfilePicture(token, file);
            onRefresh();
            setShowUpload(false);
        } catch (error) {
            console.error('Upload failed:', error);
            alert('Failed to upload image');
        }
    };

    return (
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 border-b border-gray-700">
            <div className="max-w-6xl mx-auto px-4 py-12">
                <div className="flex items-center space-x-6">

                    {/* Profile Picture */}
                    <div className="relative group">
                        {profileData?.profile_picture ? (
                            <img
                                src={profileData.profile_picture}
                                alt="Profile"
                                className="w-32 h-32 rounded-full object-cover border-4 border-yellow-500"
                            />
                        ) : (
                            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-yellow-500 to-yellow-600 flex items-center justify-center font-bold text-gray-900 border-4 border-yellow-500 text-6xl">
                                {getInitials(profileData?.name)}
                            </div>
                        )}

                        {/* Upload Overlay */}
                        <button
                            onClick={() => setShowUpload(true)}
                            className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <span className="text-white text-sm font-medium">Change Photo</span>
                        </button>
                    </div>

                    {/* Profile Info */}
                    <div className="flex-1">
                        <h1 className="text-3xl font-bold text-white">
                            {profileData?.name || 'User'}
                        </h1>

                        {/* Phone Number */}
                        {profileData?.phone_number && (
                            <p className="text-gray-400 mt-1 flex items-center">
                                {profileData.phone_number}
                            </p>
                        )}

                        {/* Class and Last Login */}
                        <div className="flex items-center space-x-4 mt-3">
                            {profileData?.student_class && (
                                <span className="px-3 py-1 bg-yellow-500 bg-opacity-20 text-black rounded-full text-sm font-semibold">
                                    Class {profileData.student_class}
                                </span>
                            )}
                            <span className="text-gray-400 text-sm">
                                Last login: {formatDate(profileData?.last_login)}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Image Upload Modal */}
            {showUpload && (
                <ImageUpload
                    onUpload={handleImageUpload}
                    onClose={() => setShowUpload(false)}
                />
            )}
        </div>
    );
};

export default ProfileHeader;
