import { useState } from 'react';

export default function useLocalStorage(key) {

    const [text, setText] = useState(_ => {
        const value = localStorage.getItem(key);
        if (value === null) {
            localStorage.setItem(key, '');
            return '';
        }
        return value;
    });

    const handleText = e => {
        setText(e.target.value);
    }

    const save = _ => {
        localStorage.setItem(key, text);
    }

    const clear = _ => {
        localStorage.setItem(key, '');
        setText('');
    }

    return [ handleText, save, clear, text ];

}