import React from 'react';
export default function SubjectSelection({ subjects, classNum, onSelectSubject }) {
    // Subject icons and colors
    const subjectConfig = {
        "Mathematics": { icon: "🔢", color: "from-blue-500/20 to-blue-600/20", emoji: "📐" },
        "Science": { icon: "🔬", color: "from-green-500/20 to-green-600/20", emoji: "⚗️" },
        "Physics": { icon: "⚛️", color: "from-purple-500/20 to-purple-600/20", emoji: "🌌" },
        "Chemistry": { icon: "🧪", color: "from-pink-500/20 to-pink-600/20", emoji: "⚗️" },
        "Biology": { icon: "🧬", color: "from-green-500/20 to-green-600/20", emoji: "🦠" },
        "English": { icon: "📖", color: "from-yellow-500/20 to-yellow-600/20", emoji: "✍️" },
        "Social Science": { icon: "🌍", color: "from-orange-500/20 to-orange-600/20", emoji: "🗺️" }
    };

    return (
        <div className="animate-fade-in-up">
            <h2 className="text-2xl font-bold text-white mb-2">
                Select Subject for Class {classNum}
            </h2>
            <p className="text-gray-400 mb-6">Choose a subject to explore chapters and notes</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {subjects.map((subject) => {
                    const config = subjectConfig[subject] || {
                        icon: "📚",
                        color: "from-gray-500/20 to-gray-600/20",
                        emoji: "📝"
                    };

                    return (
                        <button
                            key={subject}
                            onClick={() => onSelectSubject(subject)}
                            className={`bg-gradient-to-br ${config.color} bg-[#1E1E1E] border-2 border-gray-800 rounded-xl p-6 hover:border-[#FFC107] hover:scale-105 transition-all duration-300 group text-left`}
                        >
                            {/* Icon */}
                            <div className="flex items-center justify-between mb-4">
                                <div className="text-5xl">{config.icon}</div>
                                <div className="text-2xl opacity-50 group-hover:opacity-100 transition-opacity">
                                    {config.emoji}
                                </div>
                            </div>

                            {/* Subject Name */}
                            <h3 className="text-xl font-bold text-white mb-2">{subject}</h3>

                            {/* Description */}
                            <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                                Access all chapters and notes
                            </p>

                            {/* Arrow */}
                            <div className="mt-4 text-[#FFC107] opacity-0 group-hover:opacity-100 transition-opacity text-sm font-semibold">
                                View Chapters →
                            </div>
                        </button>
                    );
                })}
            </div>

            {/* Info Card */}
            <div className="mt-8 bg-[#1E1E1E] border border-gray-800 rounded-xl p-4 flex items-start gap-3">
                <span className="text-2xl">💡</span>
                <div>
                    <h4 className="text-white font-semibold mb-1">Quick Tip</h4>
                    <p className="text-gray-400 text-sm">
                        All subjects follow the latest NCERT curriculum. You can download notes for offline study after logging in.
                    </p>
                </div>
            </div>
        </div>
    );
}
