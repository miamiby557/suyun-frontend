const defaultState = {
    visible: false,
    trackingVisible: false,
    model: {},
    trackingList: []
};
export default function modify(state = defaultState, action) {
    const {type, payload, error} = action;
    switch (type) {
        case 'TRANSPORT_ORDER.SHOW_EDIT':
            return {...state, visible: true};
        case 'TRANSPORT_ORDER.HIDE_EDIT':
            return {...state, visible: false, model: {}};
        case 'TRANSPORT_ORDER.SHOW_TRACKING_LIST':
            return {...state, trackingVisible: true};
        case 'TRANSPORT_ORDER.HIDE_TRACKING_LIST':
            return {...state, trackingVisible: false, trackingList: []};
        case 'TRANSPORT_ORDER.GET':
            if (error === true) {
                return {...state, loading: false, visible: true};
            }
            return {...state, visible: true, model: {...payload}};
        case 'TRANSPORT_ORDER.GET_TRACKING_LIST':
            if (error === true) {
                return {...state, loading: false};
            }
            return {...state, trackingList: [...payload]};
        case 'TRANSPORT_ORDER.MODIFY':
            if (error === true) {
                return {...state, loading: false, visible: true};
            }
            return {...state, loading: false, model: {}};
        case 'TRANSPORT_ORDER.GET_CAMERA':
            return {...state, cameraSource: payload};
        case 'TRANSPORT_ORDER.MODIFY_PENDING':
            return {...state, loading: true};
        default:
            return state;
    }
}

