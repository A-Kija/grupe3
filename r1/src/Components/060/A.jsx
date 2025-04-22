import { useContext } from 'react';
import B from './B';
import ContextNaujas from './ContextNaujas';

export default function A({ count1 }) {

    const { doPlus5Logic } = useContext(ContextNaujas);


    return (
        <fieldset className="border-sq">
            <legend>A</legend>
            <B count1={count1} />
            <button className="yellow" onClick={doPlus5Logic}>+5</button>
        </fieldset>
    );
}