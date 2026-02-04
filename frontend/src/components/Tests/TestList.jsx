import { useNavigate } from 'react-router-dom';

export default function TestsList({ tests, chapter }) {
    const navigate = useNavigate();

    const getDifficultyColor = (difficulty) => {
        switch (difficulty) {
            case 'Easy': return 'bg-green-500/10 text-green-400 border-green-500/30';
            case 'Medium': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30';
            case 'Hard': return 'bg-red-500/10 text-red-400 border-red-500/30';
            default: return 'bg-gray-500/10 text-gray-400 border-gray-500/30';
        }
    };

    const getTypeIcon = (type) => {
        switch (type) {
            case 'MCQ': return '✓';
            case 'Subjective': return '✍️';
            case 'Mixed': return '📋';
            default: return '📝';
        }
    };

    if (!tests || tests.length === 0) {
        return (
            <div className="text-center py-12">
                <div className="text-6xl mb-4">📭</div>
                <h3 className="text-xl font-bold text-white mb-2">No Tests Available</h3>
                <p className="text-gray-400">Tests for this chapter are coming soon!</p>
            </div>
        );
    }

    return (
        <div>
            <h2 className="text-2xl font-bold text-white mb-6">
                Practice Tests - <span className="text-[#FFC107]">{chapter.name}</span>
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {tests.map((test) => (
                    <div
                        key={test.id}
                        className="bg-[#1E1E1E] border border-gray-800 rounded-xl p-6 hover:border-[#FFC107] transition-all duration-300 hover:shadow-lg hover:shadow-[#FFC107]/20"
                    >
                        {/* Header */}
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <span className="text-2xl">{getTypeIcon(test.type)}</span>
                                <span className={`px-2 py-1 rounded text-xs font-semibold border ${getDifficultyColor(test.difficulty)}`}>
                                    {test.difficulty}
                                </span>
                            </div>
                            <span className="px-3 py-1 bg-[#FFC107]/10 text-[#FFC107] rounded-full text-xs font-semibold">
                                {test.type}
                            </span>
                        </div>

                        {/* Title & Description */}
                        <h3 className="text-xl font-bold text-white mb-2">
                            {test.title}
                        </h3>
                        <p className="text-gray-400 text-sm mb-4">
                            {test.description}
                        </p>

                        {/* Meta Info */}
                        <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-4">
                            <div className="flex items-center gap-1">
                                <span>📑</span>
                                <span>{test.questions} Questions</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <span>⏱️</span>
                                <span>{test.duration}</span>
                            </div>
                        </div>

                        {/* View Test Button */}
                        <button
                            onClick={() => navigate(`/tests/view/${test.id}`)}
                            className="w-full bg-[#FFC107] text-[#121212] py-3 rounded-lg font-semibold hover:bg-[#FFD54F] transition-all flex items-center justify-center gap-2"
                        >
                            <span>View Test</span>
                            <span>→</span>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
