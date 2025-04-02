import { useState } from 'react';
import './forms.scss';
export default function RangeColor() {

    const [range, setRange] = useState(10);
    const [color, setColor] = useState('#8a2c90');

    // range, setRange, color, setColor, handleRange - laisvai pasirenkami vardai

    const handleRange = e => {
        setRange(e.target.value);
    }


    return (
        <fieldset style={{backgroundColor: color + 22}}>
            <legend>Range & Color</legend>

            <label>{range}</label>
            <input type="range" min="10" max="99" value={range} onChange={handleRange} />

            <input type="color" value={color} onChange={e => setColor(e.target.value)}/>

        </fieldset>
    );

}