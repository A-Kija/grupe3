import { useEffect, useContext } from 'react';
import Data from '../Data/Data';

export default function Home() {


    const { topicsRequest, topics } = useContext(Data);

    const sortTopics = unsorted => {
        if (null === unsorted) {
            return null;
        }
        const topics = new Map();
        unsorted.forEach(t => {
            if (topics.has(t.topicType)) {
                topics.get(t.topicType).push({id: t.id, title: t.title});
            } else {
                topics.set(t.topicType, [{id: t.id, title: t.title}]);
            }
        });
        const topicsArray = [];
        topics.forEach((t, ty) => {
            topicsArray.push({topicType: ty, topicsByType: t})
        });
        return topicsArray;
    }

    console.log(sortTopics(topics));



    useEffect(_ => {
        topicsRequest();
    }, []);

    if (null === topics) {
        return (
            <div>Home loading</div>
        );
    }



    console.log(topics)

    return (
        <div className="home-page">
            <div className="home-page__content">
                <ul>
                    {
                        topics.map(t =>
                            <li key={t.id}>{t.title}</li>
                        )
                    }
                </ul>
            </div>
        </div>
    );
}