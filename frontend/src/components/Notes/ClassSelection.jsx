import React from 'react';
export default function ClassSelection({ onSelectClass }) {
    const classes = [
        { num: '6', icon: '', color: 'transparent' },
        { num: '7', icon: '', color: 'transparent' },
        { num: '8', icon: '', color: 'transparent' },
        { num: '9', icon: '', color: 'transparent' },
        { num: '10', icon: '', color: 'transparent' },
        { num: '11', icon: '', color: 'transparent' },
        { num: '12', icon: '', color: 'transparent' },
    ];

    return (
        <div className="animate-fade-in-up flex flex-col items-center">
            <h2 className="text-2xl font-bold text-white mb-6">Select Your Class</h2>

            <div className="flex flex-col md:flex-row gap-3 w-full md:grid md:grid-cols-5">
                {classes.map((cls) => (
                    <button
                        key={cls.num}
                        onClick={() => onSelectClass(cls.num)}
                        className={`bg-gradient-to-br ${cls.color} bg-[#1E1E1E] border-2 border-gray-800 rounded-md p-1 hover:border-[#FFC107] hover:scale-105 transition-all duration-300 group md:w-35 md:h-35 lg:w-50 lg:h-50`}
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
