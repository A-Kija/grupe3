import { useState } from 'react';
import './forms.scss';
export default function Text() {

    const [text, setText] = useState('');
    const [result, setResult] = useState('nothing yet');

    // handleInput ne raktinis, o musu pasirinktas vardas

    const handleInput = e => {
        // e.target => input elementas
        // e.target.value => input elemento reiksme
        let value = e.target.value;
        console.log(value);
        if (value.length > 10) {
            return;
        }
        setText(value);
    }

    const go = _ => {
        setResult(text);
    }

    return (
        <fieldset>
            <legend>Text</legend>
            <div className="result">{result}</div>
            <input type="text" value={text} onChange={handleInput} />
            <button className="green" onClick={go}>Go</button>
        </fieldset>
    );

    

}
