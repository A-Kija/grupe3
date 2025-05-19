import { createContext } from 'react';
import useGet from '../Hooks/useGet';


const Data = createContext();


export const DataProvider = ({ children }) => {

    const [topicsRequest] = useGet('topics-list');


    return (
        <Data.Provider value={{
            topicsRequest
        }}>
            {children}
        </Data.Provider>
    );

}

export default Data;