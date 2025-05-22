import { useEffect, useContext } from 'react';
import { Link } from 'react-router';
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

    // console.log(sortTopics(topics));



    useEffect(_ => {
        topicsRequest();
    }, []);

    if (null === topics) {
        return (
            <div>Home loading</div>
        );
    }

    return (
        <div className="home-page">
            <div className="home-page__content">
                <h1>All topics</h1>
                <ul className="home-page__content__types">
                    {
                        sortTopics(topics).map(ty =>
                            <li key={ty.topicType}>
                                <h2>{ty.topicType}</h2>
                                <ul className="home-page__content__types__topics">
                                    {
                                        ty.topicsByType.map(t =>
                                            <li key={t.id}>
                                                <Link to={'/course-list/' + t.id}>{t.title}</Link>
                                            </li>
                                        )
                                    }
                                </ul>
                            </li>
                        )
                    }
                </ul>
            </div>
        </div>
    );
}