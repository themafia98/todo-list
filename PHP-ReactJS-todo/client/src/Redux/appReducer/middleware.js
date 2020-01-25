import { call, put } from 'redux-saga/effects';
import { LOADING_APP, REQUEST_FAIL_ACTION, ADD_NEW_RECORD } from "./consts";
import { getRecordsList, addRecord } from '../../api';

function* fetchRecords(action){
    try {
        const todoList = yield call(getRecordsList, action.payload);
        yield put({type: LOADING_APP, payload: todoList });
    } catch(error){
        yield put ({REQUEST_FAIL_ACTION, payload: error.message});
    }
}

function* fetchAddRecord(action){
    try {
        const rewriteTodoList = yield call(addRecord, action.payload);
        yield put({type: ADD_NEW_RECORD, payload: rewriteTodoList});
    } catch(error){
        yield put ({REQUEST_FAIL_ACTION, payload: error.message});
    }
}

export { fetchRecords, fetchAddRecord };