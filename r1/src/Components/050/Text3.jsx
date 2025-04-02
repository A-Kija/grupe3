import { useState } from 'react';
import './forms.scss';
export default function Text3() {

    const [text, setText] = useState({
        vardas: '',
        pavarde: '',
        el_pastas: '@'
    });
    const [result, setResult] = useState({
        vardas: 'not yet',
        pavarde: 'not yet',
        el_pastas: 'not yet'
    });

    // handleInput ne raktinis, o musu pasirinktas vardas

    const handleInput = e => {
        // e.target => input elementas
        // e.target.value => input elemento reiksme
        const value = e.target.value;
        const name = e.target.name

        setText(t => ({...t, [name]: value}));
    }

    const go = _ => {
        setResult(text);
    }

    return (
        <fieldset>
            <legend>Text 3</legend>
            {/* {
                Object.keys(result).map(k =>
                    <div key={k} className="result">{result[k]}</div>
                )
            } */}
            <div className="result">{result.vardas}</div>
            <div className="result">{result.pavarde}</div>
            <div className="result">{result.el_pastas}</div>
            <input type="text" name="vardas" value={text.vardas} onChange={handleInput} />
            <input type="text" name="pavarde" value={text.pavarde} onChange={handleInput} />
            <input type="text" name="el_pastas" value={text.el_pastas} onChange={handleInput} />
            <button className="green" onClick={go}>Go</button>
        </fieldset>
    );

    

}
