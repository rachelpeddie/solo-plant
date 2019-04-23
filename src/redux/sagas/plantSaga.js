import axios from 'axios';
import { takeEvery, put } from 'redux-saga/effects';

function* addPlantSaga (action) {
    try {
        yield axios.post('/api/plants', action.payload);
        yield put({ type: 'GET_PLANTS' })
    }
    catch (error) {
        console.log(`sorry, couldn't add plant to database`, error);
    }
}

function* getPlantSaga (action) {
    try {
        const getPlantsResponse = yield axios.get('api/plants')
        yield put({ type: 'SET_PLANTS', payload: getPlantsResponse.data });
    }
    catch (error) {
        console.log(`sorry, couldn't load your plants`, error);
    }
}

function* plantSaga(){
    // yield takeEvery( 'GET_PLANTS', getPlantsSaga );
    yield takeEvery( 'ADD_PLANT', addPlantSaga );
    yield takeEvery( 'GET_PLANTS', getPlantSaga );
}

export default plantSaga;