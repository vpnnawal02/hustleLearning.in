import React from 'react';

export default function FeaturesSection() {
    const features = [
        {
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36"
                fill="currentColor" viewBox="0 0 24 24" >
                <path d="M9 3h2v18H9zm11.71 17.23-3.8-8.15-3.81-8.16-.9.42-.91.43 3.8 8.15 3.81 8.16.9-.42zM6 3h2v18H6zM3 3h2v18H3z"></path>
            </svg>,

            title: "Comprehensive Notes",
            description: "Detailed chapter-wise notes covering all subjects for Class 6-12. Download and study offline anytime.",
            highlights: ["Subject-wise organized", "Easy to understand", "PDF downloads"]
        },
        {
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36"
                fill="currentColor" viewBox="0 0 24 24" >
                <path d="M14.71 2.29A1 1 0 0 0 14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8c0-.27-.11-.52-.29-.71zM7 7h4v2H7zm10 10H7v-2h10zm0-4H7v-2h10zm-4-4V3.5L18.5 9z"></path>
            </svg>,
            title: "Practice Tests",
            description: "Test your knowledge with curated question papers and mock tests designed for exam success.",
            highlights: ["Chapter-wise tests", "Previous year papers", "Instant access"]
        },
        {
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36"
                fill="currentColor" viewBox="0 0 24 24" >
                <path d="M20 2H6C4.35 2 3 3.35 3 5v14c0 1.65 1.35 3 3 3h15v-2H6c-.55 0-1-.45-1-1s.45-1 1-1h14c.55 0 1-.45 1-1V3c0-.55-.45-1-1-1"></path>
            </svg>,
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
                            className="bg-[#1E1E1E] border border-gray-800 rounded-xs p-8 hover:border-[#FFC107]/50 transition-all duration-300 hover:transform hover:scale-105 animate-fade-in-up"
                            style={{ animationDelay: `${index * 200}ms` }}
                        >
                            {/* Icon */}
                            <div className="w-16 h-16 bg-[#FFC107]/10 rounded-xs flex items-center justify-center mb-6">
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
                    <div className="text-center p-6 bg-[#1E1E1E] rounded-xs border border-gray-800">
                        <div className="text-3xl font-bold text-[#FFC107] mb-2">7</div>
                        <div className="text-gray-400 text-sm">Classes Covered</div>
                    </div>
                    <div className="text-center p-6 bg-[#1E1E1E] rounded-xs border border-gray-800">
                        <div className="text-3xl font-bold text-[#FFC107] mb-2">15+</div>
                        <div className="text-gray-400 text-sm">Subjects</div>
                    </div>
                    <div className="text-center p-6 bg-[#1E1E1E] rounded-xs border border-gray-800">
                        <div className="text-3xl font-bold text-[#FFC107] mb-2">1000+</div>
                        <div className="text-gray-400 text-sm">Study Materials</div>
                    </div>
                    <div className="text-center p-6 bg-[#1E1E1E] rounded-xs border border-gray-800">
                        <div className="text-3xl font-bold text-[#FFC107] mb-2">24/7</div>
                        <div className="text-gray-400 text-sm">Access Anytime</div>
                    </div>
                </div>
            </div>
        </section>
    );
}
