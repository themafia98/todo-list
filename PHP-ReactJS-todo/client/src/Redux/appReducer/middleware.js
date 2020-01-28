import { call, put } from 'redux-saga/effects';
import { LOAD_RECORDS, ADD_NEW_RECORD,EDIT_RECORD } from "./const";
import { REQUEST_FAIL_ACTION, DELETE_RECORD_DONE, DONE_REG } from "../appReducer/const";
import { 
    getRecordsList, 
    addRecord, 
    onEditRecord, 
    deleteRecord, 
    fetchRegistration,
    fetchLogin
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
        yield call(fetchRegistration, action.payload);
        yield put({type: DONE_REG, payload: action.payload});
    } catch (error){
        yield put({type: REQUEST_FAIL_ACTION, payload: error.message});
    }
}

function* fetchLoginUser(action){
    try {
        const loginResponse = yield call(fetchLogin, action.payload);

    } catch(error){
        yield put({type: REQUEST_FAIL_ACTION, payload: error.message});
    }
}


export { 
    fetchRecords, 
    fetchAddRecord, 
    fetchEditRecord, 
    fetchDeleteRecord, 
    fetchRegUser,
    fetchLoginUser,
};