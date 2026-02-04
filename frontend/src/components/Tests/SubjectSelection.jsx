export default function TestSubjectSelection({
    subjects,
    selectedSubject,
    onSelectSubject,
}) {
    if (!subjects?.length) return null;

    return (
        <div className="mb-8">
            <h2 className="text-lg font-semibold text-white mb-3">
                Select Subject
            </h2>

            <div className="flex flex-wrap gap-3">
                {subjects.map((subj) => {
                    const isActive = selectedSubject === subj;
                    return (
                        <button
                            key={subj}
                            onClick={() => onSelectSubject(subj)}
                            className={`px-4 py-2 rounded-full text-sm font-medium border transition-all
                ${isActive
                                    ? 'border-[#FFC107] bg-[#FFC107]/15 text-[#FFC107]'
                                    : 'border-gray-700 bg-[#1E1E1E] text-gray-200 hover:border-[#FFC107]/60 hover:bg-[#1E1E1E]/80'
                                }`}
                        >
                            {subj}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
