import {createAction, createThunkAction} from "../../lib/redux-utils";
import {postForm, postJson} from "../../lib/http";

export const fileList = createThunkAction("FILE.LIST", params =>
    postJson("/file/searchPath", params)
);

export const createPath = createThunkAction("FILE.CREATE_PATH", params =>
    postJson("/file/createPath", params)
);
export const uploadFile = createThunkAction(+"FILE.UPLOAD_FILE", params =>
    postForm("/file/uploadFile", params)
);
export const deletePath = createThunkAction("FILE.DELETE_PATH", params =>
    postJson("/file/deletePath", params)
);
export const deleteFile = createThunkAction("FILE.DELETE_FILE", params =>
    postJson("/file/deleteFile", params)
);
export const setPath = createAction("FILE.SET_PATH");
export const pathShow = createAction("FILE.CREATE_PATH_SHOW");
export const pathHide = createAction("FILE.CREATE_PATH_HIDE");




