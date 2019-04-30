const plantList = (state = [''], action) => {
    switch (action.type) {
        case 'SET_PLANTS':
        console.log(`plantListReducer is`, action.payload);      
            return action.payload;
        default:
            return state;
    }
};

export default plantList;