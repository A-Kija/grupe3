export default function Sq({ color }) {

    return (
        <div className="sq" style={{
            background: color + '70',
            borderColor: color
        }}>{color}</div>
    );
}
