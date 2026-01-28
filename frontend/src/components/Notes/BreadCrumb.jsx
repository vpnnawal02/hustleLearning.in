export default function Breadcrumb({ selectedClass, selectedSubject, selectedChapter, onReset }) {
    return (
        <div className="bg-[#1E1E1E] border border-gray-800 rounded-lg px-4 py-3 flex items-center gap-2 text-sm mb-6 overflow-x-auto">
            {/* Home */}
            <button
                onClick={onReset}
                className="text-gray-400 hover:text-[#FFC107] transition-colors flex-shrink-0"
            >
                🏠 Notes
            </button>

            {/* Class */}
            {selectedClass && (
                <>
                    <span className="text-gray-600">/</span>
                    <span className="text-[#FFC107] font-semibold flex-shrink-0">
                        Class {selectedClass}
                    </span>
                </>
            )}

            {/* Subject */}
            {selectedSubject && (
                <>
                    <span className="text-gray-600">/</span>
                    <span className="text-white font-semibold flex-shrink-0">
                        {selectedSubject}
                    </span>
                </>
            )}

            {/* Chapter */}
            {selectedChapter && (
                <>
                    <span className="text-gray-600">/</span>
                    <span className="text-gray-300 flex-shrink-0 truncate max-w-xs">
                        {selectedChapter.name}
                    </span>
                </>
            )}

            {/* Reset Button */}
            {selectedClass && (
                <button
                    onClick={onReset}
                    className="ml-auto text-gray-400 hover:text-red-400 transition-colors flex items-center gap-1 flex-shrink-0"
                    title="Start Over"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            )}
        </div>
    );
}
