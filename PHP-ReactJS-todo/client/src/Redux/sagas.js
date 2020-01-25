import { takeLatest, takeEvery } from 'redux-saga/effects';

/** Middleware consts */
import { 
    LOAD_RECORDS_LIST, 
    LOAD_NEW_RECORD, 
    FETCH_EDIT_SINGLE_RECORD,
    FETCH_DELETE_SINGLE_RECORD
} from './constMiddleware';

/** AppReducer */
import { 
    fetchRecords, 
    fetchAddRecord, 
    fetchEditRecord, 
    fetchDeleteRecord 
} from '../Redux/appReducer/middleware';


function* initialApp(){
    yield takeLatest(LOAD_RECORDS_LIST, fetchRecords);
    yield takeEvery(LOAD_NEW_RECORD, fetchAddRecord);
    yield takeLatest(FETCH_EDIT_SINGLE_RECORD, fetchEditRecord);
    yield takeLatest(FETCH_DELETE_SINGLE_RECORD, fetchDeleteRecord);
}

export default initialApp;