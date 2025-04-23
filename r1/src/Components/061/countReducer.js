export default function countReducer(state, action) {

    let naujasState;

    switch (action.type) {
        case 'pliusVienas':
            naujasState = state + 1;
            break;
        case 'minusVienas':
            naujasState = state - 1;
            break;
        case 'dalyba2.33':
            naujasState = state  / 2.33;
            break;
        case 'plusX':
            const x = parseFloat(action.payload);
            naujasState = state + x;
            break;
        default:
            naujasState = state;
    }


    return naujasState;
}