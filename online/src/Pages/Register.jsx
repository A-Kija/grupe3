import { useEffect, useContext, useRef, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router';
import Data from '../Data/Data';
import { getPartContentByPartId } from '../Actions/courses';
import * as C from '../Constants/main';
import usePost from '../Hooks/usePost';

export default function Register() {

    const [hp, setHp] = useState(false);

    const [form, setForm] = useState({
        email: '',
        name: '',
        pass1: '',
        pass2: ''
    });

    const [request, response] = usePost('make-new-registration', 'reg');

    const hpMessage = hp ? 'Show password' : 'Hide password';
    const inputType = hp ? 'password' : 'text';

    const h = e => setForm(f => ({...f, [e.target.name]: e.target.value}));

    const register = _ => {
        request(form);
    }

    useEffect(_ => {
        if (null === response) {
            return;
        }
        

    }, [response])



    return (
        <div className="register-box">
            <h1>Wellcome to our Institute</h1>
            <div className="register-box__inputs">
                <div className="register-box__inputs__input">
                    <label>Email</label>
                    <input type="text" name="email" value={form.email} onChange={h}></input>
                </div>
                <div className="register-box__inputs__input">
                    <label>Name</label>
                    <input type="text" name="name" value={form.name} onChange={h}></input>
                </div>
                <div className="register-box__inputs__input">
                    <label>Password</label>
                    <input type={inputType} name="pass1" value={form.pass1} onChange={h}></input>
                </div>
                <div className="register-box__inputs__input">
                    <label>Password 2</label>
                    <input type={inputType} name="pass2" value={form.pass2} onChange={h}></input>
                </div>
                <div className="register-box__inputs__input">
                    <label className="hp" onClick={_ => setHp(p => !p)}>{hpMessage}</label>
                </div>
                <div className="register-box__inputs__input">
                    <button type="button" onClick={register}>Register</button>
                </div>
            </div>
        </div>

    );


}