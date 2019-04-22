
import axios from 'axios';
import { takeEvery, put } from 'redux-saga/effects'

function* getSunSaga(action) {
    try {
        const getSunResponse = yield axios.get('/api/plants/sun')
        console.log(`got sunlight requirements from saga, woot!`, getSunResponse);
        yield put({ type: 'SET_SUN', payload: getSunResponse.data })
    }
    catch (error) {
        console.log(`error in getSunSaga`, error);
    }
}

function* sunSaga () {
    yield takeEvery('GET_SUN', getSunSaga);
}

export default sunSaga;