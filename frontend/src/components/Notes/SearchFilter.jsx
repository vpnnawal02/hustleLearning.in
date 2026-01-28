import { useState } from 'react';
import { notesData } from '../../data/notesData';

export default function SearchFilter({ searchQuery, setSearchQuery, selectedClass, setSelectedClass, notesData: data }) {
    const [filterClass, setFilterClass] = useState(selectedClass || '');
    const [filterSubject, setFilterSubject] = useState('');
    const [filterChapter, setFilterChapter] = useState('');

    // Get all available classes
    const allClasses = Object.keys(data);

    // Get subjects for selected filter class
    const getFilterSubjects = () => {
        if (!filterClass) return [];
        return Object.keys(data[filterClass]);
    };

    // Get chapters for selected filter subject
    const getFilterChapters = () => {
        if (!filterClass || !filterSubject) return [];
        return data[filterClass][filterSubject] || [];
    };

    // Handle class filter change
    const handleClassChange = (e) => {
        const value = e.target.value;
        setFilterClass(value);
        setFilterSubject('');
        setFilterChapter('');
    };

    // Handle subject filter change
    const handleSubjectChange = (e) => {
        const value = e.target.value;
        setFilterSubject(value);
        setFilterChapter('');
    };

    // Handle search
    const handleSearch = () => {
        // In a real implementation, this would filter the notes
        console.log('Searching with:', {
            query: searchQuery,
            class: filterClass,
            subject: filterSubject,
            chapter: filterChapter
        });

        // Navigate directly if filters are selected
        if (filterClass && setSelectedClass) {
            setSelectedClass(filterClass);
        }
    };

    // Clear all filters
    const handleClear = () => {
        setSearchQuery('');
        setFilterClass('');
        setFilterSubject('');
        setFilterChapter('');
    };

    return (
        <div className="bg-[#1E1E1E] border border-gray-800 rounded-xl p-6 mb-6 animate-fade-in-up">

            {/* Search Input */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                    🔍 Search Notes
                </label>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by keyword, topic, or chapter name..."
                    className="w-full bg-[#121212] border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#FFC107] transition-colors"
                />
            </div>

            {/* Filters Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">

                {/* Class Filter */}
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                        Class
                    </label>
                    <select
                        value={filterClass}
                        onChange={handleClassChange}
                        className="w-full bg-[#121212] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#FFC107] transition-colors cursor-pointer"
                    >
                        <option value="">All Classes</option>
                        {allClasses.map((cls) => (
                            <option key={cls} value={cls} className="bg-[#1E1E1E]">
                                Class {cls}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Subject Filter */}
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                        Subject
                    </label>
                    <select
                        value={filterSubject}
                        onChange={handleSubjectChange}
                        disabled={!filterClass}
                        className="w-full bg-[#121212] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#FFC107] transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <option value="">All Subjects</option>
                        {getFilterSubjects().map((subject) => (
                            <option key={subject} value={subject} className="bg-[#1E1E1E]">
                                {subject}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Chapter Filter */}
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                        Chapter
                    </label>
                    <select
                        value={filterChapter}
                        onChange={(e) => setFilterChapter(e.target.value)}
                        disabled={!filterSubject}
                        className="w-full bg-[#121212] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#FFC107] transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <option value="">All Chapters</option>
                        {getFilterChapters().map((chapter) => (
                            <option key={chapter.id} value={chapter.id} className="bg-[#1E1E1E]">
                                {chapter.id}. {chapter.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
                <button
                    onClick={handleSearch}
                    className="flex-1 bg-[#FFC107] text-[#121212] font-semibold py-3 rounded-lg hover:bg-[#FFD54F] transition-all flex items-center justify-center gap-2"
                >
                    <span>🔍</span>
                    Search Notes
                </button>

                <button
                    onClick={handleClear}
                    className="sm:w-auto px-6 bg-[#121212] border border-gray-700 text-gray-300 py-3 rounded-lg hover:border-[#FFC107] hover:text-[#FFC107] transition-all"
                >
                    Clear Filters
                </button>
            </div>

            {/* Active Filters Display */}
            {(filterClass || filterSubject || filterChapter || searchQuery) && (
                <div className="mt-4 pt-4 border-t border-gray-800">
                    <div className="flex flex-wrap items-center gap-2">
                        <span className="text-sm text-gray-400">Active Filters:</span>

                        {searchQuery && (
                            <span className="bg-[#FFC107]/10 text-[#FFC107] px-3 py-1 rounded-full text-sm flex items-center gap-1">
                                "{searchQuery}"
                                <button onClick={() => setSearchQuery('')} className="hover:text-[#FFD54F]">×</button>
                            </span>
                        )}

                        {filterClass && (
                            <span className="bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                                Class {filterClass}
                                <button onClick={() => { setFilterClass(''); setFilterSubject(''); setFilterChapter(''); }} className="hover:text-blue-300">×</button>
                            </span>
                        )}

                        {filterSubject && (
                            <span className="bg-green-500/10 text-green-400 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                                {filterSubject}
                                <button onClick={() => { setFilterSubject(''); setFilterChapter(''); }} className="hover:text-green-300">×</button>
                            </span>
                        )}

                        {filterChapter && (
                            <span className="bg-purple-500/10 text-purple-400 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                                Chapter {filterChapter}
                                <button onClick={() => setFilterChapter('')} className="hover:text-purple-300">×</button>
                            </span>
                        )}
                    </div>
                </div>
            )}

            {/* Quick Search Tips */}
            <div className="mt-4 bg-[#121212] rounded-lg p-3">
                <div className="flex items-start gap-2 text-xs text-gray-400">
                    <span>💡</span>
                    <div>
                        <span className="font-semibold text-gray-300">Pro Tips: </span>
                        Use search for quick keyword lookup, or select filters for precise navigation.
                        Combine both for best results!
                    </div>
                </div>
            </div>
        </div>
    );
}
