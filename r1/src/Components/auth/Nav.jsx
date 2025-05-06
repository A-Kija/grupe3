import { useContext } from 'react';
import { NavLink, useLocation } from 'react-router';
import Auth from './Auth';

export default function Nav() {

    const { pathname } = useLocation();

    const { user } = useContext(Auth);

    const noNav = ['/login', '/register'];

    if (noNav.includes(pathname)) {
        return null;
    }

    return (
        <nav className="auth-nav">
            <div className="left">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/my-profile">Profile</NavLink>
                <NavLink to="/admin">Admin</NavLink>
            </div>
            {
                user.id
                    ?
                    <div className="right">
                        <div>{user.name}</div>
                        <NavLink to="/logout">Logout</NavLink>
                    </div>
                    :
                    <div className="right">
                        <NavLink to="/login">Login</NavLink>
                        <NavLink to="/register">Register</NavLink>
                    </div>
            }
        </nav>
    )
}