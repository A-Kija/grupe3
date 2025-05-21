import { useLocation, useParams } from 'react-router';
import Main from './Main';

export default function LayoutLoader() {

    const layoutsMap = [
        { path: '', layout: <Main /> },
        { path: 'course-list', layout: <Main /> }
    ];

    const { pathname } = useLocation();
    const toMap = pathname.split('/')[1];
    const layout = layoutsMap.find(m => m.path === toMap)?.layout ?? <Main />

    return <>{layout}</>
}