import rand from '../../functions/random';

export default function BlueRed() {

    const red = '#D00000';
    const blue = '#0B3954';

    const color = rand(0, 1) ? red : blue;

    return (
        <div className="sq" style={{
            background: color + '70',
            borderColor: color
        }}></div>
    );

}