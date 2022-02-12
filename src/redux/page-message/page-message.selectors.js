import {createSelector} from "reselect";

const selectPageMessage = (state) => state.pageMessage

export const selectIsLoading = createSelector([selectPageMessage], (pageMessage)=> pageMessage.isLoading)

export const selectMessage = createSelector([selectPageMessage], (pageMessage)=> pageMessage.message)