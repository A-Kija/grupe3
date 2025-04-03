import { useState } from 'react';

export default function Radio() {

    const [cb, setCb] = useState('B');

    const radio = [
        'A', 'B', 'C', 'D'
    ];

    const handleCheckbox = c => {
        setCb(c);
    }


    return (
        <fieldset>
            <legend>Radio</legend>
            <div className="result">{cb}</div>
            {
                radio.map(c =>
                    <div key={c}>
                        <input type="checkbox" checked={cb === c} id={'r-' + c} onChange={_ => handleCheckbox(c)} />
                        <label htmlFor={'r-' + c}>{c}</label>
                    </div>
                )
            }
        </fieldset>
    );

}