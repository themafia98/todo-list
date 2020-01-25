import { takeLatest, takeEvery } from 'redux-saga/effects';

/** Middleware consts */
import { LOAD_RECORDS_LIST, LOAD_NEW_RECORD } from './constsMiddleware';

/** AppReducer */
import { fetchRecords, fetchAddRecord } from '../Redux/appReducer/middleware';


function* initialApp(){
    yield takeLatest(LOAD_RECORDS_LIST, fetchRecords);
    yield takeEvery(LOAD_NEW_RECORD, fetchAddRecord);
}

export default initialApp;