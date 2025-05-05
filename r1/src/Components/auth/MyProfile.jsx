import { useContext, useEffect, useState } from 'react';
import Auth from './Auth';
import Redirect from './Redirect';
import * as C from './constants';
import axios from 'axios';

export default function MyProfile() {

    const { user } = useContext(Auth);

    const [color, setColor] = useState('#4dc885');
    const [pet, setPet] = useState('');
    const [userDataToUpdate, setUserDataToUpdate] = useState(null);


    useEffect(_ => {
        axios.get(C.SERVER_URL + 'user-data', {withCredentials: true})
        .then(res => {
            console.log(res.data);
        })
        .catch(error => {
            console.error(error);
        });
    }, []);


    useEffect(_ => {
        if (null === userDataToUpdate) {
            return;
        }
        axios.put(C.SERVER_URL + 'user-data', userDataToUpdate, {withCredentials: true})
        .then(res => {
            console.log(res.data);
        })
        .catch(error => {
            console.error(error);
        });

    }, [userDataToUpdate]);

    const save = _ => {
        setUserDataToUpdate({
            color,
            pet
        });
    }



    if (user.id === 0) {
        return (
            <Redirect to={C.LOGIN_PAGE} />
        );
    }

    return (
        <div className="profile">
            <h1>My Profile</h1>
            <div className="profile-side">
                <div className="form">
                    <h1>Eidit</h1>
                    <div className="inputs">
                        <div className="input">
                            <label>Color</label>
                            <input type="color" value={color} onChange={e => setColor(e.target.value)} />
                        </div>
                        <div className="input">
                            <label>Pet</label>
                            <input type="text" value={pet} onChange={e => setPet(e.target.value)} />
                        </div>
                        <div className="input">
                            <button className="blue" onClick={save}>Save</button>
                        </div>
                    </div>
                    {/* <Loader show={show} /> */}
                </div>
            </div>
            <div className="profile-side">
                dlsjghkjdfh
            </div>
        </div>
    );

}