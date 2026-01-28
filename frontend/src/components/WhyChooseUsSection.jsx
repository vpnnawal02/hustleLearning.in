export default function WhyChooseUsSection() {
    const benefits = [
        {
            icon: "🎓",
            title: "Quality Content",
            description: "Carefully curated and verified study materials created by experienced educators"
        },
        {
            icon: "⚡",
            title: "Instant Access",
            description: "Download and access all materials instantly after login. No waiting, no hassle"
        },
        {
            icon: "📱",
            title: "Mobile Friendly",
            description: "Study on any device - phone, tablet, or computer. Learn on the go"
        },
        {
            icon: "🔒",
            title: "Safe & Secure",
            description: "Your data is protected with industry-standard security measures"
        },
        {
            icon: "🆓",
            title: "Free to Start",
            description: "Access core study materials without any subscription fees"
        },
        {
            icon: "🔄",
            title: "Regular Updates",
            description: "Content updated regularly to match latest syllabus and exam patterns"
        }
    ];

    return (
        <section className="py-20 px-4 bg-[#1E1E1E]">
            <div className="max-w-7xl mx-auto">

                {/* Section Header */}
                <div className="text-center mb-16 animate-fade-in-up">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Why <span className="text-[#FFC107]">Hustle Learning?</span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        We're committed to making quality education accessible to every student
                    </p>
                </div>

                {/* Benefits Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {benefits.map((benefit, index) => (
                        <div
                            key={index}
                            className="bg-[#121212] border border-gray-800 rounded-xl p-6 hover:border-[#FFC107]/50 transition-all duration-300 animate-fade-in-up"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            <div className="flex items-start gap-4">
                                {/* Icon */}
                                <div className="w-12 h-12 bg-[#FFC107]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <span className="text-2xl">{benefit.icon}</span>
                                </div>

                                {/* Content */}
                                <div>
                                    <h3 className="text-lg font-bold text-white mb-2">
                                        {benefit.title}
                                    </h3>
                                    <p className="text-gray-400 text-sm">
                                        {benefit.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
