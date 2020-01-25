import { LOADING_APP, ADD_NEW_RECORD } from './consts';

const initialState = {
    appLoading: false,
    list: []
};

const appReducer = (state = initialState, action) => {
    switch (action.type){
        case LOADING_APP: {
            return {
                ...state,
                appLoading: action.payload ? true : false,
                list: [...action.payload]
            };
        }
        case ADD_NEW_RECORD: {
            return {
                ...state,
                list: [...action.payload]
            }
        }
        default: {
            return state;
        }
    }
};

export default appReducer;