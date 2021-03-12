import moment from "moment";

const defaultState = {
    visible: false,
    loading: false,
    model: {}
};
export default function create(state = defaultState, action) {
    const {type, payload, error} = action;
    switch (type) {
        case 'TRANSPORT_ORDER.SHOW_CREATE':
            return {...state, visible: true,model:{deliveryDate:moment()}};
        case 'TRANSPORT_ORDER.HIDE_CREATE':
            return {...state, visible: false, model: {}};
        case 'TRANSPORT_ORDER.UPDATE_MODEL':
            return {...state, model: {...payload}};
        case 'TRANSPORT_ORDER.CREATE':
            if (error === true) {
                return {...state, loading: false, visible: true};
            }
            return {...state, loading: false, visible: false};
        case 'TRANSPORT_ORDER.CREATE_PENDING':
            return {...state, model: payload, loading: true};
        default:
            return state;
    }
}

