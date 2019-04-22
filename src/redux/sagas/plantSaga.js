import axios from 'axios';
import { takeEvery, put } from 'redux-saga/effects';

function* addPlantSaga (action) {
    try {
        yield axios.post('/api/plants', action.payload);
        // yield put({type: 'GET_PLANTS'})
    }
    catch (error) {
        console.log(`sorry, couldn't add plant to database`, error);
    }
}

function* plantSaga(){
    // yield takeEvery( 'GET_PLANTS', getPlantsSaga );
    yield takeEvery( 'ADD_PLANT', addPlantSaga );
}

export default plantSaga;