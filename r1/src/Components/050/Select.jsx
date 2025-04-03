import { useState } from 'react';

export default function Select() {

    const [select, setSelect] = useState(57);

    const animals = [
        { id: 5, animal: 'Bebras' },
        { id: 8, animal: 'Zebras' },
        { id: 15, animal: 'Barsukas' },
        { id: 57, animal: 'Briedis' },
        { id: 552, animal: 'Zuikis' }
    ];

    const { animal: pasirinktas } = animals.find(a => a.id == select);


    return (
        <fieldset>
            <legend>Select</legend>
            <div className="result">{pasirinktas}</div>
            <select value={select} onChange={e => setSelect(e.target.value)}>
                {
                    animals.map(a =>
                        <option key={a.id} value={a.id}>{a.animal}</option>
                    )
                }
            </select>
        </fieldset>
    );

}