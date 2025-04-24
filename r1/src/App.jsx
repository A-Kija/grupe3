import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {

    const [counts, setCounts] = useState(null);


    useEffect(_ => {
        axios.get('http://localhost:3000/get-count', { withCredentials: true })
            .then(res => {
                console.log(res.data);
                setCounts(res.data.counts);
            })
            .catch(error => {
                console.log(error);
            })

    }, []);



    return (
        <>
            <h1>Cookies. Visits count: {counts}</h1>
        </>
    );
}

export default App;

