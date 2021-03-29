import {createAction, createThunkAction} from "../../lib/redux-utils";
import {get, postForm, postJson} from "../../lib/http";

const path = "/order";
const ACTION_PREFIX = "TRANSPORT_ORDER.";
export const query = createThunkAction(ACTION_PREFIX + "QUERY", params =>
    postJson(path + "/query", params)
);
export const showCreate = createAction(ACTION_PREFIX + "SHOW_CREATE");
export const hideCreate = createAction(ACTION_PREFIX + "HIDE_CREATE");

export const showInsertFee = createAction(ACTION_PREFIX + "SHOW_INSERT_FEE");
export const hideInsertFee = createAction(ACTION_PREFIX + "HIDE_INSERT_FEE");

export const showCreateTrack = createAction("TRANSPORT_ORDER_TRACK.SHOW_CREATE");
export const hideCreateTrack = createAction("TRANSPORT_ORDER_TRACK.HIDE_CREATE");

export const showEdit = createAction(ACTION_PREFIX + "SHOW_EDIT");
export const hideEdit = createAction(ACTION_PREFIX + "HIDE_EDIT");
export const select = createAction(ACTION_PREFIX + "SELECT");
export const updateModel = createAction(ACTION_PREFIX + "UPDATE_MODEL");
export const updateFilter = createAction(ACTION_PREFIX + "UPDATE_FILTER");
export const showTracking = createAction(ACTION_PREFIX + "SHOW_TRACKING_LIST");
export const hideTracking = createAction(ACTION_PREFIX + "HIDE_TRACKING_LIST");

export const create = createThunkAction(ACTION_PREFIX + "CREATE", params =>
    postJson(path + "/create", params)
);
export const createTrack = createThunkAction("TRANSPORT_ORDER_TRACK.CREATE", params =>
    postJson(path + "/addTracking", params)
);
export const getById = createThunkAction(ACTION_PREFIX + "GET", params =>
    get(path + "/" + params)
);

export const findByName = createThunkAction("NAME_PROFILE.FIND_BY_NAME", params =>
    postJson("/profile/findByName", params)
);
export const insertFee = createThunkAction(ACTION_PREFIX + "INSERT_FEE", params =>
    postJson("/feeDeclare/create", params)
);

export const getTrackingListById = createThunkAction(ACTION_PREFIX + "GET_TRACKING_LIST", params =>
    get(path + "/getTrackingList/" + params)
);
export const modify = createThunkAction(ACTION_PREFIX + "MODIFY", params =>
    postJson(path + "/update", params)
);
export const orderImport = createThunkAction(ACTION_PREFIX + "IMPORT", params =>
    postForm(path + "/orderImport", params)
);
export const getClientList = createThunkAction(ACTION_PREFIX+"GET_CLIENT",()=>
    get("/home/clientList")
);
export const getCarrierList = createThunkAction(ACTION_PREFIX+"GET_CARRIER",()=>
    get("/home/carrierList")
);
