import {combineReducers} from "redux";
import list from "./reducer-list";
import modify from "./reducer-modify";

const reducer = combineReducers({
    list,
    modify
});

export default reducer;
