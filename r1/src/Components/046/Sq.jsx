import randomColor from '../../functions/randomColor';

export default function Sq(props) { // reikia propso zveris

    const color = randomColor();


    return (
        <div className="sq" style={{
            background: color + '70',
            borderColor: color
        }}>{props.zveris}</div>
    );
}