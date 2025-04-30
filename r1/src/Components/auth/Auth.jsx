import { createContext, useState } from 'react';


const Auth = createContext();



export const AuthProvider = ({children}) => {

    const [user, setUser] = useState({
        id: 0,
        name: 'Guest',
        role: 'quest'
    });

    return (
        <Auth.Provider value={{user, setUser}}>
            {children}
        </Auth.Provider>
    );

}






export default Auth;