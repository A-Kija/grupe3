import { createContext } from 'react';
import useGet from '../Hooks/useGet';


const Data = createContext();


export const DataProvider = ({ children }) => {

    const [topicsRequest, topics] = useGet('topics-list', 'topics');


    return (
        <Data.Provider value={{
            topicsRequest, topics
        }}>
            {children}
        </Data.Provider>
    );

}

export default Data;