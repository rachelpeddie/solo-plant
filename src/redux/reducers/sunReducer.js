const sunReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_SUN':
            return action.payload;
        default:
            return state;
    }
}

export default sunReducer;