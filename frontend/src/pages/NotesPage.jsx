import { useState, useEffect } from 'react';
import { notesData, sampleNotes } from '../data/notesData';
import ClassSelection from '../components/Notes/ClassSelection';
import SubjectSelection from '../components/Notes/SubjectSelection';
import ChapterList from '../components/Notes/ChapterList';
import NotesList from '../components/Notes/NotesList';
import Breadcrumb from '../components/Notes/Breadcrumb';
import SearchFilter from '../components/Notes/SearchFilter';

export default function NotesPage() {
    const [step, setStep] = useState(1); // 1: Class, 2: Subject, 3: Chapter, 4: Notes
    const [selectedClass, setSelectedClass] = useState(null);
    const [selectedSubject, setSelectedSubject] = useState(null);
    const [selectedChapter, setSelectedChapter] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [showSearch, setShowSearch] = useState(false);

    // Get available subjects for selected class
    const getSubjects = () => {
        if (!selectedClass) return [];
        return Object.keys(notesData[selectedClass]);
    };

    // Get chapters for selected subject
    const getChapters = () => {
        if (!selectedClass || !selectedSubject) return [];
        return notesData[selectedClass][selectedSubject] || [];
    };

    // Get notes for selected chapter
    const getNotes = () => {
        const key = `${selectedClass}-${selectedSubject}-${selectedChapter?.id}`;
        return sampleNotes[key] || [];
    };

    // Handle class selection
    const handleClassSelect = (classNum) => {
        setSelectedClass(classNum);
        setStep(2);
    };

    // Handle subject selection
    const handleSubjectSelect = (subject) => {
        setSelectedSubject(subject);
        setStep(3);
    };

    // Handle chapter selection
    const handleChapterSelect = (chapter) => {
        setSelectedChapter(chapter);
        setStep(4);
    };

    // Handle back navigation
    const handleBack = () => {
        if (step === 4) {
            setSelectedChapter(null);
            setStep(3);
        } else if (step === 3) {
            setSelectedSubject(null);
            setStep(2);
        } else if (step === 2) {
            setSelectedClass(null);
            setStep(1);
        }
    };

    // Reset all selections
    const handleReset = () => {
        setSelectedClass(null);
        setSelectedSubject(null);
        setSelectedChapter(null);
        setStep(1);
    };

    return (
        <div className="min-h-screen bg-[#121212] py-8 px-4">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="mb-8">
                    <div className="flex justify-between items-center mb-4">
                        <div>
                            <h1 className="text-4xl font-bold text-white mb-2">
                                📚 Study <span className="text-[#FFC107]">Notes</span>
                            </h1>
                            <p className="text-gray-400">Access comprehensive notes for your class</p>
                        </div>

                        {/* Search Toggle */}
                        <button
                            onClick={() => setShowSearch(!showSearch)}
                            className="bg-[#1E1E1E] border border-gray-800 text-white px-4 py-2 rounded-lg hover:border-[#FFC107] transition-all"
                        >
                            🔍 {showSearch ? 'Hide Search' : 'Search'}
                        </button>
                    </div>

                    {/* Search & Filter Component */}
                    {showSearch && (
                        <SearchFilter
                            searchQuery={searchQuery}
                            setSearchQuery={setSearchQuery}
                            selectedClass={selectedClass}
                            setSelectedClass={setSelectedClass}
                            notesData={notesData}
                        />
                    )}

                    {/* Breadcrumb */}
                    {step > 1 && (
                        <Breadcrumb
                            selectedClass={selectedClass}
                            selectedSubject={selectedSubject}
                            selectedChapter={selectedChapter}
                            onReset={handleReset}
                        />
                    )}
                </div>

                {/* Main Content */}
                <div className="flex gap-6">

                    {/* Sidebar - Context Panel */}
                    {step > 1 && (
                        <div className="hidden lg:block w-64 flex-shrink-0">
                            <div className="bg-[#1E1E1E] border border-gray-800 rounded-xl p-6 sticky top-8">
                                <h3 className="text-white font-semibold mb-4">Your Selection</h3>

                                <div className="space-y-4">
                                    {selectedClass && (
                                        <div>
                                            <div className="text-xs text-gray-400 mb-1">Class</div>
                                            <div className="text-[#FFC107] font-semibold">Class {selectedClass}</div>
                                        </div>
                                    )}

                                    {selectedSubject && (
                                        <div>
                                            <div className="text-xs text-gray-400 mb-1">Subject</div>
                                            <div className="text-white font-semibold">{selectedSubject}</div>
                                        </div>
                                    )}

                                    {selectedChapter && (
                                        <div>
                                            <div className="text-xs text-gray-400 mb-1">Chapter</div>
                                            <div className="text-white text-sm">{selectedChapter.name}</div>
                                        </div>
                                    )}
                                </div>

                                <button
                                    onClick={handleReset}
                                    className="w-full mt-6 bg-[#121212] border border-gray-700 text-gray-300 py-2 rounded-lg hover:border-[#FFC107] hover:text-[#FFC107] transition-all text-sm"
                                >
                                    ← Start Over
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Main Content Area */}
                    <div className="flex-1">
                        {/* Back Button */}
                        {step > 1 && (
                            <button
                                onClick={handleBack}
                                className="mb-4 text-gray-400 hover:text-[#FFC107] transition-colors flex items-center gap-2"
                            >
                                <span>←</span> Back
                            </button>
                        )}

                        {/* Step 1: Class Selection */}
                        {step === 1 && (
                            <ClassSelection onSelectClass={handleClassSelect} />
                        )}

                        {/* Step 2: Subject Selection */}
                        {step === 2 && (
                            <SubjectSelection
                                subjects={getSubjects()}
                                classNum={selectedClass}
                                onSelectSubject={handleSubjectSelect}
                            />
                        )}

                        {/* Step 3: Chapter List */}
                        {step === 3 && (
                            <ChapterList
                                chapters={getChapters()}
                                subject={selectedSubject}
                                onSelectChapter={handleChapterSelect}
                            />
                        )}

                        {/* Step 4: Notes List */}
                        {step === 4 && (
                            <NotesList
                                notes={getNotes()}
                                chapter={selectedChapter}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
