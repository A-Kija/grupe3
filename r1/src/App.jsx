import { useReducer, useState } from 'react';
import './App.css';
import countReducer from './Components/061/countReducer';
import shapeReducer from './Components/061/shapeReducer';



function App() {

    const [count1, setCount1] = useState(11);
    const [count2, dispachCount2] = useReducer(countReducer, 11);

    const [x, setX] = useState('');

    const [shape, dispachShape] = useReducer(shapeReducer, {
        color: '#5c8ac0',
        shape: 'sq',
        size: 100
    });



    const doCount1 = _ => setCount1(c => c + 1);
    const doMinusCount1 = _ => setCount1(c => c - 1);

    const doCount2 = _ => {
        const actionObjektas = {
            type: 'pliusVienas'
        };
        dispachCount2(actionObjektas);
    }

    const doMinusCount2 = _ => {
        const actionObjektas = {
            type: 'minusVienas'
        }
        dispachCount2(actionObjektas);
    }

    const doDiv233Count2 = _ => {
        const actionObjektas = {
            type: 'dalyba2.33'
        }
        dispachCount2(actionObjektas);
    }

    const doXCount2 = _ => {
        const actionObjektas = {
            type: 'plusX', 
            payload: x
        }
        dispachCount2(actionObjektas);
    }

    return (
        <>
            <h1>useReducer</h1>
            <h2>useState: {count1}</h2>
            <h2>useReducer: {count2.toFixed(2)}</h2>
            <div>
                <button className="green" onClick={doCount1}>+1 useState</button>
                <button className="green" onClick={doMinusCount1}>-1 useState</button>
                <button className="red"  onClick={doCount2}>+1 useReducer</button>
                <button className="red" onClick={doMinusCount2}>-1 useReducer</button>
                <button className="red" onClick={doDiv233Count2}>/2.33 useReducer</button>
                <button className="red" onClick={doXCount2}>+X useReducer</button>
                <label>X: </label>
                <input type="number" value={x} onChange={e => setX(e.target.value)}></input>
            </div>

        </>
    );
}

export default App;

// Padarykit mygtuką, kuris state dalina iš 2.33