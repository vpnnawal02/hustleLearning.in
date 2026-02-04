export default function ChapterList({ chapters, subject, onSelectChapter }) {
    return (
        <div>
            <h2 className="text-2xl font-bold text-white mb-6">
                {subject} - <span className="text-[#FFC107]">Select Chapter</span>
            </h2>

            <div className="grid grid-cols-1 gap-3">
                {chapters.map((chapter) => (
                    <button
                        key={chapter.id}
                        onClick={() => onSelectChapter(chapter)}
                        className="bg-[#1E1E1E] border border-gray-800 hover:border-[#FFC107] rounded-lg p-4 transition-all duration-300 hover:translate-x-2 group text-left"
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="text-2xl group-hover:scale-110 transition-transform">
                                    📝
                                </div>
                                <div className="text-white font-semibold group-hover:text-[#FFC107]">
                                    {chapter.name}
                                </div>
                            </div>
                            <div className="text-gray-400 group-hover:text-[#FFC107]">
                                →
                            </div>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
}
