import axios from 'axios';
import { put } from 'redux-saga/effects'

function* getRoomsSaga(action) {
    try {
        const getRoomsResponse = yield axios.get('/rooms')
        console.log(`got rooms from saga, woot!`, getRoomsResponse);
        yield put({ type: 'SET_ROOMS', payload: getRoomsResponse.data })
    }
    catch (error) {
        console.log(`error in getRoomsSaga`, error);
    }
}

export default getRoomsSaga;