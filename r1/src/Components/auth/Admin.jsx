import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import * as C from './constants';
import Auth from './Auth';

export default function Admin() {


    const [users, setUsers] = useState(null);

    const [isAuthorized, setIsAuthorized] = useState(false);

    const { user } = useContext(Auth);

    useEffect(_ => {

        axios.get(C.SERVER_URL + 'admin-get-users', { withCredentials: true })
            .then(res => {
                console.log(res.data);
                setUsers(res.data.usersData);
                setIsAuthorized(true);
            })
            .catch(error => {
                console.error(error);
                setUsers([]);
            });


    }, []);

    if (users === null) {
        return (
            <div>Loading users...</div>
        );
    }

    if (user.role !== 'admin' || !isAuthorized) {
        return (
            <h2 style={{color: 'crimson'}}>Not authorized</h2>
        );
    }


    return (
        <div className="admin-page">
            <h1>Admin Page</h1>
            <ul className="admin-users-list">
                {
                    users.map(u =>
                        <li key={u.id}>
                            <div className="id">{u.id}</div>
                            <div className="name">{u.email}</div>
                            <div className="role">{u.role}</div>
                            <div className="pet">{u.user_data.pet}</div>
                            <div className="color">{u.user_data.color}</div>
                        </li>
                    )
                }
            </ul>
        </div>
    );
}