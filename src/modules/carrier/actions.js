import {createAction, createThunkAction} from "../../lib/redux-utils";
import {get, postJson} from "../../lib/http";

export const showCreate = createAction("CARRIER.SHOW_CREATE");
export const hideCreate = createAction("CARRIER.HIDE_CREATE");
export const showModify = createAction("CARRIER.SHOW_MODIFY");
export const hideModify = createAction("CARRIER.HIDE_MODIFY");
export const select = createAction("CARRIER.SELECT");

export const getById = createThunkAction('CARRIER.GET', params =>
    get('/carrier/' + params)
);
export const query = createThunkAction("CARRIER.QUERY", () =>
    get("/carrier/query")
);
export const modify = createThunkAction("CARRIER.MODIFY", params =>
    postJson("/carrier/modify", params)
);
export const create = createThunkAction("CARRIER.CREATE", params =>
    postJson("/carrier/create", params)
);
export const del = createThunkAction("", params =>
    get("/carrier/delete/" + params)
);

