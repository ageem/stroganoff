import './navbar.css'
import { Link } from 'react-router-dom';

function Navbar(){
    return(
        <nav className="bg-gradient-to-r from-gray-800 to-gray-900 text-white shadow-lg py-4 px-6">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                <div className="flex items-center mb-4 md:mb-0">
                    <Link to='/' className="text-2xl font-bold text-white hover:text-amber-300 transition duration-300">
                        Stroganoff
                    </Link>
                </div> 
                <ul className="flex flex-wrap justify-center space-x-1 md:space-x-6">
                    <li className="my-1 md:my-0">
                        <Link to='/' className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 hover:text-amber-300 transition duration-300">
                            Home
                        </Link>
                    </li>
                    <li className="my-1 md:my-0">
                        <Link to='/stroganomics' className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 hover:text-amber-300 transition duration-300">
                            Stroganomics
                        </Link>
                    </li>
                    <li className="my-1 md:my-0">
                        <Link to='/stroganoffai' className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 hover:text-amber-300 transition duration-300">
                            Stroganoff AI
                        </Link>
                    </li>
                    <li className="my-1 md:my-0">
                        <Link to='/gallery' className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 hover:text-amber-300 transition duration-300">
                            Gallery
                        </Link>
                    </li>
                    <li className="my-1 md:my-0">
                        <Link to='/confessions' className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 hover:text-amber-300 transition duration-300">
                            Confessions
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;