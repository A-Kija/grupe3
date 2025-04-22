import './App.css';
import { useState, createContext } from 'react';
import A from './Components/060/A';
import Vartai from './Components/060/Vartai';
import { Naujas } from './Components/060/ContextNaujas';


export const ContextKomponentas = createContext(); // cia yra visiskai atskiras spec komponentas. Reiktu deti atskirame faile


function App() {

    const [count1, setCount1] = useState(0);
    const [count2, setCount2] = useState(0);
    const [vartai, setVartai] = useState(false);

    const addCount1 = _ => setCount1(c => c + 1);
    const addCount2 = _ => setCount2(c => c + 1);

    return (
        <>
            <h1>Context</h1>
            <Vartai vartai={vartai}>
                <h2>Vartai atidaryti</h2>
            </Vartai>


            <div className="buttons">
                <button className="green" onClick={addCount1}>+1 drill</button>
                <button className="blue" onClick={addCount2}>+1 context</button>
                <button className="red" onClick={_ => setVartai(v => !v)}>Vartų valdymas</button>
            </div>

            <Naujas>

                <ContextKomponentas.Provider value={
                    {
                        count2: count2
                    }
                }>
                    <A count1={count1} />
                </ContextKomponentas.Provider>

            </Naujas>

        </>
    );
}

export default App;