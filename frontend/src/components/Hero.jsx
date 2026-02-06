import React from "react";

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-linear-to-b from-dark via-dark to-dark-gray">

            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse-slow"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="grid lg:grid-cols-2 gap-12 items-center">

                    {/* Left Content */}
                    <div className="text-center lg:text-left space-y-8 animate-fade-in">

                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 bg-dark-gray border border-primary/20 rounded-full px-4 py-2 animate-fade-in-up delay-200">
                            <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
                            <span className="text-sm text-gray-300">For Class 6-12 Students</span>
                        </div>

                        {/* Main Headline */}
                        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight animate-fade-in-up delay-300">
                            <span className="text-white">Learn Smart.</span>
                            <br />
                            <span className="text-primary">Hustle Hard.</span>
                        </h1>

                        {/* Subheadline */}
                        <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto lg:mx-0 animate-fade-in-up delay-500">
                            Built for students who are ready to work hard—but want learning that actually makes sense.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in-up delay-700">
                            <a href="/login">
                                <button className="bg-primary text-dark px-8 py-4 rounded-xs font-semibold text-lg hover:bg-[#FFD54F] hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-primary/50 cursor-pointer">
                                    Start Learning
                                </button>
                            </a>
                            <a href="/notes"><button className="bg-transparent border border-primary text-primary px-8 py-4 rounded-xs font-semibold text-lg hover:bg-primary hover:text-dark transition-all duration-300 cursor-pointer">
                                Browse Notes
                            </button></a>

                        </div>

                        {/* Stats */}
                        <div className="flex flex-wrap gap-8 justify-center lg:justify-start pt-8 animate-fade-in-up delay-900">
                            <div className="text-center lg:text-left">
                                <div className="text-3xl font-bold text-primary">1000+</div>
                                <div className="text-sm text-gray-400">Study Notes</div>
                            </div>
                            <div className="text-center lg:text-left">
                                <div className="text-3xl font-bold text-primary">500+</div>
                                <div className="text-sm text-gray-400">Practice Tests</div>
                            </div>
                            <div className="text-center lg:text-left">
                                <div className="text-3xl font-bold text-primary">100%</div>
                                <div className="text-sm text-gray-400">NCERT Coverage</div>
                            </div>
                        </div>
                    </div>

                    {/* Right Illustration */}
                    <div className="relative animate-fade-in-right delay-500 hidden lg:block">
                        <div className="relative z-10">
                            {/* Placeholder for illustration */}
                            <div className="relative">
                                <div className="absolute inset-0 bg-linear-to-tr from-primary/20 to-transparent rounded-3xl blur-2xl"></div>

                                {/* SVG Illustration */}
                                <svg
                                    viewBox="0 0 500 500"
                                    className="w-full h-auto relative z-10 animate-float"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    {/* Student with laptop */}
                                    <circle cx="250" cy="180" r="60" fill="#FFC107" opacity="0.2" />
                                    <circle cx="250" cy="160" r="40" fill="#FFC107" />
                                    <rect x="200" y="200" width="100" height="120" rx="10" fill="#1E1E1E" />
                                    <rect x="210" y="210" width="80" height="60" rx="5" fill="#FFC107" opacity="0.3" />

                                    {/* Books */}
                                    <rect x="320" y="280" width="60" height="80" rx="5" fill="#FFC107" opacity="0.8" />
                                    <rect x="340" y="260" width="60" height="80" rx="5" fill="#FFC107" opacity="0.6" />
                                    <rect x="360" y="240" width="60" height="80" rx="5" fill="#FFC107" opacity="0.4" />

                                    {/* Floating elements */}
                                    <circle cx="100" cy="150" r="20" fill="#FFC107" opacity="0.3" className="animate-bounce-slow" />
                                    <circle cx="400" cy="200" r="15" fill="#FFC107" opacity="0.3" className="animate-bounce-slow delay-500" />
                                    <path d="M 380 100 L 400 80 L 420 100 L 400 120 Z" fill="#FFC107" opacity="0.4" className="animate-spin-slow" />
                                </svg>
                            </div>
                        </div>

                        {/* Floating Cards */}
                        <div className="absolute top-10 -right-5 bg-dark-gray border border-primary/30 rounded-md p-4 shadow-xl animate-float delay-300">
                            <div className="flex items-center gap-3">
                                {/* <div className="w-10 h-10 bg-primary rounded-md flex items-center justify-center">
                                    <span className="text-2xl">📚</span>
                                </div> */}
                                <div>
                                    <div className="text-xs text-gray-400">New Notes</div>
                                    <div className="text-sm font-bold text-white">Based on CBSE 2026-2027</div>
                                </div>
                            </div>
                        </div>

                        <div className="absolute bottom-20 -left-5 bg-dark-gray border border-primary/30 rounded-md p-4 shadow-xl animate-float delay-700">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-primary rounded-md flex items-center justify-center">
                                    <span className="text-2xl">✓</span>
                                </div>
                                <div>
                                    <div className="text-xs text-gray-400">Professionally crafted</div>
                                    <div className="text-sm font-bold text-white">Notes and Tests</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                <div className="text-primary">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                </div>
            </div>
        </section>
    );
}
