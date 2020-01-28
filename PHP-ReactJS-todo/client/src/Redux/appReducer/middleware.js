import { call, put } from 'redux-saga/effects';
import { LOAD_RECORDS, ADD_NEW_RECORD,EDIT_RECORD } from "./const";
import { REQUEST_FAIL_ACTION, DELETE_RECORD_DONE, DONE_REG, LOAD_SESSION } from "../appReducer/const";
import { 
    getRecordsList, 
    addRecord, 
    onEditRecord, 
    deleteRecord, 
    fetchRegistration,
    fetchLogin,
    fetchUserSession
} from '../../api';

function* fetchRecords(action){
    try {
        const todoList = yield call(getRecordsList, action.payload);
        yield put({type: LOAD_RECORDS, payload: todoList });
    } catch(error){
        yield put ({type: REQUEST_FAIL_ACTION, payload: error.message});
    }
}

function* fetchAddRecord(action){
    try {
        const rewriteTodoList = yield call(addRecord, action.payload);
        yield put({type: ADD_NEW_RECORD, payload: rewriteTodoList});
    } catch(error){
        yield put ({type: REQUEST_FAIL_ACTION, payload: error.message});
    }
}

function* fetchEditRecord(action){
    try {
        const updateRecordsList = yield call(onEditRecord, action.payload);
        yield put({type: EDIT_RECORD, payload: updateRecordsList });
    } catch(error){
        yield put ({type: REQUEST_FAIL_ACTION, payload: error.message});
    }
}

function* fetchDeleteRecord(action){
    try {
        const refreshRecordsList = yield call(deleteRecord, action.payload);
        yield put({type: DELETE_RECORD_DONE, payload: refreshRecordsList});
    } catch(error){
        yield put({type: REQUEST_FAIL_ACTION, payload: error.message});
    }
}

function* fetchRegUser(action){
    try {
        const response = yield call(fetchRegistration, action.payload);
        yield put({type: DONE_REG, payload: response });
    } catch (error){
        yield put({type: REQUEST_FAIL_ACTION, payload: error.message});
    }
}

function* fetchLoginUser(action){
    try {
        const loginResponse = yield call(fetchLogin, action.payload);
        yield put({type: LOAD_SESSION, payload: loginResponse});
    } catch(error){
        yield put({type: REQUEST_FAIL_ACTION, payload: error.message});
    }
}

function* fetchSession(action){
    try {
        const uid = yield call(fetchUserSession);

        yield put({type: LOAD_SESSION, payload: { uid }});
    } catch(error){
         yield put({type: REQUEST_FAIL_ACTION, payload: null });
    }
}


export { 
    fetchRecords, 
    fetchAddRecord, 
    fetchEditRecord, 
    fetchDeleteRecord, 
    fetchRegUser,
    fetchLoginUser,
    fetchSession
};