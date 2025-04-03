import { useState } from 'react';

export default function usePlus1(initValue, action) {

    const [count, setCount] = useState(initValue);

    const add1 = _ => {
        setCount(c => c + 1);
    }

    const diff1 = _ => {
        setCount(c => c - 1);
    }

    const getResult = _ => {
        if (action === '+') {
            add1();
        }
        else if (action === '-') {
            diff1();
        }
    }


    return { count, getResult }

}