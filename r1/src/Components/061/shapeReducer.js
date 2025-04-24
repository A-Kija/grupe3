import * as C from './constants';

export default function shapeReducer(state, action) {

    let newState = structuredClone(state); // gilus klonavimas

    switch (action.type) {
        case C.SIZE:
            newState.size = action.payload;
            break;
        case C.COLOR:
            newState.color = action.payload;
            break;
        case C.FORM:
            newState.shape = action.payload;
            break;
        case C.ALL:
            newState.shape = action.payload.shapeForm;
            newState.color = action.payload.color;
            newState.size = action.payload.size;
            break;
        case C.DEFAULT:
            newState = action.payload;
            break;



        default:
    }



    return newState;
}