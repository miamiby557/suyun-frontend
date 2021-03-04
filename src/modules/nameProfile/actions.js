import {createAction, createThunkAction} from "../../lib/redux-utils";
import {get, postJson} from "../../lib/http";

export const showCreate = createAction("NAME_PROFILE.SHOW_CREATE");
export const hideCreate = createAction("NAME_PROFILE.HIDE_CREATE");
export const showModify = createAction("NAME_PROFILE.SHOW_MODIFY");
export const hideModify = createAction("NAME_PROFILE.HIDE_MODIFY");
export const select = createAction("NAME_PROFILE.SELECT");

export const getById = createThunkAction('NAME_PROFILE.GET', params =>
    get('/profile/' + params)
);
export const query = createThunkAction("NAME_PROFILE.QUERY", params =>
    postJson("/profile/query",params)
);
export const modify = createThunkAction("NAME_PROFILE.MODIFY", params =>
    postJson("/profile/update", params)
);
export const create = createThunkAction("NAME_PROFILE.CREATE", params =>
    postJson("/profile/create", params)
);
export const del = createThunkAction("",params =>
    get("/profile/delete/"+params)
);

