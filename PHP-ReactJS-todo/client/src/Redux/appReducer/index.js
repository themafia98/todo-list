import { 
    LOAD_RECORDS, 
    ADD_NEW_RECORD, 
    REQUEST_FAIL_ACTION, 
    CLEAR_STATUS, 
    EDIT_RECORD,
    DELETE_RECORD_DONE,
    DONE_REG,
    LOAD_SESSION
} from './const';

const initialState = {
    list: [],
    uid: null,
    loadingApp: false,
    sessionLoading: false,
    status: null
};

const appReducer = (state = initialState, action) => {
    switch (action.type){
        case LOAD_RECORDS: {
            return {
                ...state,
                list: [...action.payload]
            };
        }
        case ADD_NEW_RECORD: {
            return {
                ...state,
                list: [...action.payload],
                status: "Запись успешно создана"
            }
        }

        case LOAD_SESSION: {
            const { uid = "" } = action.payload || {};

            return {
                ...state,
                loadingApp: true,
                uid: uid ? uid : null,
                sessionLoading: uid ? true : false,
            }
        }

        case EDIT_RECORD: {
            return {
                ...state,
                list: [...action.payload],
                status: "Запись успешно обновлена"
            }
        }

        case DELETE_RECORD_DONE: {
            return {
                ...state,
                list: [...action.payload],
                status: "Запись успешно удалена"
            }
        }

        case REQUEST_FAIL_ACTION: {
            return {
                ...state,
                loadingApp: true,
                status: action.payload
            }
        }
        
        case DONE_REG: {
            const { userId = "" } = action.payload || {};

            return {
                ...state,
                uid: userId ? userId : null,
                status: "Регистрация прошла успешна"
            }
        }
        case CLEAR_STATUS: {
            return {
                ...state,
                status: null
            }
        }
        default: {
            return state;
        }
    }
};

export default appReducer;