import { useLocation } from 'react-router';
import Main from './Main';
import Full from './Full';

export default function LayoutLoader() {

    const layoutsMap = [
        { path: '', layout: <Main /> },
        { path: 'course-list', layout: <Main /> },
        { path: 'course', layout: <Main /> },
        { path: 'part', layout: <Main /> },
        { path: 'register', layout: <Full /> }
    ];

    const { pathname } = useLocation();
    const toMap = pathname.split('/')[1];
    const layout = layoutsMap.find(m => m.path === toMap)?.layout ?? <Main />

    return <>{layout}</>
}