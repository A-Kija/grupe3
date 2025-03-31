import { useState } from 'react';
import './App.css';
import rand from './functions/random';
import Sq from './Components/047/Sq';
import randomColor from './functions/randomColor';

function App() {

    const [skaicius, setSkaicius] = useState(1); // skaicius yra steitas
    const [spalva, keistiSpalva] = useState('crimson');
    const [kitoks, setKitoks] = useState(rand(1, 3));

    const [kv, setKv] = useState([]);


    const pliusVienas = _ => {
        setSkaicius(priesTaibuvusReiksme => priesTaibuvusReiksme + 1); // sitas vyksta NE momentaliai, o kazkada veliau
        setSkaicius(priesTaibuvusReiksme => priesTaibuvusReiksme + 1);
        setSkaicius(priesTaibuvusReiksme => priesTaibuvusReiksme + 1);
        console.log('Plius vienas', skaicius);
    }

    const keisti = _ => {
        const naujaSpalva = spalva === 'crimson' ? 'skyblue' : 'crimson'; // blogai, nes reikia pries tai buvusios reiksmes
        keistiSpalva(naujaSpalva);
    }

    const random19 = _ => {
        setKitoks(rand(1, 9)); // gerai, nes nereikia reiksmes, kuri buvo pries tai
    }

    const addSq =  _ => {
        const color = randomColor();
        setKv(seniKv => [...seniKv, color]);
    }

  return (
    <>
      <h1>Kitoks skaičius: {kitoks}</h1>
      <h1 style={{color: spalva}}>State: {skaicius}</h1>
      <button onClick={pliusVienas} className="yellow">+ 3</button>
      <button onClick={keisti} className="yellow">Spalvos keitimo mygtukas</button>
      <button onClick={random19} className="green">Random 1-9</button>

      <div className="sq-bin">
        {
          kv.map((s, i) => <Sq key={i} color={s} />)
        }
        
      </div>
      <button onClick={addSq} className="red">Pridėti KV</button>

    </>
  );
}

export default App;

// padaryti žalią mygtuką, kuris skaičių "kitoks" keistų į atsistiktinį skaičių nuo 1 iki 9. Pradinis "kitoks" skaičius irgi atsitiktinis nuo 1 iki 3