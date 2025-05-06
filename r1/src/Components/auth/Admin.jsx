import { useEffect, useState } from 'react';
import axios from 'axios';
import * as C from './constants';

export default function Admin() {


    const [users, setUsers] = useState(null);

    useEffect(_ => {

        axios.get(C.SERVER_URL + 'admin-get-users', { withCredentials: true })
            .then(res => {
                console.log(res.data);
                setUsers(res.data.usersData);
            })
            .catch(error => {
                console.error(error)
            });


    }, []);

    if (users === null) {
        return (
            <div>Loading users...</div>
        );
    }


    return (
        <>
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
        </>
    );
}