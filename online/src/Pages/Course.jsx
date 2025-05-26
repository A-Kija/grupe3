import { useEffect, useContext, useRef } from 'react';
import { Link, useParams, useNavigate } from 'react-router';
import Data from '../Data/Data';
import { getCoursesByTopicId } from '../Actions/courses';

export default function Courses() {

    const { courseId } = useParams();
    const navigate = useNavigate();

    const pageLoaded = useRef(false);



    const { courseRequest, course, coursesList, dispachCoursesList, topics } = useContext(Data);
    
    const findDisplayCourse = _ =>
        coursesList.forEach(topic => {
            if (topic.courses.some(c => c.id == courseId)) {
                
            }
        })



    useEffect(_ => {
        courseRequest(courseId);
    }, []);

    useEffect(_ => {
        if (!pageLoaded.current) {
            pageLoaded.current = true;
            return;
        }

    }, [course]);


    return (
        <div className="courses-page">
            COURSE
        </div>
    );

}
