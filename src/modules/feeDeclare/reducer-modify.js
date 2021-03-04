const defaultState = {
    visible: false,
    model: {}
};
export default function modify(state = defaultState, action) {
    const {type, payload, error} = action;
    switch (type) {

        case 'FEE_DECLARE.SHOW_EDIT':
            return {...state, visible: true};
        case 'FEE_DECLARE.HIDE_EDIT':
            return {...state, visible: false, model: {}};
        case 'FEE_DECLARE.GET':
            if (error === true) {
                return {...state, loading: false, visible: true};
            }
            return {...state, visible: true, model: {...payload}};
        case 'FEE_DECLARE.MODIFY':
            if (error === true) {
                return {...state, loading: false, visible: true};
            }
            return {...state, loading: false, model: {}};
        case 'FEE_DECLARE.MODIFY_PENDING':
            return {...state, loading: true};
        default:
            return state;
    }
}

