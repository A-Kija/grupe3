import { useState } from 'react';

export default function useLocalStorage(key) {

    /*
    data
    {
        title: 'bla bla...',
        image: 'data:image/jpeg;base64,/9j/4AAQSkZJ...'
    }

    */

    const [data, setData] = useState(_ => {
        const value = localStorage.getItem(key);
        if (value === null) {
            return null;
        }
        return JSON.parse(value);
    });


    const save = newData => {
        localStorage.setItem(key, JSON.stringify(newData));
    }

    const clear = _ => {
        localStorage.setItem(key, null);
        setData(null);
    }

    return [ save, clear, data ];

}