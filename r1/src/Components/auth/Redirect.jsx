import { useEffect } from 'react';
import { useNavigate } from 'react-router';

export default function Redirect({ to }) {

    const navigate = useNavigate();

    useEffect(_ => {
        setTimeout(_ => { // tiesiog del vizualizacijos padarome 1 sekundes uzlaikyma. Nebutina
            navigate(to);
        }, 1000);
    }, []);

    return (
        <h2>Redirecting...</h2>
    );
}