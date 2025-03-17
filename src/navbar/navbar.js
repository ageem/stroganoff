import './navbar.css'
import { Link } from 'react-router-dom';
import { useState } from 'react';

function Navbar(){
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return(
        <nav className="bg-gradient-to-r from-gray-800 to-gray-900 text-white shadow-lg py-4 px-6">
            <div className="container mx-auto">
                <div className="flex justify-between items-center">
                    <Link to='/' className="text-2xl font-bold text-white hover:text-amber-300 transition duration-300">
                        Stroganoff
                    </Link>
                    
                    {/* Hamburger Menu Button */}
                    <button 
                        className="md:hidden p-2 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
                        onClick={toggleMenu}
                        aria-label="Toggle menu"
                    >
                        <div className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'transform rotate-45 translate-y-1.5' : ''}`}></div>
                        <div className={`w-6 h-0.5 bg-white mt-1.5 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></div>
                        <div className={`w-6 h-0.5 bg-white mt-1.5 transition-all duration-300 ${isMenuOpen ? 'transform -rotate-45 -translate-y-1.5' : ''}`}></div>
                    </button>

                    {/* Desktop Menu */}
                    <ul className="hidden md:flex space-x-6">
                        <li>
                            <Link to='/' className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 hover:text-amber-300 transition duration-300">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to='/stroganomics' className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 hover:text-amber-300 transition duration-300">
                                Stroganomics
                            </Link>
                        </li>
                        <li>
                            <Link to='/stroganoffai' className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 hover:text-amber-300 transition duration-300">
                                Stroganoff AI
                            </Link>
                        </li>
                        <li>
                            <Link to='/gallery' className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 hover:text-amber-300 transition duration-300">
                                Gallery
                            </Link>
                        </li>
                        <li>
                            <Link to='/confessions' className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 hover:text-amber-300 transition duration-300">
                                Confessions
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Mobile Menu */}
                <div className={`md:hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                    <ul className="flex flex-col space-y-2">
                        <li>
                            <Link 
                                to='/' 
                                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 hover:text-amber-300 transition duration-300"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link 
                                to='/stroganomics' 
                                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 hover:text-amber-300 transition duration-300"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Stroganomics
                            </Link>
                        </li>
                        <li>
                            <Link 
                                to='/stroganoffai' 
                                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 hover:text-amber-300 transition duration-300"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Stroganoff AI
                            </Link>
                        </li>
                        <li>
                            <Link 
                                to='/gallery' 
                                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 hover:text-amber-300 transition duration-300"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Gallery
                            </Link>
                        </li>
                        <li>
                            <Link 
                                to='/confessions' 
                                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 hover:text-amber-300 transition duration-300"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Confessions
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;