import {combineReducers} from "redux";
import list from "./reducer-list";
import create from "./reducer-create";
import createTrack from "./reducer-create-track";
import insertFee from "./reducer-insert-fee";
import modify from "./reducer-modify";

const reducer = combineReducers({
    list,
    modify,
    create,
    createTrack,
    insertFee
});

export default reducer;
