import { useEffect } from 'react';
import { useNavigate } from 'react-router';

export default function Redirect({to}) {

    const navigate = useNavigate();

    useEffect(_ => {
        navigate(to);
    }, []);
    
    
    return (
        <h2>Redirecting...</h2>
    );

}