import React from 'react';

const StatsCard = ({ title, value, icon, color }) => {
    const colorClasses = {
        yellow: 'from-yellow-500 to-yellow-600',
        blue: 'from-blue-500 to-blue-600',
        orange: 'from-orange-500 to-orange-600',
        green: 'from-green-500 to-green-600',
    };

    return (
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-gray-600 transition-colors">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-gray-400 text-sm">{title}</p>
                    <p className="text-3xl font-bold text-white mt-2">{value}</p>
                </div>
                <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${colorClasses[color]} flex items-center justify-center text-3xl`}>
                    {icon}
                </div>
            </div>
        </div>
    );
};

export default StatsCard;
