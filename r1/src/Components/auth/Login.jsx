import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router';
import axios from 'axios';
import * as C from './constants';
import Loader from './Loader';

export default function Login() {

    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [show, setShow] = useState(false);
    const [logUser, setLogUser] = useState(null);

    const doLogin = _ => {
        setLogUser({
            name,
            password
        });
    }

    useEffect(_ => {
        if (null === logUser) {
            return;
        }
        axios.post(C.SERVER_URL + 'login', logUser, {withCredentials: true})
        .then(res => {
            console.log(res.data)
        })
        .catch(error => {
            console.error(error)
        });
    }, [logUser]);




     return (
            <div className="form">
                <h1>Login</h1>
                <div className="inputs">
                    <div className="input">
                        <label>User Email</label>
                        <input type="text" value={name} onChange={e => setName(e.target.value)} />
                    </div>
                    <div className="input">
                        <label>Password</label>
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                    </div>
                    <div className="input">
                        <button className="blue" onClick={doLogin}>Login</button>
                        <button className="blue"><Link to="/">Return</Link></button>
                    </div>
                </div>
                <Loader show={show} />
            </div>
        );

}