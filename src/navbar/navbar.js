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
                    <Link to='/stroganomics'>stroganomics</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;