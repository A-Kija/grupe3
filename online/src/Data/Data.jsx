import { createContext } from 'react';
import useGet from '../Hooks/useGet';
import { useReducer } from 'react';
import coursesListReducer from '../Reducers/coursesListReducer';
import partsReducer from '../Reducers/partsReducers';



const Data = createContext();


export const DataProvider = ({ children }) => {

    const [coursesList, dispachCoursesList] = useReducer(coursesListReducer, []);
    const [parts, dispachParts] = useReducer(partsReducer, []);


    const [topicsRequest, topics] = useGet('topics-list', 'topics');
    const [coursesRequest, courses] = useGet('courses-list', 'courses');
    const [courseRequest, course] = useGet('course', 'course');
    const [partRequest, part] = useGet('part', 'part');



    return (
        <Data.Provider value={{
            topicsRequest, topics,
            coursesRequest, courses, coursesList, dispachCoursesList,
            courseRequest, course,
            parts, dispachParts, partRequest, part
        }}>
            {children}
        </Data.Provider>
    );

}

export default Data;