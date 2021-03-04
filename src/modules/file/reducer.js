const defaultState = {
    loading: false,
    fileList:[],
    path:"根目录",
    directoryList:[],
    visible: false
};

export default function home(state = defaultState, action) {
    const {type, payload} = action;
    switch (type) {
        case 'FILE.LIST':
            return {...state, fileList: [...payload]};
        case 'FILE.SET_PATH':
            return {...state, path: payload};
        case 'FILE.SET_DIRECTORY':
            return {...state, directoryList: [...payload]};
        case 'FILE.CREATE_PATH_SHOW':
            return {...state, visible: true};
        case 'FILE.CREATE_PATH_HIDE':
            return {...state, visible: false};
        default:
            return state;
    }
}
