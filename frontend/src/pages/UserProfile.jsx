import React, { useState, useEffect } from 'react';
import { useAuth } from '../components/contexts/AuthContext';
import { userAPI } from '../components/services/api';
import ProfileHeader from '../components/Profile/ProfileHeader';
import StatsCard from '../components/Profile/StatsCard';
import ActivityTab from '../components/Profile/ActivityTab';
import SettingsTab from '../components/Profile/SettingsTab';

const UserProfile = () => {
    const { user, token, logout } = useAuth();
    const [activeTab, setActiveTab] = useState('overview');
    const [profileData, setProfileData] = useState(null);
    const [stats, setStats] = useState(null);
    const [activity, setActivity] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProfileData();
        fetchActivity();
    }, []);

    // Fix: Safe date formatting for Member Since
    const formatMemberSince = (dateString) => {
        if (!dateString) return 'N/A';

        try {
            const date = new Date(dateString);

            // Check if date is valid
            if (isNaN(date.getTime())) {
                return 'N/A';
            }

            return date.toLocaleDateString('en-IN', {
                month: 'short',
                year: 'numeric'
            });
        } catch (error) {
            console.error('Date formatting error:', error);
            return 'N/A';
        }
    };

    const fetchProfileData = async () => {
        try {
            console.log('🔍 Token:', token); // Check if token exists
            console.log('🔍 Fetching profile from API...');

            const response = await userAPI.getProfile(token);

            console.log('✅ API Response:', response);
            console.log('✅ Response data:', response.data);

            if (response.data.success) {
                setProfileData(response.data.user);
                setStats(response.data.stats);
            } else {
                console.error('❌ API returned success: false');
            }
        } catch (error) {
            console.error('❌ Full Error:', error);
            console.error('❌ Error Response:', error.response);
            console.error('❌ Error Data:', error.response?.data);
            console.error('❌ Error Status:', error.response?.status);

            // Show specific error message
            if (error.response?.status === 401) {
                alert('Session expired. Please login again.');
                logout();
            } else if (error.response?.status === 404) {
                alert('User profile not found.');
            } else {
                alert(`Failed to load profile: ${error.response?.data?.detail || error.message}`);
            }
        } finally {
            setLoading(false);
        }
    };

    const fetchActivity = async () => {
        try {
            const response = await userAPI.getActivity(token);
            if (response.data.success) {
                setActivity(response.data);
            }
        } catch (error) {
            console.error('Error fetching activity:', error);
            // Don't fail completely if activity fails
            setActivity({ downloads: [], bookmarks: [] });
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-yellow-500 mx-auto"></div>
                    <p className="text-gray-400 mt-4">Loading profile...</p>
                </div>
            </div>
        );
    }

    // If no profile data after loading, show error
    if (!profileData && !loading) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <div className="text-center">
                    <div className="text-6xl mb-4">😕</div>
                    <h2 className="text-2xl text-white mb-2">Failed to load profile</h2>
                    <p className="text-gray-400 mb-4">Please try again</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="bg-yellow-500 text-gray-900 px-6 py-2 rounded-lg font-semibold hover:bg-yellow-400"
                    >
                        Refresh Page
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            {/* Profile Header */}
            <ProfileHeader
                profileData={profileData}
                onRefresh={fetchProfileData}
            />

            {/* Navigation Tabs */}
            <div className="max-w-6xl mx-auto px-4 mt-8">
                <div className="border-b border-gray-700">
                    <nav className="flex space-x-8">
                        {['overview', 'activity', 'settings'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors capitalize ${activeTab === tab
                                    ? 'border-yellow-500 text-yellow-500'
                                    : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-600'
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </nav>
                </div>
            </div>

            {/* Tab Content */}
            <div className="max-w-6xl mx-auto px-4 py-8">
                {activeTab === 'overview' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <StatsCard
                            title="Notes Downloaded"
                            value={stats?.downloads || 0}
                            icon="📚"
                            color="yellow"
                        />
                        <StatsCard
                            title="Bookmarks"
                            value={stats?.bookmarks || 0}
                            icon="🔖"
                            color="blue"
                        />
                        <StatsCard
                            title="Study Streak"
                            value={`${stats?.streak || 0} days`}
                            icon="🔥"
                            color="orange"
                        />
                        <StatsCard
                            title="Member Since"
                            value={formatMemberSince(stats?.member_since)}
                            icon="📅"
                            color="green"
                        />
                    </div>
                )}

                {activeTab === 'activity' && (
                    <ActivityTab activity={activity} />
                )}

                {activeTab === 'settings' && (
                    <SettingsTab
                        profileData={profileData}
                        onUpdate={fetchProfileData}
                        onLogout={logout}
                    />
                )}
            </div>
        </div>
    );
};

export default UserProfile;
