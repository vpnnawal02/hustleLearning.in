import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="bg-[#212121] border-b border-gray-800 sticky top-0 z-50 ">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">

                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2 text-2xl md:text-4xl font-bold text-yellow-400">hustle<span className="text-2xl md:text-4xl font-bold text-white">learning.in</span>
                    </Link>

                    {/* Desktop Navigation Links */}
                    <div className="hidden md:flex space-x-10">
                        <Link
                            to="/"
                            className="relative inline-block font-medium text-gray-300 transition-colors duration-300 hover:text-yellow-400 after:content-[''] after:absolute after:left-0 after:-bottom-5.25 after:h-1 after:w-full after:bg-yellow-400 after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100"
                        >
                            HOME
                        </Link>
                        <Link
                            to="/notes"
                            className="relative inline-block font-medium text-gray-300 transition-colors duration-300 hover:text-yellow-400 after:content-[''] after:absolute after:left-0 after:-bottom-5.25 after:h-1 after:w-full after:bg-yellow-400 after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100"
                        >
                            NOTES
                        </Link>
                        <Link
                            to="/tests"
                            className="relative inline-block font-medium text-gray-300 transition-colors duration-300 hover:text-yellow-400 after:content-[''] after:absolute after:left-0 after:-bottom-5.25 after:h-1 after:w-full after:bg-yellow-400 after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100"
                        >
                            TESTS
                        </Link>
                        <Link
                            to="/ncert"
                            className="relative inline-block font-medium text-gray-300 transition-colors duration-300 hover:text-yellow-400 after:content-[''] after:absolute after:left-0 after:-bottom-5.25 after:h-1 after:w-full after:bg-yellow-400 after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100"
                        >
                            NCERT SOLUTIONS
                        </Link>
                    </div>

                    {/* Login Button (Desktop) */}
                    <div className="hidden ">
                        <Link
                            to="/login"
                            className="relative inline-block font-medium text-gray-300 transition-colors duration-300 hover:text-yellow-400 after:content-[''] after:absolute after:left-0 after:-bottom-5.25 after:h-1 after:w-full after:bg-yellow-400 after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100"
                        >
                            Login
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={toggleMenu}
                        className="md:hidden text-gray-300 hover:text-primary focus:outline-none"
                    >
                        {isMenuOpen ? (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
            >
                <div className="px-4 pt-2 pb-4 space-y-3 bg-dark border-t border-gray-800">
                    <Link
                        to="/"
                        onClick={toggleMenu}
                        className="block text-gray-300 hover:text-primary hover:bg-dark-gray px-3 py-2 rounded-lg transition-all duration-300"
                    >
                        Home
                    </Link>
                    <Link
                        to="/notes"
                        onClick={toggleMenu}
                        className="block text-gray-300 hover:text-primary hover:bg-dark-gray px-3 py-2 rounded-lg transition-all duration-300"
                    >
                        Notes
                    </Link>
                    <Link
                        to="/tests"
                        onClick={toggleMenu}
                        className="block text-gray-300 hover:text-primary hover:bg-dark-gray px-3 py-2 rounded-lg transition-all duration-300"
                    >
                        Tests
                    </Link>
                    <Link
                        to="/ncert"
                        onClick={toggleMenu}
                        className="block text-gray-300 hover:text-primary hover:bg-dark-gray px-3 py-2 rounded-lg transition-all duration-300"
                    >
                        NCERT Solutions
                    </Link>
                    <Link
                        to="/login"
                        onClick={toggleMenu}
                        className="hidden bg-primary text-dark text-center px-3 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition-all duration-300"
                    >
                        Login
                    </Link>
                </div>
            </div>
        </nav>
    );
}
