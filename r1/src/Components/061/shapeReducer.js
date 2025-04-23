export default function shapeReducer(state, action) {

    let newState = structuredClone(state); // gilus klonavimas

    switch (action.type) {
        case 'SIZE':
            newState.size = action.payload;
            break;
        case 'COLOR':
            newState.color = action.payload;
            break;
        case 'FORM':
            newState.shape = action.payload;
            break;
        case 'ALL':
            newState.shape = action.payload.shapeForm;
            newState.color = action.payload.color;
            newState.size = action.payload.size;
            break;
        case 'DEFAULT':
            newState = action.payload;
            break;



        default:
    }



    return newState;
}