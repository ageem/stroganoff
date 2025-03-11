import './navbar.css'
import { Link } from 'react-router-dom';

function Navbar(){
    return(
        <nav>
            <div className='nav_logo'>
            <Link to='/'>Stroganoff</Link>
            </div> 
            <ul>
                <li className='link'>
                    <Link to='/stroganomics'>Stroganomics</Link>
                </li>
                <li className='link'>
                    <Link to='/stroganoffai'>Stroganoff Ai</Link>
                </li>
                <li className='link'>
                    <Link to='/gallery'>Gallery</Link>
                </li>
                <li className='link'>
                    <Link to='/confessions'>Stroganoff Confessions</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;