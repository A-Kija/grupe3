import { useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router';
import Data from '../Data/Data';
import { getCoursesByTopicId } from '../Actions/courses';

export default function Courses() {

    const { topicId } = useParams();



    const { coursesRequest, courses, coursesList, dispachCoursesList, topics } = useContext(Data);

    console.log(coursesList);

    useEffect(_ => {
        coursesRequest(topicId);
    }, []);

    useEffect(_ => {
        if (null === courses) {
            return;
        }
        let topic;
        if (null === topics) {
            topic = null;
        } else {
            topic = topics.find(t => t.id == topicId);
        }

        dispachCoursesList(getCoursesByTopicId(courses, topic, topicId));
    }, [courses]);

    if (!coursesList.some(l => l.topicId == topicId)) {
        return (
            <div>Loading...</div>
        );
    }


    return (
        <>
        <h1>Courses</h1>
        <ul>
        {
            
            coursesList.find(l => l.topicId == topicId).courses.map(c =>
                <li key={c.id}>{c.title}</li>
            )
        }
        </ul>
        </>
    );


}