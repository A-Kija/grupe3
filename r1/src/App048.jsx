import './App.css';
import { useRef, useState } from 'react';
import rand from './functions/random';
import randomColor from './functions/randomColor';
import Sq from './Components/048/Sq';

function App() {

    const animals = ['Bebras', 'Barsukas', 'Briedis', 'Meškėnas', 'Zebras'];

    const row = useRef(0); // grazina objekta su vienintele savybe current

    const newSq = _ => {
        return {
            id: rand(100000000, 999999999), // pseudo unikalus numeris
            color: randomColor(),
            animal: animals[rand(0, animals.length - 1)],
            // pridedame savo pagalbinius duomenis
            row: ++row.current,
            show: true ,
            spin: false
        }
    }
    
    const [sq, setSq] = useState(_ => {
        const squares = [];
        for (let i = 0; i < rand(7, 17); i++) {
            squares.push(newSq());
        }
        return squares;
    });

    const [globalSpin, setGlobalSpin] = useState(true);



    const addSq = _ => {
        setSq(s => [...s, newSq()]);
    }

    const sortAnimal = _ => {
        setSq(s => s.toSorted((a, b) => a.animal.localeCompare(b.animal)));
    }

    const sortDefault = _ => {
        setSq(s => s.toSorted((a, b) => a.row - b.row));
    }

    const showBebras = _ => {
        setSq(s => s.map(sq => sq.animal === 'Bebras' ? {...sq, show: true} : {...sq, show: false}));
    }

    const showZebras = _ => {
        setSq(s => s.map(sq => sq.animal === 'Zebras' ? {...sq, show: true} : {...sq, show: false}));
    }

    const showAll = _ => {
        setSq(s => s.map(sq => ({...sq, show: true})));
    }

    const deleteSquare = id => {
        setSq(s => s.filter(sq => sq.id !== id));
    }

    const spinSquare = id => {
        setSq(s => s.map(sq => sq.id === id ? {...sq, spin: !sq.spin} : sq));
    }

    const spinAll = _ => {
        setGlobalSpin(gs => !gs); // 1. false -> true 2. true -> false
        setSq(s => s.map(sq => ({...sq, spin: globalSpin}))); //1. gs -> false 2. gs -> true
    }
    

  return (
    <>
      <h1>SHOW, ROW - Masyvo atvaizdavimas</h1>
      <div className="sq-bin">
        {
            sq.map(s => s.show ? <Sq key={s.id} square={s} deleteSquare={deleteSquare} spinSquare={spinSquare} /> : null)
        }
      </div>
      <div className="sq-bin">
        <button className="green" onClick={addSq}>Add</button>
        <button className="blue" onClick={sortAnimal}>Sort by animal</button>
        <button className="blue" onClick={sortDefault}>Sort by default</button>
        <button className="yellow" onClick={showBebras}>Show BEBRAS</button>
        <button className="yellow" onClick={showZebras}>Show ZEBRAS</button>
        <button className="yellow" onClick={showAll}>Show All</button>
        <button className="red" onClick={spinAll}>Spin All</button>
      </div>

    </>
  );
}

export default App;

// reikia padaryt mygtuką (prie bendrų) "Spin all"