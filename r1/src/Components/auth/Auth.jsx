import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import * as C from './constants';


const Auth = createContext();



export const AuthProvider = ({children}) => {

    const [user, setUser] = useState({
        id: 0,
        name: 'Guest',
        role: 'quest'
    });

    useEffect(_ => {

        axios.get(C.SERVER_URL + 'get-user', { withCredentials: true })
        .then(res => {
            console.log(res.data);
            if (res.data.success) {
                setUser(res.data.user);
            }
        })
        .catch(error => {
            console.error(error);
        });


    }, []);

    return (
        <Auth.Provider value={{user, setUser}}>
            {children}
        </Auth.Provider>
    );

}






export default Auth;