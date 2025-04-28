import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import * as C from './constants';
import Loader from './Loader';

export default function Register() {

    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    
    const [regUser, setRegUser] = useState(null);
    const [show, setShow] = useState(false);

    let navigate = useNavigate();

    const doRegister = _ => {
        if (password.length < 3) {
            console.error('too short password');
            return;
        }
        if (password !== password2) {
            console.error('passwords mismatch');
            return;
        }
        setRegUser({
            name,
            password
        });
    }

    useEffect(_ => {
        if (null === regUser) {
            return;
        }
        setShow(true);
        axios.post(C.SERVER_URL + 'register', regUser, {withCredentials: true})
        .then(res => {
            setShow(false);
            if (res.data.success) {
                navigate(C.LOGIN_PAGE);
            } else {
                console.error('Server error')
            }
        })
        .catch(error => {
            setShow(false);
            console.error(error);
        })


    }, [regUser]);

    return (
        <div className="form">
            <h1>Register</h1>
            <div className="inputs">
                <div className="input">
                    <label>User Name</label>
                    <input type="text" value={name} onChange={e => setName(e.target.value)} />
                </div>
                <div className="input">
                    <label>Password</label>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                </div>
                <div className="input">
                    <label>Password confirm</label>
                    <input type="password" value={password2} onChange={e => setPassword2(e.target.value)} />
                </div>
                <div className="input">
                    <button className="blue" onClick={doRegister}>Register</button>
                </div>
            </div>
            <Loader show={show} />
        </div>
    );

}