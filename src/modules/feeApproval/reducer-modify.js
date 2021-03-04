const defaultState = {
    visible: false,
    model: {},
    cameraSource:[]
};
export default function modify(state = defaultState, action) {
    const {type, payload, error} = action;
    switch (type) {

        case 'FEE_APPROVAL.SHOW_EDIT':
            return {...state, visible: true};
        case 'FEE_APPROVAL.HIDE_EDIT':
            return {...state, visible: false, model: {}};
        case 'FEE_APPROVAL.GET':
            if (error === true) {
                return {...state, loading: false, visible: true};
            }
            return {...state, visible: true, model: {...payload}};
        case 'FEE_APPROVAL.MODIFY':
            if (error === true) {
                return {...state, loading: false, visible: true};
            }
            return {...state, loading: false};
        case 'FEE_APPROVAL.MODIFY_PENDING':
            return {...state, loading: true};
        default:
            return state;
    }
}

