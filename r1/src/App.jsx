import './App.css';
import usePlus1 from './Components/051/usePlus1';
import './Components/050/forms.scss';
import useLocalStorage from './Components/051/useLocalStorage';


function App() {

    const { count, getResult } = usePlus1(100, '+');

    const [handleText, save, clear, text] = useLocalStorage('manoTekstas');
    const [handleText2, save2, clear2, text2] = useLocalStorage('manoTekstas2');

    return (
        <>
            <h1>Custom HOOK & Local Storage</h1>
            <h2>{count}</h2>
            <button className="blue" onClick={getResult}>GO</button>

            <fieldset>
                <legend>LS Text</legend>
                <input type="text" value={text} onChange={handleText} />
                <button className="green" onClick={save}>save</button>
                <button className="red" onClick={clear}>clear</button>
            </fieldset>

            <fieldset>
                <legend>LS Text 2</legend>
                <input type="text" value={text2} onChange={handleText2} />
                <button className="green" onClick={save2}>save</button>
                <button className="red" onClick={clear2}>clear</button>
            </fieldset>

        </>
    );
}

export default App;