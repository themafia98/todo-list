import { LOADING_APP } from './consts';

const initialState = {
    appLoading: false,
    list: []
};

const appReducer = (state = initialState, action) => {
    switch (action.type){
        case LOADING_APP: {
            return {
                ...state,
                list: [...action.payload]
            };
        }
        default: {
            return state;
        }
    }
};

export default appReducer;