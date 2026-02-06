import React, { useState } from 'react';
import { userAPI } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

const SettingsTab = ({ profileData, onUpdate, onLogout }) => {
    const { token } = useAuth();
    const [editing, setEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: profileData?.name || '',
        student_class: profileData?.student_class || 6
    });
    const [saving, setSaving] = useState(false);

    const handleSave = async () => {
        setSaving(true);
        try {
            await userAPI.updateProfile(token, formData);
            await onUpdate();
            setEditing(false);
        } catch (error) {
            console.error('Update failed:', error);
            alert('Failed to update profile');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="space-y-6">
            {/* Edit Profile */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <h3 className="text-xl font-bold text-white mb-4">Profile Information</h3>

                {editing ? (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-gray-400 mb-2">Name</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-yellow-500 focus:outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-400 mb-2">Class</label>
                            <select
                                value={formData.student_class}
                                onChange={(e) => setFormData({ ...formData, student_class: parseInt(e.target.value) })}
                                className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-yellow-500 focus:outline-none"
                            >
                                {[6, 7, 8, 9, 10, 11, 12].map(cls => (
                                    <option key={cls} value={cls}>Class {cls}</option>
                                ))}
                            </select>
                        </div>

                        <div className="flex space-x-4">
                            <button
                                onClick={handleSave}
                                disabled={saving}
                                className="bg-yellow-500 text-gray-900 px-6 py-2 rounded-lg font-semibold hover:bg-yellow-400 disabled:opacity-50 transition-colors"
                            >
                                {saving ? 'Saving...' : 'Save Changes'}
                            </button>
                            <button
                                onClick={() => setEditing(false)}
                                className="bg-gray-700 text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-600 transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-3">
                        <p className="text-gray-400">Name: <span className="text-white">{profileData?.name}</span></p>
                        <p className="text-gray-400">Phone: <span className="text-white">{profileData?.phone_number}</span></p>
                        <p className="text-gray-400">Class: <span className="text-white">{profileData?.student_class}</span></p>

                        <button
                            onClick={() => setEditing(true)}
                            className="mt-4 bg-yellow-500 text-gray-900 px-6 py-2 rounded-lg font-semibold hover:bg-yellow-400 transition-colors"
                        >
                            Edit Profile
                        </button>
                    </div>
                )}
            </div>

            {/* Logout Button */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <h3 className="text-xl font-bold text-white mb-4">Account Actions</h3>
                <button
                    onClick={onLogout}
                    className="bg-red-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-500 transition-colors"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default SettingsTab;
