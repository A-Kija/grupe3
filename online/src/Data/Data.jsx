import { createContext } from 'react';
import useGet from '../Hooks/useGet';
import { useReducer } from 'react';
import coursesListReducer from '../Reducers/coursesListReducer';



const Data = createContext();


export const DataProvider = ({ children }) => {

    const [coursesList, dispachCoursesList] = useReducer(coursesListReducer, null);


    const [topicsRequest, topics] = useGet('topics-list', 'topics');
    const [coursesRequest, courses] = useGet('courses-list', 'courses');



    return (
        <Data.Provider value={{
            topicsRequest, topics,
            coursesRequest, courses, coursesList, dispachCoursesList
        }}>
            {children}
        </Data.Provider>
    );

}

export default Data;