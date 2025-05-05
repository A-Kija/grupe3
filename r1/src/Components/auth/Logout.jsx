import { useContext, useEffect } from 'react';
import axios from 'axios';
import * as C from './constants';
import { useNavigate } from 'react-router';
import Auth from './Auth';

export default function Logout() {

    const navigate = useNavigate();

    const { makeDefault } = useContext(Auth);


    useEffect(_ => {
        axios.post(C.SERVER_URL + 'logout', {}, { withCredentials: true })
            .then(res => {
                console.log(res.data);
                if (res.data.success) {
                    makeDefault();
                    navigate(C.REDIRECT_AFTER_LOGOUT);
                } else {
                    console.error('Server error');
                }
            })
            .catch(error => {
                console.error(error)
            });
    }, []);

    return (
        <h2>Logouting...</h2>
    );
}