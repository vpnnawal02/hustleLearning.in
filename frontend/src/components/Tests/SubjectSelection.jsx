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

            <div className="flex flex-col gap-3 lg:gap-0 lg:w-[80%]">
                {subjects.map((subj) => {
                    const isActive = selectedSubject === subj;
                    return (
                        <button
                            key={subj}
                            onClick={() => onSelectSubject(subj)}
                            className={`relative px-4 py-3 md:py-1 border-l text-left transition-all
                ${isActive
                                    ? 'border-[#FFC107] bg-[#FFC107]/10 text-[#FFC107]'
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
