import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../components/contexts/AuthContext';
import LoginModal from './LoginModal';
import { IoIosArrowDown } from "react-icons/io";
import { IoMdArrowDropright } from "react-icons/io";

export default function NavigationBar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const { isLoggedIn, user, logout } = useAuth();
    const [isMaterialOpen, setIsMaterialOpen] = useState(false);

    const materialsRef = useRef(null);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        setIsMaterialOpen(false); // Close materials when toggling main menu
    };

    const handleLoginClick = () => {
        setShowLoginModal(true);
    };

    const handleLogout = () => {
        logout();
        setIsMenuOpen(false);
    };

    const handleMaterials = () => {
        setIsMaterialOpen(!isMaterialOpen);
    };

    const handleMaterialLinkClick = () => {
        setIsMaterialOpen(false);
        setIsMenuOpen(false);
    };

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (materialsRef.current && !materialsRef.current.contains(event.target)) {
                setIsMaterialOpen(false);
            }
        };

        if (isMaterialOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isMaterialOpen]);

    return (
        <>
            <nav className="bg-[#212121] border-b border-gray-800 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">

                        {/* Logo */}
                        <Link to="/" className="flex items-center space-x-2 text-2xl md:text-4xl font-bold text-yellow-400">
                            hustle<span className="text-2xl md:text-4xl font-bold text-white">learning.in</span>
                        </Link>

                        {/* Desktop Navigation Links */}
                        <div className="hidden md:flex space-x-10">
                            <Link
                                to="/"
                                className="relative inline-block font-bold text-white transition-colors duration-300 hover:text-yellow-400 after:content-[''] after:absolute after:left-0 after:-bottom-5 after:h-1 after:w-full after:bg-yellow-400 after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100"
                            >
                                Home
                            </Link>
                            <a href="#about" className="relative inline-block font-bold text-white transition-colors duration-300 hover:text-yellow-400 after:content-[''] after:absolute after:left-0 after:-bottom-5 after:h-1 after:w-full after:bg-yellow-400 after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100">
                                About
                            </a>
                            <a href="#faqs" className="relative inline-block font-bold text-white transition-colors duration-300 hover:text-yellow-400 after:content-[''] after:absolute after:left-0 after:-bottom-5 after:h-1 after:w-full after:bg-yellow-400 after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100">
                                FAQs
                            </a>

                            {/* Desktop Materials Dropdown */}
                            <div className="relative" ref={materialsRef}>
                                <p
                                    className="relative font-bold text-white transition-colors duration-300 hover:text-yellow-400 after:content-[''] after:absolute after:left-0 after:-bottom-5 after:h-1 after:w-full after:bg-yellow-400 after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100 flex items-center gap-2 cursor-pointer"
                                    onClick={handleMaterials}
                                >
                                    Materials <IoIosArrowDown className={`font-bold transition-transform duration-300 ${isMaterialOpen ? 'rotate-180' : ''}`} />
                                </p>

                                {/* Desktop Dropdown Menu */}
                                <div className={`absolute top-full left-0 mt-5 bg-[#212121] border border-gray-800 shadow-lg py-2 min-w-[200px] transition-all duration-300 ${isMaterialOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}>
                                    <Link
                                        className='flex items-center px-4 py-2 text-white hover:bg-gray-800 hover:text-yellow-400 transition-all'
                                        to="/notes"
                                        onClick={handleMaterialLinkClick}
                                    >
                                        <IoMdArrowDropright /> Notes
                                    </Link>
                                    <Link
                                        className='flex items-center px-4 py-2 text-white hover:bg-gray-800 hover:text-yellow-400 transition-all'
                                        to="/tests"
                                        onClick={handleMaterialLinkClick}
                                    >
                                        <IoMdArrowDropright /> Tests
                                    </Link>
                                    <Link
                                        className='flex items-center px-4 py-2 text-white hover:bg-gray-800 hover:text-yellow-400 transition-all'
                                        to="/ncert-solutions"
                                        onClick={handleMaterialLinkClick}
                                    >
                                        <IoMdArrowDropright /> NCERT Solutions
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Desktop Login/Logout */}
                        <div className="hidden md:flex items-center gap-3">
                            {isLoggedIn ? (
                                <div className="flex items-center gap-2 text-gray-300 text-sm">
                                    <Link to="/profile">
                                        <span className="w-10 h-10 bg-yellow-400 text-black rounded-full flex items-center justify-center font-bold cursor-pointer hover:bg-yellow-500 transition-all">
                                            {user?.name?.charAt(0).toUpperCase() || 'U'}
                                        </span>
                                    </Link>
                                </div>
                            ) : (
                                <button
                                    onClick={handleLoginClick}
                                    className="px-5 py-2 bg-yellow-400 text-black font-bold rounded-lg hover:bg-yellow-500 transition-all"
                                >
                                    Login
                                </button>
                            )}
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={toggleMenu}
                            className="md:hidden text-gray-300 hover:text-yellow-400 focus:outline-none"
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
                    className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                        }`}
                >
                    <div className="px-4 pt-2 pb-4 space-y-3 bg-[#212121] border-t border-gray-800">
                        <Link
                            to="/"
                            onClick={toggleMenu}
                            className="block text-gray-300 hover:text-yellow-400 hover:bg-gray-800 px-3 py-2 rounded-md transition-all duration-300 font-medium"
                        >
                            Home
                        </Link>
                        <a href="#about" onClick={toggleMenu} className="block text-gray-300 hover:text-yellow-400 hover:bg-gray-800 px-3 py-2 rounded-md transition-all duration-300 font-medium">
                            About
                        </a>
                        <a href="#faqs" onClick={toggleMenu} className="block text-gray-300 hover:text-yellow-400 hover:bg-gray-800 px-3 py-2 rounded-md transition-all duration-300 font-medium">
                            FAQs
                        </a>

                        {/* Mobile Materials Dropdown */}
                        <div onClick={handleMaterials}>
                            <p
                                className="flex items-center justify-between text-gray-300 hover:text-yellow-400 hover:bg-gray-800 px-3 py-2 rounded-md transition-all duration-300 font-medium cursor-pointer"

                            >
                                <span>Materials</span>
                                <IoIosArrowDown className={`font-bold transition-transform duration-300 ${isMaterialOpen ? 'rotate-180' : ''}`} />
                            </p>

                            {/* Mobile Dropdown Items */}
                            <div className={`overflow-hidden transition-all duration-300 ${isMaterialOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                                <div className="pl-6 pt-2 space-y-2">
                                    <Link
                                        className='flex items-center text-gray-400 hover:text-yellow-400 px-3 py-2 rounded-md transition-all'
                                        to="/notes"
                                        onClick={handleMaterialLinkClick}
                                    >
                                        <IoMdArrowDropright /> Notes
                                    </Link>
                                    <Link
                                        className='flex items-center text-gray-400 hover:text-yellow-400 px-3 py-2 rounded-md transition-all'
                                        to="/tests"
                                        onClick={handleMaterialLinkClick}
                                    >
                                        <IoMdArrowDropright /> Tests
                                    </Link>
                                    <Link
                                        className='flex items-center text-gray-400 hover:text-yellow-400 px-3 py-2 rounded-md transition-all'
                                        to="/ncert-solutions"
                                        onClick={handleMaterialLinkClick}
                                    >
                                        <IoMdArrowDropright /> NCERT Solutions
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Mobile Login/Logout */}
                        <div className="pt-3 border-t border-gray-800">
                            {isLoggedIn ? (
                                <div className="space-y-2">
                                    <Link to="/profile" onClick={toggleMenu}>
                                        <div className="px-3 py-2 text-gray-300 text-sm flex items-center gap-2 hover:bg-gray-800 rounded-md transition-all">
                                            <span className="w-8 h-8 bg-yellow-400 text-black rounded-full flex items-center justify-center font-bold text-xs">
                                                {user?.name?.charAt(0).toUpperCase() || 'U'}
                                            </span>
                                            <div className="flex flex-col">
                                                <span className="font-medium">{user?.name || 'User'}</span>
                                                <span className="text-xs text-gray-400">+91 {user?.phone_number}</span>
                                            </div>
                                        </div>
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full bg-red-500/90 text-white text-center px-3 py-2 rounded-md font-semibold hover:bg-red-600 transition-all duration-300"
                                    >
                                        Logout
                                    </button>
                                </div>
                            ) : (
                                <button
                                    onClick={() => {
                                        handleLoginClick();
                                        toggleMenu();
                                    }}
                                    className="w-full bg-yellow-400 text-black text-center px-3 py-2 rounded-md font-bold hover:bg-yellow-500 transition-all duration-300"
                                >
                                    Login
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Login Modal */}
            {showLoginModal && (
                <LoginModal
                    isOpen={showLoginModal}
                    onClose={() => setShowLoginModal(false)}
                />
            )}
        </>
    );
}
