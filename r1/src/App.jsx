import './App.css';
import { BrowserRouter, NavLink, Routes, Route } from 'react-router';
import Home from './Components/062/Home';
import About from './Components/062/About';
import Visit from './Components/062/Visit';



function App() {

    return (
        <BrowserRouter>
        
            <nav className="router-menu">
                <NavLink to="/">Namai</NavLink>
                <NavLink to="/about">Apie namus</NavLink>
                <NavLink to="/visit">Ateikit į svečius</NavLink>
            </nav>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="about" element={<About />} />
                <Route path="visit" element={<Visit />} />
                <Route path="*" end element={<h2>Page not found 404</h2>} />
            </Routes>

        </BrowserRouter>
    );
}

export default App;

