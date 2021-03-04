const defaultState = {
    visible: false,
    loading: false,
    model: {}
};
export default function insertFeeDeclare(state = defaultState, action) {
    const {type,payload, error} = action;
    switch (type) {

        case 'FINANCIAL_REPORT.SHOW_INSERT':
            return {...state, visible: true};
        case 'FINANCIAL_REPORT.HIDE_INSERT':
            return {...state, visible: false, model: {}};
        case 'FINANCIAL_REPORT.INSERT':
            if (error === true) {
                return {...state, loading: false, visible: true};
            }
            return {...state, loading: false, visible: false};
        case 'FINANCIAL_REPORT.INSERT_PENDING':
            return {...state,model:{...payload}, loading: true};
        default:
            return state;
    }
}

