import {searchActionTypes} from "./search.action.types";

export const startSearching = () => ({
    type: searchActionTypes.SEARCH_START,
    payload: true
})

export const endSearching = () => ({
    type: searchActionTypes.SEARCH_END,
    payload: false
})

export const toggleSearching = () => ({
    type: searchActionTypes.TOGGLE_SEARCHING,
})