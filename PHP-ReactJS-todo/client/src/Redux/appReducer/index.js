import { 
    LOAD_RECORDS, 
    ADD_NEW_RECORD, 
    REQUEST_FAIL_ACTION, 
    CLEAR_STATUS, 
    EDIT_RECORD,
    DELETE_RECORD_DONE
} from './const';

const initialState = {
    list: [],
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
                status: action.payload
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