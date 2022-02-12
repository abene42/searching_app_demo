import {pageMessageActionTypes} from "./page-message.action.types";

const INITIAL_STATE = {
    isLoading: false,
    message: null
}

const pageMessageReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case pageMessageActionTypes.SHOW_MESSAGE:
            return {
                ...state,
                message: action.payload,
                isLoading: false,
            }
        case pageMessageActionTypes.HIDE_MESSAGE:
            return {
                ...state,
                message: null,
                isLoading: false,
            }
        case pageMessageActionTypes.SHOW_LOADING_ANIMATION:
            return {
                ...state,
                isLoading: true,
                message: null
            }
        case pageMessageActionTypes.HIDE_LOADING_ANIMATION:
            return {
                ...state,
                isLoading: false,
            }
        default:
            return state
    }
}

export default pageMessageReducer;