import { useReducer, useState } from 'react';
import './App.css';
import countReducer from './Components/061/countReducer';
import shapeReducer from './Components/061/shapeReducer';



function App() {

    const shapeDefault = {
        color: '#5c8ac0',
        shape: 'sq',
        size: '100'
    }

    const [count1, setCount1] = useState(11);
    const [count2, dispachCount2] = useReducer(countReducer, 11);

    const [x, setX] = useState('');

    const [shape, dispachShape] = useReducer(shapeReducer, shapeDefault);

    const [size, setSize] = useState(100);
    const [color, setColor] = useState('#ffffff');
    const [shapeForm, setShapeForm] = useState('sq')



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

    const changeSize = _ => {
        const action = {
            type: 'SIZE',
            payload: size
        }
        dispachShape(action);
    }

    const changeColor = _ => {
        const action = {
            type: 'COLOR',
            payload: color
        }
        dispachShape(action);
    }

    const changeForm = _ => {
        const action = {
            type: 'FORM',
            payload: shapeForm
        }
        dispachShape(action);
    }

    const changeAll = _ => {
        const action = {
            type: 'ALL',
            payload: {
                shapeForm,
                color,
                size
            }
        }
        dispachShape(action);
    }

    const changeDefault = _ => {
        const action = {
            type: 'DEFAULT',
            payload: shapeDefault
        }
        dispachShape(action);
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

            <div className="shape-control">
                <label>{size}</label>
                <input type="range" min="50" max="300" value={size} onChange={e => setSize(e.target.value)} />
                <input type="color" value={color} onChange={e => setColor(e.target.value)} />
                <input type="checkbox" checked={shapeForm === 'sq'} 
                onChange={_ =>setShapeForm(s => s === 'sq' ? 'not-sq' : 'sq')} />
            </div>
            <div className="shape-control">
                <button className="blue" onClick={changeSize}>Keisti dydį</button>
                <button className="blue" onClick={changeColor}>Keisti spalvą</button>
                <button className="blue" onClick={changeForm}>Keisti formą</button>
                <button className="green" onClick={changeAll}>Keisti viską</button>
                <button className="yellow" onClick={changeDefault}>Pradinis</button>
            </div>

            <div className="shape" style={{
                width: shape.size + 'px',
                height: shape.size + 'px',
                backgroundColor: shape.color + '77',
                border: `2px solid ${shape.color}`,
                borderRadius: shape.shape === 'sq' ? null : '50%'

            }}></div>

        </>
    );
}

export default App;

// Padarykit mygtuką, kuris state dalina iš 2.33