import { NavLink, useLocation } from 'react-router';

export default function Nav() {

    const { pathname } = useLocation();

    const noNav = ['/login', '/register'];

    if (noNav.includes(pathname)) {
        return null;
    }

    return (
        <nav className="auth-nav">
            <div className="left">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/my-profile">Profile</NavLink>
            </div>
            <div className="right">
                <NavLink to="/login">Login</NavLink>
                <NavLink to="/register">Register</NavLink>
            </div>
        </nav>
    )
}