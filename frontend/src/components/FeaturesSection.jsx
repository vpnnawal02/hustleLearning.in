export default function FeaturesSection() {
    const features = [
        {
            icon: "📚",
            title: "Comprehensive Notes",
            description: "Detailed chapter-wise notes covering all subjects for Class 6-12. Download and study offline anytime.",
            highlights: ["Subject-wise organized", "Easy to understand", "PDF downloads"]
        },
        {
            icon: "📝",
            title: "Practice Tests",
            description: "Test your knowledge with curated question papers and mock tests designed for exam success.",
            highlights: ["Chapter-wise tests", "Previous year papers", "Instant access"]
        },
        {
            icon: "📖",
            title: "NCERT Solutions",
            description: "Complete solutions to all NCERT textbook questions with detailed explanations and step-by-step answers.",
            highlights: ["100% NCERT coverage", "Detailed solutions", "Chapter-by-chapter"]
        }
    ];

    return (
        <section className="py-20 px-4 bg-[#121212]">
            <div className="max-w-7xl mx-auto">

                {/* Section Header */}
                <div className="text-center mb-16 animate-fade-in-up">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Everything You Need to <span className="text-[#FFC107]">Excel</span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Access quality study materials designed to make learning easier and more effective
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-[#1E1E1E] border border-gray-800 rounded-2xl p-8 hover:border-[#FFC107]/50 transition-all duration-300 hover:transform hover:scale-105 animate-fade-in-up"
                            style={{ animationDelay: `${index * 200}ms` }}
                        >
                            {/* Icon */}
                            <div className="w-16 h-16 bg-[#FFC107]/10 rounded-xl flex items-center justify-center mb-6">
                                <span className="text-4xl">{feature.icon}</span>
                            </div>

                            {/* Title */}
                            <h3 className="text-2xl font-bold text-white mb-4">
                                {feature.title}
                            </h3>

                            {/* Description */}
                            <p className="text-gray-400 mb-6">
                                {feature.description}
                            </p>

                            {/* Highlights */}
                            <ul className="space-y-2">
                                {feature.highlights.map((highlight, idx) => (
                                    <li key={idx} className="flex items-center text-gray-300 text-sm">
                                        <span className="text-[#FFC107] mr-2">✓</span>
                                        {highlight}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Additional Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 animate-fade-in-up delay-700">
                    <div className="text-center p-6 bg-[#1E1E1E] rounded-xl border border-gray-800">
                        <div className="text-3xl font-bold text-[#FFC107] mb-2">7</div>
                        <div className="text-gray-400 text-sm">Classes Covered</div>
                    </div>
                    <div className="text-center p-6 bg-[#1E1E1E] rounded-xl border border-gray-800">
                        <div className="text-3xl font-bold text-[#FFC107] mb-2">15+</div>
                        <div className="text-gray-400 text-sm">Subjects</div>
                    </div>
                    <div className="text-center p-6 bg-[#1E1E1E] rounded-xl border border-gray-800">
                        <div className="text-3xl font-bold text-[#FFC107] mb-2">1000+</div>
                        <div className="text-gray-400 text-sm">Study Materials</div>
                    </div>
                    <div className="text-center p-6 bg-[#1E1E1E] rounded-xl border border-gray-800">
                        <div className="text-3xl font-bold text-[#FFC107] mb-2">24/7</div>
                        <div className="text-gray-400 text-sm">Access Anytime</div>
                    </div>
                </div>
            </div>
        </section>
    );
}
