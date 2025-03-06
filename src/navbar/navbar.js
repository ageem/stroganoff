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
                <li className='link'>
                    <Link to='/stroganoffai'>stroganoff ai</Link>
                </li>
                <li className='link'>
                    <Link to='/gallery'>gallery</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;