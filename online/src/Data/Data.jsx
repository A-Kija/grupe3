import { createContext, useReducer, useState } from 'react';
import useGet from '../Hooks/useGet';
import coursesListReducer from '../Reducers/coursesListReducer';
import partsReducer from '../Reducers/partsReducers';
import { v4 } from 'uuid';



const Data = createContext();


export const DataProvider = ({ children }) => {

    const [coursesList, dispachCoursesList] = useReducer(coursesListReducer, []);
    const [parts, dispachParts] = useReducer(partsReducer, []);


    const [topicsRequest, topics] = useGet('topics-list', 'topics');
    const [coursesRequest, courses] = useGet('courses-list', 'courses');
    const [courseRequest, course] = useGet('course', 'course');
    const [partRequest, part] = useGet('part', 'part');

    const [messages, setMessages] = useState([]);


    const addMessage = msg => {
        const id = v4();
        setMessages(m => [{...msg, id}, ...m]);
    }

    const closeMessage = id => {
        setMessages(m => m.filter(ms => ms.id !== id));
    }


    return (
        <Data.Provider value={{
            topicsRequest, topics,
            coursesRequest, courses, coursesList, dispachCoursesList,
            courseRequest, course,
            parts, dispachParts, partRequest, part,
            messages, addMessage, closeMessage
        }}>
            {children}
        </Data.Provider>
    );

}

export default Data;