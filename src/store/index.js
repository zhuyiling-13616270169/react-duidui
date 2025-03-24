import { init } from '@rematch/core';
import app from './modules/app';

const initialState = {};
const store = init({
    models: {
        app,
    },
    redux: {
        initialState
    }
});

export default store;
