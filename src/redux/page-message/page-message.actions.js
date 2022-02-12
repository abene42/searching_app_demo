import {pageMessageActionTypes} from "./page-message.action.types";

export const showPageMessage = (message) => ({
    type: pageMessageActionTypes.SHOW_MESSAGE,
    payload: message
})

export const hidePageMessage = () => ({
    type: pageMessageActionTypes.HIDE_MESSAGE
})

export const showLoadingAnimation = () => ({
    type: pageMessageActionTypes.SHOW_LOADING_ANIMATION
})

export const hideLoadingAnimation = () => ({
    type: pageMessageActionTypes.HIDE_LOADING_ANIMATION
})