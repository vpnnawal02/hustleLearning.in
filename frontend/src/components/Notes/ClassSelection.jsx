import React from 'react';
export default function ClassSelection({ onSelectClass }) {
    const classes = [
        { num: '6', icon: '', color: 'from-blue-500/20 to-blue-600/20' },
        { num: '7', icon: '', color: 'from-green-500/20 to-green-600/20' },
        { num: '8', icon: '', color: 'from-yellow-500/20 to-yellow-600/20' },
        { num: '9', icon: '', color: 'from-red-500/20 to-red-600/20' },
        { num: '10', icon: '', color: 'from-purple-500/20 to-purple-600/20' },
        { num: '11', icon: '', color: 'from-pink-500/20 to-pink-600/20' },
        { num: '12', icon: '', color: 'from-indigo-500/20 to-indigo-600/20' },
    ];

    return (
        <div className="animate-fade-in-up">
            <h2 className="text-2xl font-bold text-white mb-6">Select Your Class</h2>

            <div className="flex flex-col gap-3">
                {classes.map((cls) => (
                    <button
                        key={cls.num}
                        onClick={() => onSelectClass(cls.num)}
                        className={`bg-gradient-to-br ${cls.color} bg-[#1E1E1E] border-2 border-gray-800 rounded-md p-8 hover:border-[#FFC107] hover:scale-105 transition-all duration-300 group`}
                    >
                        <div className="text-5xl mb-3">{cls.icon}</div>
                        <div className="text-2xl font-bold text-white mb-1">Class {cls.num}</div>
                        <div className="text-sm text-gray-400 group-hover:text-[#FFC107] transition-colors">
                            View Subjects →
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
}
