import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function NotesList({ notes, chapter }) {
    const navigate = useNavigate();
    const isLoggedIn = false; // Replace with actual auth check

    const handleViewNote = (note) => {
        // Navigate to notes view page
        navigate(`/notes/view/${note.id}`);
    };

    const handleDownload = (note) => {
        if (!isLoggedIn) {
            alert('Please login to download notes');
            window.location.href = '/login';
            return;
        }

        console.log('Downloading:', note.title);
        // Download logic here
    };

    if (notes.length === 0) {
        return (
            <div className="animate-fade-in-up">
                <h2 className="text-2xl font-bold text-white mb-6">
                    {chapter.name}
                </h2>

                <div className="bg-[#1E1E1E] border border-gray-800 rounded-xl p-12 text-center">
                    <div className="text-6xl mb-4">📭</div>
                    <h3 className="text-xl font-semibold text-white mb-2">No Notes Available Yet</h3>
                    <p className="text-gray-400">
                        Notes for this chapter will be uploaded soon. Check back later!
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="animate-fade-in-up">
            <h2 className="text-2xl font-bold text-white mb-2">
                {chapter.name}
            </h2>
            <p className="text-gray-400 mb-6">
                {notes.length} note{notes.length > 1 ? 's' : ''} available
            </p>

            <div className="space-y-4">
                {notes.map((note) => (
                    <div
                        key={note.id}
                        className="bg-[#1E1E1E] border border-gray-800 rounded-xl p-6 hover:border-[#FFC107]/50 transition-all"
                    >
                        <div className="flex flex-col lg:flex-row lg:items-center gap-4">

                            <div className="flex-shrink-0">
                                <div className="w-16 h-16 bg-red-500/10 rounded-md flex items-center justify-center">
                                    <span className="text-3xl">📄</span>
                                </div>
                            </div>

                            <div className="flex-1">
                                <h3 className="text-lg font-semibold text-white mb-2">
                                    {note.title}
                                </h3>

                                {/* <div className="flex flex-wrap gap-4 text-sm">
                                    <span className="flex items-center gap-1 text-gray-400">
                                        <span>📊</span> {note.fileSize}
                                    </span>
                                    <span className="flex items-center gap-1 text-gray-400">
                                        <span>📑</span> {note.pages} pages
                                    </span>
                                    <span className="flex items-center gap-1 text-gray-400">
                                        <span>🗓️</span> {new Date(note.uploadDate).toLocaleDateString('en-IN')}
                                    </span>
                                    <span className={`flex items-center gap-1 px-2 py-1 rounded ${note.language === 'Hindi' ? 'bg-orange-500/10 text-orange-400' : 'bg-blue-500/10 text-blue-400'
                                        }`}>
                                        <span>🌐</span> {note.language}
                                    </span>
                                </div> */}
                            </div>

                            <div className="flex gap-3 flex-shrink-0">
                                {/* View Notes Button */}
                                <button
                                    onClick={() => handleViewNote(note)}
                                    className="px-4 py-2 bg-[#FFC107] text-[#121212] font-semibold rounded-md hover:bg-[#FFD54F] transition-all flex items-center gap-2"
                                >
                                    View Notes
                                </button>

                                {/* Download Button */}
                                <button
                                    onClick={() => handleDownload(note)}
                                    className="px-4 py-2 bg-[#121212] border border-gray-700 text-white rounded-md hover:border-[#FFC107] hover:text-[#FFC107] transition-all flex items-center gap-2"
                                >
                                    Download
                                </button>
                            </div>
                        </div>

                        {!isLoggedIn && (
                            <div className="mt-4 pt-4 border-t border-gray-800">
                                <div className="flex items-center gap-2 text-sm text-gray-400">
                                    <span>🔒</span>
                                    <span>
                                        <span className="text-[#FFC107] font-semibold">Login required</span> to download PDF
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className="mt-6 bg-gradient-to-r from-[#FFC107]/10 to-transparent border border-[#FFC107]/20 rounded-xl p-4">
                <div className="flex items-start gap-3">
                    <span className="text-2xl">✨</span>
                    <div>
                        <h4 className="text-white font-semibold mb-1">High-Quality Notes</h4>
                        <p className="text-gray-400 text-sm">
                            All notes are verified, well-structured, and aligned with the latest NCERT curriculum.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
