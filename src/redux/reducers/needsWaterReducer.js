const needsWaterReducer = (state = [], action) => {
    switch (action.type) {
        case 'COUNT_NEEDS_WATER':
            return action.payload;
        default:
            return state;
    }
};

export default needsWaterReducer;