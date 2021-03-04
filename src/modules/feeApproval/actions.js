import {createAction, createThunkAction} from "../../lib/redux-utils";
import {get, postJson} from "../../lib/http";

const path = "/feeDeclare";
const ACTION_PREFIX = "FEE_APPROVAL.";
export const query = createThunkAction(ACTION_PREFIX + "QUERY", params =>
    postJson(path + "/querySubmit", params)
);
export const select = createAction(ACTION_PREFIX + "SELECT");
export const showEdit = createAction(ACTION_PREFIX + "SHOW_EDIT");
export const hideEdit = createAction(ACTION_PREFIX + "HIDE_EDIT");

export const create = createThunkAction(ACTION_PREFIX + "CREATE", params =>
    postJson(path + "/create", params)
);
export const getById = createThunkAction(ACTION_PREFIX + "GET", params =>
    get(path + "/" + params)
);
export const modify = createThunkAction(ACTION_PREFIX + "MODIFY", params =>
    postJson(path + "/modify", params)
);
export const passed = createThunkAction(ACTION_PREFIX + "PASSED", params =>
    postJson(path + "/passed", params)
);
export const reject = createThunkAction(ACTION_PREFIX + "REJECT", params =>
    postJson(path + "/reject", params)
);