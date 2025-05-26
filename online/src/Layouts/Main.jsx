import { Routes, Route } from 'react-router';
import Nav from '../Parts/Nav';
import Home from '../Pages/Home';
import Courses from '../Pages/Courses';
import Course from '../Pages/Course';

export default function Main() {

    return (
        <div className="page-bin">
            <header>
                <Nav />
            </header>
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/course-list/:topicId" element={<Courses />} />
                    <Route path="/course/:courseId" element={<Course />} />
                </Routes>
            </main>
        </div>
    );

}