import React from "react";
import { FaSquareFacebook } from "react-icons/fa6";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-[#121212] border-t border-gray-800 pt-12 pb-8 px-4">
            <div className="max-w-7xl mx-auto">

                {/* Main Footer Content */}
                <div className="grid md:grid-cols-4 gap-8 mb-8">

                    {/* Brand Section */}
                    <div className="md:col-span-1">
                        <h3 className="text-2xl font-bold mb-3">
                            <span className="text-white">Hustle</span>
                            <span className="text-[#FFC107]">Learning</span>
                        </h3>
                        <p className="text-gray-400 text-sm mb-4">
                            Learn Smart. Hustle Hard.
                        </p>
                        <p className="text-gray-500 text-xs">
                            Making quality education accessible for Class 6-12 students.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li>
                                <a href="/" className="text-gray-400 hover:text-[#FFC107] text-sm transition-colors">
                                    Home
                                </a>
                            </li>
                            <li>
                                <a href="/notes" className="text-gray-400 hover:text-[#FFC107] text-sm transition-colors">
                                    Notes
                                </a>
                            </li>
                            <li>
                                <a href="/tests" className="text-gray-400 hover:text-[#FFC107] text-sm transition-colors">
                                    Tests
                                </a>
                            </li>
                            <li>
                                <a href="/ncert" className="text-gray-400 hover:text-[#FFC107] text-sm transition-colors">
                                    NCERT Solutions
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Resources</h4>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="text-gray-400 hover:text-[#FFC107] text-sm transition-colors">
                                    About Us
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-[#FFC107] text-sm transition-colors">
                                    Blog
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-[#FFC107] text-sm transition-colors">
                                    FAQs
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-[#FFC107] text-sm transition-colors">
                                    Contact Us
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Legal & Social */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Legal</h4>
                        <ul className="space-y-2 mb-6">
                            <li>
                                <a href="#" className="text-gray-400 hover:text-[#FFC107] text-sm transition-colors">
                                    Privacy Policy
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-[#FFC107] text-sm transition-colors">
                                    Terms of Service
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-[#FFC107] text-sm transition-colors">
                                    Refund Policy
                                </a>
                            </li>
                        </ul>

                        {/* Social Media */}
                        <h4 className="text-white font-semibold mb-3">Follow Us</h4>
                        <div className="flex gap-3">
                            <a href="#" className="w-9 h-9 bg-[#1E1E1E] border border-gray-800 rounded-lg flex items-center justify-center hover:border-[#FFC107] hover:bg-[#FFC107]/10 transition-all">
                                <span className="text-gray-400 hover:text-[#FFC107]"><FaSquareFacebook /></span>
                            </a>
                            <a href="#" className="w-9 h-9 bg-[#1E1E1E] border border-gray-800 rounded-lg flex items-center justify-center hover:border-[#FFC107] hover:bg-[#FFC107]/10 transition-all">
                                <span className="text-gray-400 hover:text-[#FFC107]"><FaSquareInstagram /></span>
                            </a>
                            <a href="#" className="w-9 h-9 bg-[#1E1E1E] border border-gray-800 rounded-lg flex items-center justify-center hover:border-[#FFC107] hover:bg-[#FFC107]/10 transition-all">
                                <span className="text-gray-400 hover:text-[#FFC107]"><FaSquareXTwitter /></span>
                            </a>
                            <a href="#" className="w-9 h-9 bg-[#1E1E1E] border border-gray-800 rounded-lg flex items-center justify-center hover:border-[#FFC107] hover:bg-[#FFC107]/10 transition-all">
                                <span className="text-gray-400 hover:text-[#FFC107]"><FaLinkedin /></span>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-500 text-sm">
                        © {currentYear} Hustle Learning. All rights reserved.
                    </p>
                    <p className="text-gray-500 text-sm">
                        Made with 💜 for Students
                    </p>
                </div>
            </div>
        </footer>
    );
}
