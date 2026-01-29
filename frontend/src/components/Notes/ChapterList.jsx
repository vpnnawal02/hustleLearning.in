import React from 'react';
export default function ChapterList({ chapters, subject, onSelectChapter }) {
    return (
        <div className="animate-fade-in-up">
            <h2 className="text-2xl font-bold text-white mb-2">
                {subject} - Chapters
            </h2>
            <p className="text-gray-400 mb-6">
                Select a chapter to view available notes
            </p>

            {/* Chapters List */}
            <div className="bg-[#1E1E1E] border border-gray-800 rounded-xl overflow-hidden">
                {chapters.map((chapter, index) => (
                    <button
                        key={chapter.id}
                        onClick={() => onSelectChapter(chapter)}
                        className="w-full flex items-center gap-4 p-5 border-b border-gray-800 last:border-b-0 hover:bg-[#252525] transition-all group"
                    >
                        {/* Chapter Number Badge */}
                        <div className="flex-shrink-0 w-12 h-12 bg-[#FFC107]/10 rounded-lg flex items-center justify-center group-hover:bg-[#FFC107]/20 transition-colors">
                            <span className="text-[#FFC107] font-bold text-lg">
                                {String(chapter.id).padStart(2, '0')}
                            </span>
                        </div>

                        {/* Chapter Name */}
                        <div className="flex-1 text-left">
                            <h3 className="text-white font-semibold group-hover:text-[#FFC107] transition-colors">
                                {chapter.name}
                            </h3>
                            <p className="text-gray-500 text-sm mt-1">
                                Chapter {chapter.id}
                            </p>
                        </div>

                        {/* Arrow Icon */}
                        <div className="text-gray-600 group-hover:text-[#FFC107] transition-colors">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </div>
                    </button>
                ))}
            </div>

            {/* Chapter Count Info */}
            <div className="mt-4 flex items-center justify-between text-sm">
                <span className="text-gray-400">
                    Total Chapters: <span className="text-[#FFC107] font-semibold">{chapters.length}</span>
                </span>
                <span className="text-gray-500">
                    Click any chapter to view notes
                </span>
            </div>
        </div>
    );
}
