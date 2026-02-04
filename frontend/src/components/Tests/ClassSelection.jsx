export default function TestClassSelection({ classes, selectedClass, onSelectClass }) {
    return (
        <div className="mb-8">
            <h2 className="text-lg font-semibold text-white mb-3">
                Select Class
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {classes.map((cls) => {
                    const isActive = selectedClass === cls;
                    return (
                        <button
                            key={cls}
                            onClick={() => onSelectClass(cls)}
                            className={`relative px-4 py-3 rounded-xl border text-left transition-all
                ${isActive
                                    ? 'border-[#FFC107] bg-[#FFC107]/10 text-[#FFC107]'
                                    : 'border-gray-700 bg-[#1E1E1E] text-gray-200 hover:border-[#FFC107]/60 hover:bg-[#1E1E1E]/80'
                                }`}
                        >
                            <div className="text-xs text-gray-400">Class</div>
                            <div className="text-xl font-bold"> {cls}</div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
