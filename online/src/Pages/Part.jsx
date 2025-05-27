import { useEffect, useContext, useRef } from 'react';
import { Link, useParams, useNavigate } from 'react-router';
import Data from '../Data/Data';
import { getCourseById } from '../Actions/courses';

export default function Part() {

    const { partId } = useParams();
    const navigate = useNavigate();




    const { parts, dispachParts, partRequest, part } = useContext(Data);

    





  

    useEffect(_ => {
        console.log('GET PART CONTENT');
        partRequest(partId);
    }, []);

    // useEffect(_ => {
    //     if (!pageLoaded.current) {
    //         pageLoaded.current = true;
    //         return;
    //     }
    //     if (!findDisplayCourse()) {
    //         navigate('/');
    //         return;
    //     }

    //     dispachCoursesList(getCourseById(course, courseId));

    // }, [course]);








    return (
        <div className="part-page">
            PART
        </div>
    );

}
