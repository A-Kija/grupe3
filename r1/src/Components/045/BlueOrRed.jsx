
export default function BlueOrRed(props) {

    const red = '#D00000';
    const blue = '#0B3954';

    let color;

    if (props.spalva === 'red') {
        color = red;
    } else if (props.spalva === 'blue') {
        color = blue;
    } else {
        color = '#707070';
    }


    return (
        <>
            {props.c}
            <div className="sq" style={{
                background: color + '70',
                borderColor: color
            }}>{props.skaicius} {props.savoFun()} {props.a.type}</div>
        </>
    );

}