import axios from 'axios';
import * as C from '../Constants/main';
import { useState } from 'react';

export default function useGet(url, prop) {

    const [response, setResponse] = useState(null);

    const request = _ => {
        axios.get(C.SERVER_URL + url)
            .then(res => {
                console.log(res.data);
                setResponse(res.data[prop]);
            })
            .catch(err => {
                console.error(err)
            });
    }

    return [ request, response ];
}