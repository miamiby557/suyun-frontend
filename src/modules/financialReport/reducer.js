import {combineReducers} from "redux";
import list from "./reducer-list";
import insertFeeDeclare from "./reducer-insert";
import insertByRPA from "./reducer-rpa-insert";
import exportReceivable from "./reducer-export-receivable";

const reducer = combineReducers({
    list,
    insertFeeDeclare,
    insertByRPA,
    exportReceivable
});

export default reducer;
