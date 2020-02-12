import { takeLatest, takeEvery } from 'redux-saga/effects';

/** Middleware consts */
import { 
    LOAD_RECORDS_LIST, 
    LOAD_NEW_RECORD, 
    FETCH_EDIT_SINGLE_RECORD,
    FETCH_DELETE_SINGLE_RECORD,
    FETCH_LOGIN,
    FETCH_REG,
    FETCH_SESSION,
    FETCH_UPDATE_LIST
} from './constMiddleware';

/** AppReducer */
import { 
    fetchRecords, 
    fetchAddRecord, 
    fetchEditRecord, 
    fetchDeleteRecord,
    fetchLoginUser,
    fetchRegUser,
    fetchSession,
    fetchUpdateItems
} from '../Redux/appReducer/middleware';


function* initialApp(){
    yield takeLatest(LOAD_RECORDS_LIST, fetchRecords);
    yield takeEvery(LOAD_NEW_RECORD, fetchAddRecord);
    yield takeLatest(FETCH_EDIT_SINGLE_RECORD, fetchEditRecord);
    yield takeLatest(FETCH_DELETE_SINGLE_RECORD, fetchDeleteRecord);
    yield takeLatest(FETCH_LOGIN, fetchLoginUser);
    yield takeLatest(FETCH_REG, fetchRegUser);
    yield takeLatest(FETCH_SESSION, fetchSession);
    yield takeLatest(FETCH_UPDATE_LIST, fetchUpdateItems);
}

export default initialApp;