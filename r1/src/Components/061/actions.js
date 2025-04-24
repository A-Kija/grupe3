import * as C from './constants';

export const changeSize = payload => {
    const action = {
        type: C.SIZE,
        payload
    }
    return action;
}