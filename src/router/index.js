import { useState, useRef, useEffect, lazy, useCallback } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Layout from '@/components/layout';
import CustomRouter from '@/components/customRouter';
import { usePublish } from '@/utils/usePubSub';
import { GET_USER_INFO} from '@/services';
import history from './history';
import mock from './mock';

function App () {
    const listerner = useRef();
    const [routes, setRoutes] = useState([]);
    const dispatch = useDispatch();
    const publish = usePublish();

    const fetchBasic = async () => {
        // const userData= axios.get({
        //     url: GET_USER_INFO,
        // });
        const userData={
            userName: '蘑菇蘑菇',
            region: '苏州 - 吴中社区'
        };
        
        let routerData = mock;
        let routerDatas = mock;
        routerDatas = routerData.concat({
            router: '/noauth',
            name: '暂无权限',
            display: false
        });
        setRoutes(routerDatas.concat({
            router: '*',
            name: 'Not Found',
            display: false
        }));
        dispatch.app.setUserInfo(userData);
        dispatch.app.setMenus(routerDatas);
        const routeList = flattenRoute(routerDatas);
        dispatch.app.setRoutes(routeList);

        let defaultRouter = '/noauth';

        for (let i = 0; i < routeList.length; i++) {
            if (routeList[i].display && !routeList[i].hasChildrenPage) {
                defaultRouter = routeList[i].router;
                break;
            }
        }
        const pathname = history.location.pathname === '/' ?
            defaultRouter
            : history.location.pathname + history.location.search;
        history.push(pathname);
        requestIdleCallback(() => onLocationChange({ location: history.location, action: 'PUSH' }));
    };

    const onLocationChange = ({ location, action }) => {
        location.pathname !== '/' && (action === 'PUSH' || action === 'POP') && publish('PAGE_PUSH', location);
        location.pathname !== '/' && action === 'REPLACE' && publish('PAGE_REPLACE', location);
    };

    const generateRoute = useCallback((target) => {
        const flattenRouteTree = (target) => {
            const routes = [];
            const fn = (target) => {
                target.forEach(item => {
                    routes.push({
                        router: item.router,
                        name: item.name,
                        component: !item.router || item.router === '*' ? '/notFound' : item.router,
                        hasChildrenPage: item.children?.length && item.children.some(it => it.display == true),
                    });
                    item.children?.length && fn(item.children);
                });
            }
            fn(target);
            return routes;
        };

        const routes = flattenRouteTree(target).map(item => {
            const Comp = typeof item.component === 'string' ? lazy(() => import(`@/pages${item.component}`)) : item.component;
            return (
                <Route
                    path={item.router}
                    key={item.router}
                    element={<Comp />}
                />
            );
        });

        return (
            <Route
                path='/'
                title='react-duidui'
                element={<Layout />}
                children={routes}
            />
        );
    }, []);

    const flattenRoute = useCallback((target) => {
        const routes = [];
        const fn = (target) => {
            target.forEach(item => {
                routes.push({
                    name: item.name,
                    router: item.router,
                    display: item.display,
                    hasChildrenPage: item.children?.length && item.children.some(it => it.display == true),
                });
                item.children?.length && fn(item.children);
            });
        }
        fn(target);

        return routes;
    }, []);

    const clientHandle = ({ type, payload }) => {
        if (type === 'refresh') {
            window.location.reload();
        } else if (type === 'link') {
            history.push(payload.fullPath);
        }
    };

    useEffect(() => {
        fetchBasic();
        listerner.current = history.listen(onLocationChange);
        window.desktop?.receive('appMessage', clientHandle);

        return () => {
            listerner.current();
            window.desktop?.remove('appMessage', clientHandle);
        };
    }, []);

    return (
        <CustomRouter history={history}>
            <Routes>
                {generateRoute(routes)}
            </Routes>
        </CustomRouter>
    );
}

export default App;
