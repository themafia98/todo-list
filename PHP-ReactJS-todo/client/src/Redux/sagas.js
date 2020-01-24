import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { LOADING_APP } from "./appReducer/consts";
import { getRecordsList } from '../api';

function* fetchRecords(action){
    try {
        debugger;
        const todoList = yield call(getRecordsList, action.payload);
        yield put({type: LOADING_APP, payload: todoList });
    } catch(error){

    }
}

function* initialApp(){
    yield takeEvery("GET_RECORDS_LIST", fetchRecords);
}

export default initialApp;