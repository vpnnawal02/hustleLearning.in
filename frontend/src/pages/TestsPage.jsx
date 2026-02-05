import { useState, useMemo } from 'react';
import { testsStructure, sampleTests } from '../data/testsData';
import { useNavigate } from 'react-router-dom';
import TestClassSelection from '../components/Tests/ClassSelection';
import TestSubjectSelection from '../components/Tests/SubjectSelection';

export default function TestsPage() {
    // initial selections
    const [selectedClass, setSelectedClass] = useState('9');
    const [selectedSubject, setSelectedSubject] = useState('Social Science');
    const [selectedChapter, setSelectedChapter] = useState(
        testsStructure['9']['Social Science'][0]
    );

    const navigate = useNavigate();

    const classes = Object.keys(testsStructure);

    const subjects = useMemo(() => {
        if (!selectedClass) return [];
        return Object.keys(testsStructure[selectedClass] || {});
    }, [selectedClass]);

    const chapters = useMemo(() => {
        if (!selectedClass || !selectedSubject) return [];
        return testsStructure[selectedClass]?.[selectedSubject] || [];
    }, [selectedClass, selectedSubject]);

    const testsKey =
        selectedClass && selectedSubject && selectedChapter
            ? `${selectedClass}-${selectedSubject}-${selectedChapter.id}`
            : null;

    const tests = testsKey && sampleTests[testsKey] ? sampleTests[testsKey] : [];

    const handleStartTest = (test) => {
        navigate(`/tests/view/${test.id}`);
    };

    const handleClassChange = (cls) => {
        setSelectedClass(cls);
        const firstSubject = Object.keys(testsStructure[cls])[0];
        setSelectedSubject(firstSubject);
        const firstChapter = testsStructure[cls][firstSubject][0];
        setSelectedChapter(firstChapter);
    };

    const handleSubjectChange = (subj) => {
        setSelectedSubject(subj);
        const firstChapter = testsStructure[selectedClass][subj][0];
        setSelectedChapter(firstChapter);
    };

    console.log('🔑 testsKey:', testsKey);
    console.log('🧪 tests:', tests);

    return (
        <div className="min-h-screen bg-[#121212] py-8 px-4">
            <div className="max-w-7xl mx-auto flex flex-col gap-6">
                {/* Header */}
                <div className="flex flex-col gap-2">
                    <h1 className="text-3xl font-bold text-white">Chapter Tests</h1>
                    <p className="text-gray-400 text-sm">
                        Choose class and subject, then pick a chapter to start an online-only test.
                    </p>
                </div>

                {/* Class selection */}
                <TestClassSelection
                    classes={classes}
                    selectedClass={selectedClass}
                    onSelectClass={handleClassChange}
                />

                {/* Subject selection */}
                <TestSubjectSelection
                    subjects={subjects}
                    selectedSubject={selectedSubject}
                    onSelectSubject={handleSubjectChange}
                />

                {/* Chapter dropdown */}
                <div className="mb-4">
                    <label className="text-sm text-gray-400 block mb-1">
                        Select Chapter
                    </label>
                    <select
                        value={selectedChapter?.id || ''}
                        onChange={(e) => {
                            const chapId = Number(e.target.value);
                            const chap = chapters.find((c) => c.id === chapId);
                            setSelectedChapter(chap);
                        }}
                        className="bg-[#1E1E1E] border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#FFC107]"
                    >
                        {chapters.map((ch) => (
                            <option key={ch.id} value={ch.id}>
                                {ch.id}. {ch.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Tests list */}
                <div className="mt-2">
                    <h2 className="text-xl font-semibold text-white mb-3">
                        Available Tests
                    </h2>

                    {tests.length === 0 ? (
                        <div className="bg-[#1E1E1E] border border-gray-800 rounded-xl p-8 text-center">
                            <div className="text-5xl mb-3">📭</div>
                            <h3 className="text-lg font-semibold text-white mb-1">
                                No Tests Available Yet
                            </h3>
                            <p className="text-gray-400 text-sm">
                                Tests for this chapter will be added soon.
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {tests.map((test) => (
                                <div
                                    key={test.id}
                                    className="bg-[#1E1E1E] border border-gray-800 rounded-xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4"
                                >
                                    <div className="flex flex-col gap-1">
                                        <h3 className="text-lg font-semibold text-white">
                                            {test.title}
                                        </h3>
                                        {/* <div className="flex flex-wrap gap-3 text-xs sm:text-sm text-gray-400">
                                            <span>🧮 {test.questionsCount} questions</span>
                                            <span>⏱️ {test.duration}</span>
                                            <span>🎯 Difficulty: {test.difficulty}</span>
                                            <span>🌐 Mode: Online only</span>
                                        </div> */}
                                    </div>

                                    <button
                                        onClick={() => handleStartTest(test)}
                                        className="px-4 py-2 bg-[#FFC107] text-[#121212] font-semibold rounded-lg hover:bg-[#FFD54F] transition-all text-sm"
                                    >
                                        Start Test
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Info banner */}
                <div className="bg-gradient-to-r from-[#FFC107]/10 to-transparent border border-[#FFC107]/20 rounded-xl p-4 text-sm text-gray-300">
                    🔐 Tests are accessible online only. Download or PDF export is not
                    available in Phase 1 to keep the focus on active practice.
                </div>
            </div>
        </div>
    );
}
