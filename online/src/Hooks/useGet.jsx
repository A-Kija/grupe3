import axios from 'axios';
import * as C from '../Constants/main';

export default function useGet(url) {


    const request = _ => {
        axios.get(C.SERVER_URL + url)
            .then(res => {
                console.log(res.data)
            })
            .catch(err => {
                console.error(err)
            });
    }

    return [ request ];
}