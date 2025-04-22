import { useContext } from 'react';
import { ContextKomponentas } from '../../App';
import ContextNaujas from './ContextNaujas';

export default function C({ count1 }) {

    const { count2 } = useContext(ContextKomponentas);
    const { plus5 } = useContext(ContextNaujas);

    return (
        <fieldset className="border-sq">
            <legend>C</legend>
            <div>
                <h2>PLUS 5: {plus5}</h2>
                <h2>DRILL 1: {count1}</h2>
                <h2>DRILL 2: {count2}</h2>
                <h2>DRILL 2 with consumer:
                    <ContextKomponentas.Consumer>
                        {({ count2 }) => count2}
                    </ContextKomponentas.Consumer>
                </h2>
            </div>
        </fieldset>
    );
}