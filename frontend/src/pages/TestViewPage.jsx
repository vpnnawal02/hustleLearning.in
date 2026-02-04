import { useParams, useNavigate } from 'react-router-dom';
import { sampleTests } from '../data/testsData';
import { getTestComponent } from '../components/TestContent';

export default function TestViewPage() {
    const { testId } = useParams();
    const navigate = useNavigate();

    const findTest = () => {
        for (const key in sampleTests) {
            const t = sampleTests[key].find((test) => test.id === testId);
            if (t) return t;
        }
        return null;
    };

    const test = findTest();

    if (!test) {
        return (
            <div className="min-h-screen bg-[#121212] flex items-center justify-center">
                <div className="text-center">
                    <div className="text-6xl mb-4">❌</div>
                    <h2 className="text-2xl font-bold text-white mb-2">Test Not Found</h2>
                    <p className="text-gray-400 mb-4">Test ID: {testId}</p>
                    <button
                        onClick={() => navigate('/tests')}
                        className="bg-[#FFC107] text-[#121212] px-6 py-3 rounded-lg font-semibold hover:bg-[#FFD54F]"
                    >
                        ← Back to Tests
                    </button>
                </div>
            </div>
        );
    }

    const TestComponent = test.componentPath
        ? getTestComponent(test.componentPath)
        : null;

    return (
        <div className="min-h-screen bg-[#121212]">
            {/* Header bar */}
            <div className="bg-[#1E1E1E] border-b border-gray-800 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col lg:flex-row lg:items-center justify-between gap-3">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate(-1)}
                            className="text-gray-400 hover:text-[#FFC107] transition-colors text-sm"
                        >
                            ← Back
                        </button>
                        <div>
                            <h1 className="text-lg sm:text-xl font-bold text-white">
                                {test.title}
                            </h1>
                            <div className="flex flex-wrap gap-3 text-xs text-gray-400 mt-1">
                                <span>🧮 {test.questionsCount} questions</span>
                                <span>⏱️ {test.duration}</span>
                                <span>🎯 {test.difficulty}</span>
                                <span>🌐 Online only</span>
                            </div>
                        </div>
                    </div>

                    <div className="text-xs text-gray-400">
                        Note: Tests are practice-only. No PDF download available.
                    </div>
                </div>
            </div>

            {/* Test content */}
            {TestComponent ? (
                <TestComponent />
            ) : (
                <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center text-white">
                        <div className="text-6xl mb-4">📭</div>
                        <h2 className="text-2xl font-bold mb-2">Test Content Not Available</h2>
                        <p className="text-gray-400">
                            The test metadata exists but its JSX component has not been created yet.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
