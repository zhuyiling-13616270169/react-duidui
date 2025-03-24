const app = {
    state: {
        userInfo: {},
        menuList: [],
        routeList: [],
    },
    reducers: {
        setUserInfo (state, payload) {
            return {
                ...state,
                userInfo: payload
            };
        },
        setMenus (state, payload) {
            return {
                ...state,
                menuList: payload
            };
        },
        setRoutes (state, payload) {
            return {
                ...state,
                routeList: payload
            };
        },
    }
};

export default app;
