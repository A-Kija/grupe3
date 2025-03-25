import randomColor from '../../functions/randomColor';

export default function Sq() {

    const color = randomColor();


    return (
        <div className="sq" style={{
            background: color + '70',
            borderColor: color
        }}>{color}</div>
    );
}