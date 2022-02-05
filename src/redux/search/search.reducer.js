import {searchActionTypes} from "./search.action.types";

const INITIAL_STATE = {
    isSearching: false,
}

const searchReducer = (state= INITIAL_STATE,action)=>{
    switch (action.type) {
        case searchActionTypes.TOGGLE_SEARCHING:
            return{
                ...state,
                isSearching: !state.isSearching,
            }
        case searchActionTypes.SEARCH_START:
        case searchActionTypes.SEARCH_END:
            return {
                ...state,
                isSearching: action.payload,
            }
        default:
            return state
    }
}

export default searchReducer;