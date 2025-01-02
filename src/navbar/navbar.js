import './navbar.css'
import { Link } from 'react-router-dom';

function Navbar(){
    return(
        <nav>
            <ul>
                <li className='link'>
                    <Link to='/stroganomics'>stroganomics</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;