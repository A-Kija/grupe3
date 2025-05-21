import { useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router';
import Data from '../Data/Data';

export default function Courses() {

    const { topicId } = useParams();



    const { coursesRequest, courses, coursesList, dispachCoursesList } = useContext(Data);

    useEffect(_ => {
        coursesRequest(topicId);
    }, []);

    return (
        <h1>Courses</h1>
    );


}