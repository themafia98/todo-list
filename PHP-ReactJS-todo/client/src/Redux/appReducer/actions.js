
import { 
    LOAD_RECORDS_LIST, 
    LOAD_NEW_RECORD, 
    FETCH_EDIT_SINGLE_RECORD, 
    FETCH_DELETE_SINGLE_RECORD,
    FETCH_LOGIN,
    FETCH_REG
} from '../constMiddleware';

import { CLEAR_STATUS } from "./const";

const loadRecordList = payload => {
    return {
        type: LOAD_RECORDS_LIST
    }
};

const loadNewRecord = payload => {
    return {
        type: LOAD_NEW_RECORD, 
        payload 
    }
}

const editRecord = payload => {
    return {
        type: FETCH_EDIT_SINGLE_RECORD,
        payload
    }
}

const clearStatus = () => {
    return {
        type: CLEAR_STATUS
    }
}

const deleteRecord = payload => {
    return {
        type: FETCH_DELETE_SINGLE_RECORD,
        payload
    }
}

const loginUser = payload => {
    return {
        type: FETCH_LOGIN,
        payload
    }
}

const regUser = payload => {
    return {
        type: FETCH_REG,
        payload
    }
}

export { 
    loadRecordList, 
    loadNewRecord, 
    editRecord, 
    clearStatus, 
    deleteRecord,
    loginUser,
    regUser
 };