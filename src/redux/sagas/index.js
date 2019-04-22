import { all } from 'redux-saga/effects';

// individual saga imports
import loginSaga from './loginSaga';
import registrationSaga from './registrationSaga';
import userSaga from './userSaga';
import roomSaga from './roomSaga';
import sunSaga from './sunSaga';
import plantSaga from './plantSaga';

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(),
    registrationSaga(),
    userSaga(),
    roomSaga(),
    sunSaga(),
    plantSaga(),
  ]);
}
