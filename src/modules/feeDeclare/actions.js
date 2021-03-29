import {createAction, createThunkAction} from "../../lib/redux-utils";
import {get, postJson} from "../../lib/http";

const path = "/feeDeclare";
const ACTION_PREFIX = "FEE_DECLARE.";
export const query = createThunkAction(ACTION_PREFIX + "QUERY", params =>
    postJson(path + "/query", params)
);
export const select = createAction(ACTION_PREFIX + "SELECT");
export const showCreate = createAction(ACTION_PREFIX + "SHOW_CREATE");
export const hideCreate = createAction(ACTION_PREFIX + "HIDE_CREATE");

export const showEdit = createAction(ACTION_PREFIX + "SHOW_EDIT");
export const hideEdit = createAction(ACTION_PREFIX + "HIDE_EDIT");
export const updateFilter = createAction(ACTION_PREFIX + "UPDATE_FILTER");

export const create = createThunkAction(ACTION_PREFIX + "CREATE", params =>
    postJson(path + "/create", params)
);
export const getById = createThunkAction(ACTION_PREFIX + "GET", params =>
    get(path + "/" + params)
);
export const modify = createThunkAction(ACTION_PREFIX + "MODIFY", params =>
    postJson(path + "/modify", params)
);
export const reApproval = createThunkAction(ACTION_PREFIX + "RE_APPROVAL", params =>
    postJson(path + "/reApproval", params)
);