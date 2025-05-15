import { Routes, Route } from 'react-router';
import Nav from '../Parts/Nav';
import Home from '../Pages/Home';

export default function Main() {


    return (
        <div className="page-bin">
            <header>
                <Nav />
            </header>

            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                </Routes>
            </main>
        </div>
    );

}