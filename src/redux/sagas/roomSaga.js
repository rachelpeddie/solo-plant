import axios from 'axios';
import { takeEvery, put } from 'redux-saga/effects'

function* getRoomsSaga(action) {
    try {
        const getRoomsResponse = yield axios.get('/api/plants/rooms')
        console.log(`got rooms from saga, woot!`, getRoomsResponse);
        yield put({ type: 'SET_ROOMS', payload: getRoomsResponse.data })
    }
    catch (error) {
        console.log(`error in getRoomsSaga`, error);
    }
}

function* roomSaga () {
    yield takeEvery('GET_ROOMS', getRoomsSaga);
}

export default roomSaga;