import { useLocation } from 'react-router';
import Main from './Main';

export default function LayoutLoader() {

    const layoutsMap = [
        { path: '/', layout: <Main /> }
    ];

    const { pathname } = useLocation();


    const layout = layoutsMap.find(m => m.path === pathname)?.layout ?? <Main />


    return <>{layout}</>


}