import { useParams, useNavigate } from 'react-router-dom';
import { sampleNotes } from '../data/notesData';
import { useState, useEffect } from 'react';
import NotesContent from '../components/Notes/NotesContent';
import { getNotesContent } from '../data/notesContent/index';

export default function NotesViewPage() {
    const { noteId } = useParams();
    const navigate = useNavigate();
    const [noteContent, setNoteContent] = useState(null);
    const [loading, setLoading] = useState(true);
    const isLoggedIn = false; // Replace with actual auth check

    // Find the note metadata
    const findNote = () => {
        for (const key in sampleNotes) {
            const note = sampleNotes[key].find(n => n.id === noteId);
            if (note) return note;
        }
        return null;
    };

    const note = findNote();

    // Load note content on mount
    useEffect(() => {
        if (note && note.contentPath) {
            const content = getNotesContent(note.contentPath);
            setNoteContent(content);
            setLoading(false);
        } else {
            setLoading(false);
        }
    }, [noteId, note]);

    const handleDownload = () => {
        if (!isLoggedIn) {
            alert('Please login to download notes');
            navigate('/login');
            return;
        }

        console.log('Downloading:', note.title);
        // Download logic
    };

    if (!note) {
        return (
            <div className="min-h-screen bg-[#121212] flex items-center justify-center">
                <div className="text-center">
                    <div className="text-6xl mb-4">❌</div>
                    <h2 className="text-2xl font-bold text-white mb-4">Note Not Found</h2>
                    <button
                        onClick={() => navigate('/notes')}
                        className="bg-[#FFC107] text-[#121212] px-6 py-3 rounded-lg font-semibold hover:bg-[#FFD54F]"
                    >
                        ← Back to Notes
                    </button>
                </div>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-[#121212] flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin text-6xl mb-4">⏳</div>
                    <h2 className="text-xl text-white">Loading notes...</h2>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#121212]">

            {/* Header Bar */}
            <div className="bg-[#1E1E1E] border-b border-gray-800 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">

                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => navigate(-1)}
                                className="text-gray-400 hover:text-[#FFC107] transition-colors"
                            >
                                ← Back
                            </button>

                            <div>
                                <h1 className="text-xl font-bold text-white">
                                    {note.title}
                                </h1>
                                <div className="flex flex-wrap gap-3 text-sm mt-1">
                                    <span className="text-gray-400">
                                        📊 {note.fileSize}
                                    </span>
                                    <span className="text-gray-400">
                                        📑 {note.pages} pages
                                    </span>
                                    <span className={`px-2 py-0.5 rounded ${note.language === 'Hindi' ? 'bg-orange-500/10 text-orange-400' : 'bg-blue-500/10 text-blue-400'
                                        }`}>
                                        🌐 {note.language}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={handleDownload}
                            className="bg-[#FFC107] text-[#121212] px-6 py-3 rounded-lg font-semibold hover:bg-[#FFD54F] transition-all flex items-center justify-center gap-2"
                        >
                            <span>⬇️</span>
                            Download PDF
                        </button>
                    </div>
                </div>
            </div>

            {/* Notes Content */}
            {noteContent ? (
                <NotesContent
                    title={noteContent.title}
                    sections={noteContent.sections}
                />
            ) : (
                <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center text-white">
                        <div className="text-6xl mb-4">📭</div>
                        <h2 className="text-2xl font-bold mb-2">Content Not Available</h2>
                        <p className="text-gray-400">This note's content hasn't been added yet.</p>
                    </div>
                </div>
            )}

            {/* Bottom Download CTA */}
            {noteContent && (
                <div className="bg-[#121212] py-8">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="bg-gradient-to-r from-[#FFC107]/10 to-transparent border border-[#FFC107]/20 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
                            <div>
                                <h3 className="text-white font-semibold mb-1">Found this helpful?</h3>
                                <p className="text-gray-400 text-sm">
                                    {isLoggedIn
                                        ? "Download the PDF for offline study"
                                        : "Login to download PDF for offline study"}
                                </p>
                            </div>
                            <button
                                onClick={handleDownload}
                                className="bg-[#FFC107] text-[#121212] px-6 py-3 rounded-lg font-semibold hover:bg-[#FFD54F] transition-all"
                            >
                                ⬇️ Download PDF
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
