import './App.css';
import BlueOrRed from './Components/045/BlueOrRed';
import BlueRed from './Components/045/BlueRed';
import Color from './Components/045/Color';
import Sq from './Components/045/Sq';

function App() {

  const fun = _ => {
    return 'Fun Fun';
  }

  const animal = {
    type: 'Fox',
    what: 'smart'
  }

  return (
    <>
      <h1>JS ir Props</h1>
      <Color />
      <div className="sq-bin">
        <Sq />
        <Sq />
        <Sq />
        <Sq />
        <BlueOrRed spalva="red" skaicius="11" savoFun={fun} a={animal} c={<Sq/>} />
        <BlueOrRed spalva="blue" skaicius="22" savoFun={fun} a={animal} c={<Sq/>} />
        <BlueOrRed spalva="red" skaicius="33" savoFun={fun} a={animal} c={<Sq/>} />
        <BlueOrRed skaicius="44" spalva="blue" savoFun={fun} a={animal} c={<Sq/>} />
      </div>
    </>
  );
}

export default App;

// Padaryti, kad atsitiktine tvarka kvadratas būtų mėlynas arba raudonas
