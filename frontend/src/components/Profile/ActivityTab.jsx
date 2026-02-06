import React from 'react';

const ActivityTab = ({ activity }) => {
    if (!activity) return <div className="text-gray-400">Loading activity...</div>;

    return (
        <div className="space-y-8">
            {/* Recent Downloads */}
            <div>
                <h3 className="text-xl font-bold text-white mb-4">📥 Recent Downloads</h3>
                <div className="bg-gray-800 rounded-lg border border-gray-700">
                    {activity.downloads?.length > 0 ? (
                        activity.downloads.map((item, index) => (
                            <div
                                key={index}
                                className="p-4 border-b border-gray-700 last:border-b-0 hover:bg-gray-750 transition-colors"
                            >
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h4 className="text-white font-medium">{item.notes?.title}</h4>
                                        <p className="text-sm text-gray-400">{item.notes?.subject}</p>
                                    </div>
                                    <span className="text-sm text-gray-500">
                                        {new Date(item.downloaded_at).toLocaleDateString('en-IN')}
                                    </span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="p-8 text-center text-gray-400">No downloads yet</p>
                    )}
                </div>
            </div>

            {/* Bookmarks */}
            <div>
                <h3 className="text-xl font-bold text-white mb-4">🔖 Bookmarks</h3>
                <div className="bg-gray-800 rounded-lg border border-gray-700">
                    {activity.bookmarks?.length > 0 ? (
                        activity.bookmarks.map((item, index) => (
                            <div
                                key={index}
                                className="p-4 border-b border-gray-700 last:border-b-0 hover:bg-gray-750 transition-colors"
                            >
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h4 className="text-white font-medium">{item.notes?.title}</h4>
                                        <p className="text-sm text-gray-400">{item.notes?.subject}</p>
                                    </div>
                                    <button className="text-yellow-500 hover:text-yellow-400">
                                        View →
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="p-8 text-center text-gray-400">No bookmarks yet</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ActivityTab;
