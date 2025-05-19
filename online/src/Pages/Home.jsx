import { useState, useEffect, useContext } from 'react';
import Data from '../Data/Data';

export default function Home() {

    const [topics, setTopics] = useState(null);

    const { topicsRequest } = useContext(Data);

    useEffect(_ => {
        topicsRequest();
    }, []);

    if (null === topics) {
        return (
            <div>Home loading</div>
        );
    }
}