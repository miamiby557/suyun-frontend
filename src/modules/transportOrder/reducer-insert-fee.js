const defaultState = {
    visible: false,
    loading: false,
    model: {}
};
export default function insertFeeDeclare(state = defaultState, action) {
    const {type, payload, error} = action;
    switch (type) {
        case 'TRANSPORT_ORDER.SHOW_INSERT_FEE':
            return {...state, visible: true, model: {...payload}};
        case 'TRANSPORT_ORDER.HIDE_INSERT_FEE':
            return {...state, visible: false, model: {}};
        case 'TRANSPORT_ORDER.INSERT_FEE':
            if (error === true) {
                return {...state, loading: false, visible: true};
            }
            return {...state, loading: false, visible: false};
        case 'TRANSPORT_ORDER.INSERT_FEE_PENDING':
            return {...state, model: {...payload}, loading: true};
        default:
            return state;
    }
}

