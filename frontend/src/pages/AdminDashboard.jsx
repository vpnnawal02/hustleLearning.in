import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../components/contexts/AdminContext';
import { adminAPI } from '../components/services/api';

export default function AdminDashboard() {
    const { isAdminLoggedIn, adminToken, admin, adminLogout } = useAdmin();
    const navigate = useNavigate();

    const [users, setUsers] = useState([]);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Filters
    const [selectedClass, setSelectedClass] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        if (!isAdminLoggedIn) {
            navigate('/admin/login');
        } else {
            fetchData();
        }
    }, [isAdminLoggedIn]);

    const fetchData = async () => {
        setLoading(true);
        setError('');

        try {
            const [usersResult, statsResult] = await Promise.all([
                adminAPI.getUsers(adminToken, {
                    student_class: selectedClass,
                    start_date: startDate,
                    end_date: endDate,
                    search: searchTerm
                }),
                adminAPI.getStats(adminToken)
            ]);

            if (usersResult.success) {
                setUsers(usersResult.users);
            }

            if (statsResult.success) {
                setStats(statsResult.stats);
            }
        } catch (err) {
            setError('Failed to fetch data');
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange = () => {
        fetchData();
    };

    const handleLogout = () => {
        adminLogout();
        navigate('/admin/login');
    };

    const exportCSV = () => {
        const csvContent = [
            ['Name', 'Phone', 'Class', 'Created At', 'Last Login'].join(','),
            ...users.map(user => [
                user.name,
                user.phone_number,
                user.student_class,
                new Date(user.created_at).toLocaleDateString(),
                user.last_login ? new Date(user.last_login).toLocaleDateString() : 'Never'
            ].join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `users_${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
    };

    if (loading && !stats) {
        return (
            <div className="min-h-screen bg-[#121212] flex items-center justify-center">
                <div className="text-white text-xl">Loading...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#121212]">

            {/* Header */}
            <div className="bg-[#1E1E1E] border-b border-gray-800">
                <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
                        <p className="text-gray-400 text-sm">Welcome, {admin?.username}</p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all"
                    >
                        Logout
                    </button>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-8">

                {/* Stats Cards */}
                {stats && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <div className="bg-[#1E1E1E] border border-gray-800 rounded-xl p-6">
                            <div className="text-4xl mb-2">👥</div>
                            <div className="text-3xl font-bold text-white">{stats.total_users}</div>
                            <div className="text-gray-400 text-sm">Total Users</div>
                        </div>

                        <div className="bg-[#1E1E1E] border border-gray-800 rounded-xl p-6">
                            <div className="text-4xl mb-2">📈</div>
                            <div className="text-3xl font-bold text-[#FFC107]">{stats.recent_signups}</div>
                            <div className="text-gray-400 text-sm">New (Last 7 Days)</div>
                        </div>

                        <div className="bg-[#1E1E1E] border border-gray-800 rounded-xl p-6">
                            <div className="text-4xl mb-2">📥</div>
                            <div className="text-3xl font-bold text-green-400">{stats.total_downloads}</div>
                            <div className="text-gray-400 text-sm">Total Downloads</div>
                        </div>

                        <div className="bg-[#1E1E1E] border border-gray-800 rounded-xl p-6">
                            <div className="text-4xl mb-2">🎓</div>
                            <div className="text-3xl font-bold text-blue-400">
                                {Object.values(stats.users_by_class).reduce((a, b) => a + b, 0)}
                            </div>
                            <div className="text-gray-400 text-sm">Classes 6-12</div>
                        </div>
                    </div>
                )}

                {/* Filters */}
                <div className="bg-[#1E1E1E] border border-gray-800 rounded-xl p-6 mb-6">
                    <h2 className="text-xl font-bold text-white mb-4">Filters</h2>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {/* Search */}
                        <input
                            type="text"
                            placeholder="Search name or phone..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="px-4 py-2 bg-[#121212] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#FFC107]"
                        />

                        {/* Class Filter */}
                        <select
                            value={selectedClass}
                            onChange={(e) => setSelectedClass(e.target.value)}
                            className="px-4 py-2 bg-[#121212] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-[#FFC107]"
                        >
                            <option value="">All Classes</option>
                            {[6, 7, 8, 9, 10, 11, 12].map(cls => (
                                <option key={cls} value={cls}>Class {cls}</option>
                            ))}
                        </select>

                        {/* Start Date */}
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="px-4 py-2 bg-[#121212] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-[#FFC107]"
                        />

                        {/* End Date */}
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="px-4 py-2 bg-[#121212] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-[#FFC107]"
                        />
                    </div>

                    <div className="flex gap-3 mt-4">
                        <button
                            onClick={handleFilterChange}
                            className="bg-[#FFC107] text-[#121212] px-6 py-2 rounded-lg font-semibold hover:bg-[#FFD54F] transition-all"
                        >
                            Apply Filters
                        </button>
                        <button
                            onClick={() => {
                                setSelectedClass('');
                                setStartDate('');
                                setEndDate('');
                                setSearchTerm('');
                                setTimeout(fetchData, 100);
                            }}
                            className="bg-gray-700 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-all"
                        >
                            Reset
                        </button>
                        <button
                            onClick={exportCSV}
                            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-all ml-auto"
                        >
                            📊 Export CSV
                        </button>
                    </div>
                </div>

                {/* Users Table */}
                <div className="bg-[#1E1E1E] border border-gray-800 rounded-xl overflow-hidden">
                    <div className="p-6 border-b border-gray-800">
                        <h2 className="text-xl font-bold text-white">
                            All Users ({users.length})
                        </h2>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-[#121212]">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Phone</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Class</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Created At</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Last Login</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-800">
                                {users.map((user) => (
                                    <tr key={user.id} className="hover:bg-[#121212] transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="w-10 h-10 bg-[#FFC107] rounded-full flex items-center justify-center text-black font-bold mr-3">
                                                    {user.name?.charAt(0).toUpperCase()}
                                                </div>
                                                <div className="text-white font-medium">{user.name}</div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                                            +91 {user.phone_number}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="px-3 py-1 bg-[#FFC107]/10 text-[#FFC107] rounded-full text-sm font-semibold">
                                                Class {user.student_class}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-400 text-sm">
                                            {new Date(user.created_at).toLocaleDateString('en-IN')}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-400 text-sm">
                                            {user.last_login ? new Date(user.last_login).toLocaleDateString('en-IN') : 'Never'}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {users.length === 0 && (
                        <div className="text-center py-12 text-gray-400">
                            No users found matching the filters
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
