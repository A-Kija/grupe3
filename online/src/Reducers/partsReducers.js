import * as T from '../Constants/types';

export default function partsReducer(state, action) {

    const newState = structuredClone(state);

    switch (action.type) {
        case T.ADD_PART:
            {
                const hasPartId = newState.some(p => p.partId === action.partId);
                if (hasPartId) {
                    break;
                }
                newState.push(action.part);
            }
            break;
        default:
    }


    return newState;

}