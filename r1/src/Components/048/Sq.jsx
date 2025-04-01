import './Sq.scss';

export default function Sq({ square, deleteSquare, spinSquare }) {

    return (
        <div className={`sq ${square.spin ? 'spin' : ''}`} style={{
            background: square.color + '70',
            borderColor: square.color
        }}>
            <div className="id">ID: {square.id}</div>
            <div className="row">ROW: {square.row}</div>
            <span>{square.animal}</span>
            <div className="delete" onClick={_ => deleteSquare(square.id)}>DELETE</div>
            <div className="sp" onClick={_ => spinSquare(square.id)}>SPIN</div>
        </div>
    );
}
