export default function Breadcrumb({ selectedClass, selectedSubject, selectedChapter, onReset }) {
    return (
        <div className="flex items-center gap-2 text-sm flex-wrap">
            <button
                onClick={onReset}
                className="text-[#FFC107] hover:underline"
            >
                All Classes
            </button>

            {selectedClass && (
                <>
                    <span className="text-gray-600">/</span>
                    <span className="text-gray-300">Class {selectedClass}</span>
                </>
            )}

            {selectedSubject && (
                <>
                    <span className="text-gray-600">/</span>
                    <span className="text-gray-300">{selectedSubject}</span>
                </>
            )}

            {selectedChapter && (
                <>
                    <span className="text-gray-600">/</span>
                    <span className="text-white">{selectedChapter.name}</span>
                </>
            )}
        </div>
    );
}
