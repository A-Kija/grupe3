import { useEffect, useContext, useRef } from 'react';
import { Link, useParams, useNavigate } from 'react-router';
import Data from '../Data/Data';
import { getCourseById } from '../Actions/courses';

export default function Course() {

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
        console.log('GET PARTS');
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

        console.log('displayCourse----->', displayCourse);


    if (!displayCourse || !displayCourse?.parts) {
        return (
            <div>Loading...</div>
        );
    }


    return (
        <div className="course-page">
            <div className="course-page__content">
                <h1>
                    {displayCourse.title}
                    <span>By: {displayCourse.teacherName}</span>
                    <b>{displayCourse.plan}</b>
                </h1>
                <p className="course-page__content__desc">
                    {displayCourse.description}
                </p>
                <ul className="course-page__content__list">
                    {
                        displayCourse.parts.map(p =>
                            <li key={p.id}>
                                <h4>{('' + p.row).padStart(2, '0')}.</h4>
                                <h5><Link to={'/part/' + p.id}>{p.title}</Link></h5>
                                <p>{p.description}</p>
                            </li>
                        )
                    }
                </ul>
            </div>
        </div>
    );

}
