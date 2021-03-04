const defaultState = {
    visible: false,
    loading: false,
    model: {}
};
export default function create(state = defaultState, action) {
    const {type,payload, error} = action;
    switch (type) {

        case 'TRANSPORT_ORDER_TRACK.SHOW_CREATE':
            return {...state, visible: true};
        case 'TRANSPORT_ORDER_TRACK.HIDE_CREATE':
            return {...state, visible: false, model: {}};
        case 'TRANSPORT_ORDER_TRACK.CREATE':
            if (error === true) {
                return {...state, loading: false, visible: true};
            }
            return {...state, loading: false, visible: false};
        case 'TRANSPORT_ORDER_TRACK.CREATE_PENDING':
            return {...state,model:payload, loading: true};
        default:
            return state;
    }
}

