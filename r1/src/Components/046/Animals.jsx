import Sq from '../046/Sq';
import RedCircle from './RedCircle';

export default function Animals() {

    const animal = 'Bebras';

    const animals = [
        'Briedis',
        'Barsukas',
        'Meškėnas',
        'Vilkas',
        'Meškėnas'
    ];


    return (
        <>
            <h2>{animal}</h2>

            <div>
                {
                    animals.map((p, i) => <h3 key={i}>{p}</h3>)
                }
            </div>

            <div className="sq-bin">
                {
                    animals.map((p, i) => p === 'Meškėnas' ? <RedCircle key={i} zveris={p}/> : <Sq key={i} zveris={p}/>)
                }
            </div>


        </>
    );
}