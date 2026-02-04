import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { sampleNotes } from '../data/notesData';
import { getNoteComponent } from '../components/NoteContent/index';
import { useAuth } from '../components/contexts/AuthContext';
import { authAPI } from '../components/services/api';
import LoginModal from '../components/LoginModal';

export default function NotesViewPage() {
    const { noteId } = useParams();
    const navigate = useNavigate();
    const { isLoggedIn, user, token } = useAuth();
    const [showLoginModal, setShowLoginModal] = useState(false);

    // Find the note metadata
    const findNote = () => {
        for (const key in sampleNotes) {
            const note = sampleNotes[key].find(n => n.id === noteId);
            if (note) return note;
        }
        return null;
    };

    const note = findNote();

    // Debug logs
    console.log('📝 Note ID from URL:', noteId);
    console.log('📄 Found note:', note);

    if (!note) {
        return (
            <div className="min-h-screen bg-[#121212] flex items-center justify-center">
                <div className="text-center">
                    <div className="text-6xl mb-4">❌</div>
                    <h2 className="text-2xl font-bold text-white mb-4">Note Not Found</h2>
                    <p className="text-gray-400 mb-4">Note ID: {noteId}</p>
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

    // Get the component
    const NoteComponent = note.componentPath ? getNoteComponent(note.componentPath) : null;

    console.log('🎨 Component Path:', note.componentPath);
    console.log('🔧 Got Component:', NoteComponent);

    const handleDownload = async () => {
        // Check if user is logged in
        if (!isLoggedIn) {
            setShowLoginModal(true);
            return;
        }

        // User is logged in - proceed with download
        try {
            console.log('Downloading note:', note.id);
            console.log('User:', user);
            console.log('Token:', token);

            const result = await authAPI.downloadNote(note.id, token);

            if (result.success) {
                alert(`✅ Download Ready!\n\nNote: ${note.title}\nUser: ${user.name}\n\nIn production, this will download the PDF file.`);

                // In production, trigger actual download:
                // window.open(result.download_url, '_blank');
            } else {
                alert('❌ Download failed. Please try again.');
            }
        } catch (error) {
            alert('❌ Network error. Please try again.');
            console.error('Download error:', error);
        }
    };

    const handleLoginSuccess = () => {
        // After successful login, close modal and trigger download
        setShowLoginModal(false);
        setTimeout(() => {
            handleDownload();
        }, 300);
    };

    return (
        <>
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
                                        {note.fileSize && <span className="text-gray-400">📊 {note.fileSize}</span>}
                                        {note.pages && <span className="text-gray-400">📑 {note.pages} pages</span>}
                                        {note.language && (
                                            <span className={`px-2 py-0.5 rounded ${note.language === 'Hindi'
                                                ? 'bg-orange-500/10 text-orange-400'
                                                : 'bg-blue-500/10 text-blue-400'
                                                }`}>
                                                🌐 {note.language}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={handleDownload}
                                className="bg-[#FFC107] text-[#121212] px-6 py-3 rounded-lg font-semibold hover:bg-[#FFD54F] transition-all flex items-center justify-center gap-2"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                {isLoggedIn ? 'Download PDF' : 'Login to Download'}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Note Content */}
                {NoteComponent ? (
                    <NoteComponent />
                ) : (
                    <div className="min-h-screen flex items-center justify-center">
                        <div className="text-center text-white">
                            <div className="text-6xl mb-4">📭</div>
                            <h2 className="text-2xl font-bold mb-2">Content Not Available</h2>
                            <p className="text-gray-400 mb-2">This note's content hasn't been created yet.</p>
                            <p className="text-sm text-gray-500">Component Path: {note.componentPath || 'Not set'}</p>
                        </div>
                    </div>
                )}

                {/* Bottom Download CTA */}
                {NoteComponent && (
                    <div className="bg-[#121212] py-8">
                        <div className="max-w-7xl mx-auto px-4">
                            <div className="bg-gradient-to-r from-[#FFC107]/10 to-transparent border border-[#FFC107]/20 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
                                <div>
                                    <h3 className="text-white font-semibold mb-1">Found this helpful?</h3>
                                    <p className="text-gray-400 text-sm">
                                        {isLoggedIn ? "Download the PDF for offline study" : "Login to download PDF"}
                                    </p>
                                </div>
                                <button
                                    onClick={handleDownload}
                                    className="bg-[#FFC107] text-[#121212] px-6 py-3 rounded-lg font-semibold hover:bg-[#FFD54F] transition-all flex items-center gap-2"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    {isLoggedIn ? 'Download PDF' : 'Login to Download'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Login Modal */}
            {showLoginModal && (
                <LoginModal
                    isOpen={showLoginModal}
                    onClose={() => setShowLoginModal(false)}
                    onLoginSuccess={handleLoginSuccess}
                />
            )}
        </>
    );
}
