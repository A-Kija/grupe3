import axios from 'axios';
import * as C from '../Constants/main';
import { useState, useRef } from 'react';

export default function useGet(url, prop) {

    const [response, setResponse] = useState(null);

    const cachedIds = useRef(new Set());

    const request = id => {
        
        id = id ? '/' + id : '';
        
        if (cachedIds.current.has(id)) {
            return;
        }

        axios.get(C.SERVER_URL + url + id)
            .then(res => {
                cachedIds.current.add(id);
                console.log(res.data);
                setResponse(res.data[prop]);
            })
            .catch(err => {
                console.error(err);
            });
    }

    return [ request, response ];
}