import axios from 'axios';
import * as C from '../Constants/main';
import { useState } from 'react';

export default function usePost(url, prop, data) {

    const [response, setResponse] = useState(null);

    const request = id => {

        id = id ? '/' + id : '';


        axios.post(C.SERVER_URL + url + id, data)
            .then(res => {
                console.log(res.data);
                setResponse(res.data[prop]);
            })
            .catch(err => {
                console.error(err);
            });
    }

    return [request, response];
}