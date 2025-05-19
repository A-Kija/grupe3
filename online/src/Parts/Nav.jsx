import { NavLink } from 'react-router';
import { logo } from '../Constants/svgs';

export default function Nav() {

    return (
        <header>
            <div className="top-menu">
                <div className="top-menu__left">
                    <div className="top-menu__left__logo">
                        {logo}
                        <span>Online institute for happy people</span>
                    </div>
                </div>
                <div className="top-menu__center">
                    <nav>
                        <ul>
                            <li><NavLink to="/" end>Home</NavLink></li>
                            <li><NavLink to="/course-list">Courses</NavLink></li>
                            <li><NavLink to="/">More More</NavLink></li>
                            <li><NavLink to="/">More More</NavLink></li>
                        </ul>
                    </nav>
                </div>
                <div className="top-menu__right">
                    <nav>
                        <ul>
                            <li><NavLink to="/login">Login</NavLink></li>
                            <li><NavLink to="/register">Register</NavLink></li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
}