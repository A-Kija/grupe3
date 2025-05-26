import { useEffect, useContext, useRef } from 'react';
import { Link, useParams, useNavigate } from 'react-router';
import Data from '../Data/Data';
import { getCourseById } from '../Actions/courses';

export default function Courses() {

    const { courseId } = useParams();
    const navigate = useNavigate();

    const pageLoaded = useRef(false);



    const { courseRequest, course, coursesList, dispachCoursesList, topics } = useContext(Data);

    const findDisplayCourse = _ => {
        let find = null;
        for (const topic of coursesList) {
            find = topic.courses.find(c => c.id == courseId) ?? null;
            if (find) {
                break;
            }

        }
        return find;
    }





  

    useEffect(_ => {
        courseRequest(courseId);
    }, []);

    useEffect(_ => {
        if (!pageLoaded.current) {
            pageLoaded.current = true;
            return;
        }
        if (!findDisplayCourse()) {
            navigate('/');
            return;
        }

        dispachCoursesList(getCourseById(course, courseId));

    }, [course]);

    const displayCourse = findDisplayCourse();

        console.log(displayCourse);


    if (!displayCourse) {
        return (
            <div>Loading...</div>
        );
    }


    return (
        <div className="course-page">
            <div className="course-page__content">
                <h1>{displayCourse.title}</h1>
            </div>
        </div>
    );

}
