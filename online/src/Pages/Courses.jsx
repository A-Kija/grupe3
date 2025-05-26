import { useEffect, useContext, useRef } from 'react';
import { Link, useParams, useNavigate } from 'react-router';
import Data from '../Data/Data';
import { getCoursesByTopicId } from '../Actions/courses';

export default function Courses() {

    const { topicId } = useParams();
    const navigate = useNavigate();

    const pageLoaded = useRef(false);



    const { coursesRequest, courses, coursesList, dispachCoursesList, topics } = useContext(Data);



    useEffect(_ => {
        coursesRequest(topicId);
    }, []);

    useEffect(_ => {
        if (!pageLoaded.current) {
            pageLoaded.current = true;
            return;
        }
        if (null === courses) {
            return;
        }
        let topic;
        if (null === topics) {
            navigate('/');
            return;
        }
        topic = topics.find(t => t.id == topicId);

        dispachCoursesList(getCoursesByTopicId(courses, topic, topicId));
    }, [courses]);

    const displayCourses = coursesList.find(l => l.topicId == topicId);



    if (!displayCourses) {
        return (
            <div>Loading...</div>
        );
    }


    return (
        <div className="courses-page">
            <div className="courses-page__content">
                <h1>Courses <span>{displayCourses.topicType}</span></h1>
                <h2>{displayCourses.topicTitle}</h2>
                <ul className="courses-page__content__list">
                    {
                        displayCourses.courses.map(c =>
                            <li key={c.id}>
                                <div className="plan">{c.plan}</div>
                                <h3><Link to={'/course/' + c.id}>{c.title}</Link> <span>By: <b>{c.teacherName}</b></span></h3>
                                <p>{c.description}</p>
                            </li>
                        )
                    }
                </ul>
            </div>
        </div>
    );


}