import {combineReducers} from "redux";
import searchReducer from "./search/search.reducer";
import pageMessageReducer from "./page-message/page-message.reducer";

export default combineReducers({
    search: searchReducer,
    pageMessage: pageMessageReducer,
});