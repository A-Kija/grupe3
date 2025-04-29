import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import * as C from './constants';
import Loader from './Loader';

export default function Login() {

    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [show, setShow] = useState(false);

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
                        <button className="blue">Login</button>
                    </div>
                </div>
                <Loader show={show} />
            </div>
        );

}