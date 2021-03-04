import {createAction, createThunkAction} from "../../lib/redux-utils";
import {get, postJson} from "../../lib/http";

export const showCreate = createAction("CLIENT.SHOW_CREATE");
export const hideCreate = createAction("CLIENT.HIDE_CREATE");
export const showModify = createAction("CLIENT.SHOW_MODIFY");
export const hideModify = createAction("CLIENT.HIDE_MODIFY");
export const select = createAction("CLIENT.SELECT");

export const getById = createThunkAction('CLIENT.GET', params =>
    get('/client/' + params)
);
export const query = createThunkAction("CLIENT.QUERY", () =>
    get("/client/query")
);
export const modify = createThunkAction("CLIENT.MODIFY", params =>
    postJson("/client/modify", params)
);
export const create = createThunkAction("CLIENT.CREATE", params =>
    postJson("/client/create", params)
);
export const del = createThunkAction("", params =>
    get("/client/delete/" + params)
);

