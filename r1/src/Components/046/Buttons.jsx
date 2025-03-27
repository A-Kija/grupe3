export default function Buttons() {


    const goSimple = e => {
        console.log('Simple button!');
        console.log(e.target.name);
    }

    const goColor = (color, e) => {
        console.log(color + ' button!');
        if (e) {
            console.log(e.target.name);
        }
    }

    const goColorFancy = color => e => {
        console.log(color + ' button!');
        console.log(e.target.name);
    }

    return (
        <>
            <button name="paprastas" onClick={goSimple}>Simple</button>
            <button name="zalias" className="green" onClick={e => goColor('Green', e)}>Green</button>
            <button name="raudonas" className="red" onClick={goColorFancy('Red')}>Red</button>
            <button name="melynas" className="blue" onClick={e => goColor('Blue', e)}>Blue</button>
            <button name="geltonas" className="yellow" onClick={_ => goColor('Yellow')}>Yellow</button>
        </>
    )
}