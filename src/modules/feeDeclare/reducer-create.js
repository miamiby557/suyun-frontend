const defaultState = {
    visible: false,
    loading: false,
    model: {}
};
export default function create(state = defaultState, action) {
    const {type, payload, error} = action;
    switch (type) {
        case 'FEE_DECLARE.SHOW_CREATE':
            return {...state, visible: true, model: {...payload}};
        case 'FEE_DECLARE.HIDE_CREATE':
            return {...state, visible: false, model: {}};
        case 'FEE_DECLARE.CREATE':
            if (error === true) {
                return {...state, loading: false, visible: true};
            }
            return {...state, loading: false, visible: false};
        case 'FEE_DECLARE.CREATE_PENDING':
            return {...state, model: payload, loading: true};
        default:
            return state;
    }
}

