import axios from 'axios';
import * as C from '../Constants/main';
import { useContext, useState } from 'react';
import Data from '../Data/Data';

export default function usePost(url, prop) {

    const [response, setResponse] = useState(null);
    const { addMessage } = useContext(Data);

    const request = (data, id = false) => {

        id = id ? '/' + id : '';

        axios.post(C.SERVER_URL + url + id, data)
            .then(res => {
                console.log(res.data);
                setResponse(res.data[prop]);
            })
            .catch(err => {
                console.error(err);

                let text = 'Unknown server error';

                if (err?.response?.data?.message?.code) {
                    const code = err?.response?.data?.message?.code;
                    if (C.ERR[code]) {
                        text = C.ERR[code];
                    }
                }

                addMessage({
                    type: 'error',
                    text
                });
            });
    }

    return [request, response];
}