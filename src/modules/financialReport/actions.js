import {createAction, createThunkAction} from "../../lib/redux-utils";
import {get, postJson} from "../../lib/http";

const path = "/order";
const ACTION_PREFIX = "FINANCIAL_REPORT.";
export const query = createThunkAction(ACTION_PREFIX + "QUERY", params =>
    postJson(path + "/query", params)
);
export const select = createAction(ACTION_PREFIX + "SELECT");

export const updateTime = createAction(ACTION_PREFIX + "UPDATE_TIME");
export const updateClientName = createAction(ACTION_PREFIX + "UPDATE_CLIENT_NAME");
export const updateCarrierName = createAction(ACTION_PREFIX + "UPDATE_CARRIER_NAME");
export const updateFilter = createAction(ACTION_PREFIX + "UPDATE_FILTER");

export const showInsert = createAction(ACTION_PREFIX + "SHOW_INSERT");
export const hideInsert = createAction(ACTION_PREFIX + "HIDE_INSERT");

export const showRPAInsert = createAction(ACTION_PREFIX + "SHOW_RPA_INSERT");
export const hideRPAInsert = createAction(ACTION_PREFIX + "HIDE_RPA_INSERT");

export const insertFeeDeclare = createThunkAction(ACTION_PREFIX + "INSERT", params =>
    postJson(path + "/insertFeeDeclare", params)
);
export const exportExcel = createThunkAction(ACTION_PREFIX + "EXPORT_EXCEL", params =>
    postJson(path + "/exportExcel", params)
);
export const getById = createThunkAction(ACTION_PREFIX + "GET",params =>
    get(path+"/"+params)
)
export const insertByRPA = createThunkAction(ACTION_PREFIX + "RPA_INSERT", params =>
    postJson(path + "/insertByRPA", params)
);