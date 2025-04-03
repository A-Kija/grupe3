import { useState } from 'react';

export default function Checkbox() {

    const [cb, setCb] = useState({
        A: false,
        B: true,
        C: true,
        D: false
    });

    const checkboxes = [
        'A', 'B', 'C', 'D'
    ];

    const handleCheckbox = c => {
        setCb(checkboxes => ({ ...checkboxes, [c]: !checkboxes[c] }));
    }


    return (
        <fieldset>
            <legend>Checkbox</legend>
            <div className="result">
                <span>{cb.A ? ' A ' : ' - '}</span>
                <span>{cb.B ? ' B ' : ' - '}</span>
                <span>{cb.C ? ' C ' : ' - '}</span>
                <span>{cb.D ? ' D ' : ' - '}</span>
            </div>
            {
                checkboxes.map(c =>
                    <div key={c}>
                        <input type="checkbox" checked={cb[c]} id={'cb-' + c} onChange={_ => handleCheckbox(c)} />
                        <label htmlFor={'cb-' + c}>{c}</label>
                    </div>
                )
            }
        </fieldset>
    );

}