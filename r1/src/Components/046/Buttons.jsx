export default function Buttons() {


    const goSimple = e => {
        console.log('Simple button!');
        console.log(e.target.name);
    }

    const goColor = color => {
        console.log(color + ' button!');
    }

    const goColorFancy = color => _ => {
        console.log(color + ' button!');
    }

    return (
        <>
            <button name="paprastas" onClick={goSimple}>Simple</button>
            <button className="green" onClick={_ => goColor('Green')}>Green</button>
            <button className="red" onClick={goColorFancy('Red')}>Red</button>
            <button className="blue" onClick={_ => goColor('Blue')}>Blue</button>
            <button className="yellow" onClick={_ => goColor('Yellow')}>Yellow</button>
        </>
    )
}