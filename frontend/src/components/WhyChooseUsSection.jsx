import React from 'react';
export default function WhyChooseUsSection() {
    const benefits = [
        {
            title: "What is this platform about?",
            description: "We are an online learning platform designed to help students understand concepts clearly through structured courses, practical examples, and expert guidance. Our focus is on learning with clarity, not rote memorization."
        },
        {
            title: "Who can use this platform?",
            description: "Our courses are suitable for:School students, College students, Beginners in programming or technical fields and anyone looking to strengthen their fundamentals.No prior experience is required unless mentioned for a specific course."
        },
        {
            title: "Are the courses beginner-friendly?",
            description: "Yes. All our courses are designed from basic to advanced level, making them suitable even for complete beginners."
        },
        {
            title: "Do you provide doubt support?",
            description: "Yes. Students can ask doubts through: Dedicated doubt-solving sessions, comment sections under lessons and community or discussion forums"
        },
        {
            title: "Are there any free courses or trial content?",
            description: "Yes. We provide free demo lessons and selected free content so students can experience the teaching style before enrolling."
        },
        {
            title: "Can I access the courses on mobile?",
            description: "Yes. Our platform is fully responsive and works smoothly on mobile, tablet, and desktop devices."
        }
    ];

    return (
        <section className="py-20 px-4 bg-[#1E1E1E]">
            <div className="max-w-7xl mx-auto">

                {/* Section Header */}
                <div className="text-center mb-16 animate-fade-in-up">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Frequently asked  <span className="text-[#FFC107]">Questions</span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Got any questions? Maybe these will help
                    </p>
                </div>

                {/* Benefits Grid */}
                <div className="flex flex-col gap-2 w-full">
                    {benefits.map((benefit, index) => (
                        <div
                            key={index}
                            className="bg-[#121212] border border-gray-800 rounded-xs p-3 hover:border-[#FFC107]/50 transition-all duration-300 animate-fade-in-up"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            <div className="flex items-start gap-2">
                                {/* Icon */}
                                {/* <div className="w-12 h-12 bg-[#FFC107]/10 rounded-md flex items-center justify-center flex-shrink-0">
                                    <span className="text-2xl">{benefit.icon}</span>
                                </div> */}
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
