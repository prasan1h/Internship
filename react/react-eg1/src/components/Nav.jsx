import "./Nav.css"
import {Link} from 'react-router'

function Nav(){
    return (
        <>
        <nav className="nav">
            <div className="nav-logo"><p>Riderrr</p></div>
            <div className="nav-links">
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/product">Products</Link></li>
                    <li><Link to="/services">Services</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                    <li><Link to="/students">Students</Link></li>
                </ul>
            </div>
        </nav>
        </>
    )
}

export default Nav