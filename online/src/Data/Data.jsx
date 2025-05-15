import { createContext } from 'react';


const Data = createContext();


export const DataProvider = ({children}) => {


    return (
        <Data.Provider value={{}}>
            {children}
        </Data.Provider>
    );

}

export default Data;