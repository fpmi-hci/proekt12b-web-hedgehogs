import {Link} from "react-router-dom";
import React from 'react';
import './navbar.css'
import {useDispatch, useSelector} from "react-redux";
import {signOut} from "../../redux/authSlice";

const NavBar = () => {
    const {isAuth} = useSelector((state) => state.auth);
    const dispatch = useDispatch()
    const handleLogout= () =>{
        dispatch(signOut())
    }

    return (
        <nav className="navbar">
            <div className='navbar__group'>
                <Link to='/'>Home</Link>
            </div>
            <div className='navbar__group'>
                {isAuth ? <Link to='/cart' className='navbar__cart'>Cart</Link>: null}
                {!isAuth ? <Link to='/sign-in'>Sign In</Link>: null}
                {isAuth ?<Link to='/sign-in' onClick={handleLogout}>Logout</Link>: null}
            </div>

        </nav>
    )
}

export default NavBar;