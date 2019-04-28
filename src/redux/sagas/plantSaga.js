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

function* sortPlantSaga (action) {
    try {
        console.log(`sort plants is`, action.payload.id);
        
        const sortPlantsResponse = yield axios.get(`api/sort`, { params: { type: action.payload.type }})
        // yield put({ type: 'SORT_PLANTS', payload: sortPlantsResponse.data })
    }
    catch (error) {
        console.log(`sorry, couldn't sort your plants`, error)
    }
}

function* waterPlantSaga (action) {
    try {
        console.log(`in waterPlantSaga, payload is`, action.payload);
        
        yield axios.put(`api/water/${action.payload.plant_id}`, action.payload)
        yield put ({ type: 'GET_PLANTS' });
    }
    catch (error) {
        console.log(`sorry, couldn't update your plant status`, error);
    }
}

function* updatePlantSaga(action) {
    try {
        console.log(`in updatePlantSaga, payload is`, action.payload);

        yield axios.put(`api/plants/${action.payload.plant_id}`, action.payload)
        yield put({ type: 'GET_PLANTS' });
    }
    catch (error) {
        console.log(`sorry, couldn't update your plant status`, error);
    }
}

function* deletePlantSaga (action) {
    try {
        console.log(`in deletePlantSaga, payload is`, action.payload);
        yield axios.delete(`api/plants/${action.payload}`, action.payload)
        yield put({ type: 'GET_PLANTS' })
    }
    catch (error) {
        console.log(`sorry, couldn't delete your plant`, error);
        
    }
}

function* plantSaga(){
    yield takeEvery( 'DELETE_PLANT', deletePlantSaga );
    yield takeEvery( 'WATER_PLANT', waterPlantSaga );
    yield takeEvery( 'UPDATE_STATUS', updatePlantSaga );
    yield takeEvery( 'ADD_PLANT', addPlantSaga );
    yield takeEvery( 'GET_PLANTS', getPlantSaga );
    yield takeEvery( 'SORT_BY', sortPlantSaga)
}

export default plantSaga;