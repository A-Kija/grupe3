import { useEffect, useContext, useRef } from 'react';
import { Link, useParams, useNavigate } from 'react-router';
import Data from '../Data/Data';
import { getPartContentByPartId } from '../Actions/courses';
import * as C from '../Constants/main';

export default function Part() {

    const { partId } = useParams();
    const navigate = useNavigate();

    const pageLoaded = useRef(false);


    const { parts, dispachParts, partRequest, part } = useContext(Data);


    useEffect(_ => {
        console.log('GET PART CONTENT');
        partRequest(partId);
    }, []);

    useEffect(_ => {
        if (!pageLoaded.current) {
            pageLoaded.current = true;
            return;
        }


        dispachParts(getPartContentByPartId(part, partId));

    }, [part]);


    const displayPart = parts.find(p => p.partId == partId);

    console.log('displayPart', displayPart);


    if (!displayPart) {
        return (
            <div>Loading...</div>
        );
    }



    return (
        <div className="part-page">
            <div className="part-page__content">
                <h1>
                    <span className="part-title">{displayPart.partTitle}</span>
                    <Link to={'/course/' + displayPart.courseId} className="course-title">Course: {displayPart.courseTitle}</Link>
                    <span className="part-number">Part No: {displayPart.partNumber}</span>
                </h1>
                <ul className="part-page__content__list">
                    {
                        displayPart.content.map(c =>
                            <li key={c.id}>
                                {
                                    c.video !== null
                                        ?
                                        <h2>{c.video}</h2>
                                        :
                                        ''
                                }
                                {
                                    c.image !== null
                                        ?
                                        <img src={C.SERVER_IMAGES_URL + c.image} />
                                        :
                                        ''
                                }
                                {
                                    c.textBlock !== null
                                        ?
                                        <p>{c.textBlock}</p>
                                        :
                                        ''
                                }
                            </li>
                        )
                    }
                </ul>
            </div>
        </div>
    );

}
