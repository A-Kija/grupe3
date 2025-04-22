import { createContext, useState } from 'react';


const ContextNaujas = createContext();


export const Naujas = ({children}) => {

    const [plus5, setPlus5] = useState(55);

    const doPlus5Logic = _ => {
        setPlus5(p => {
            if (p === 80) {
                return 55;
            }
            return p + 5;
        })
    }



    return (
        <ContextNaujas.Provider value={{
            plus5, 
            doPlus5Logic
        }}>
            {children}
        </ContextNaujas.Provider>
    );



}







export default ContextNaujas;