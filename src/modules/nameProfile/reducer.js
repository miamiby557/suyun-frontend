import {combineReducers} from "redux";
import list from "./reducer-list";
import create from "./reducer-create";
import modify from "./reducer-modify";

const reducer = combineReducers({
    list,
    create,
    modify
});

export default reducer;
