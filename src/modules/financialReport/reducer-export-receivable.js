const defaultState = {
    visible: false,
    loading: false
};
export default function exportReceivable(state = defaultState, action) {
    const {type} = action;
    switch (type) {
        case 'FINANCIAL_REPORT.SHOW_EXPORT':
            return {...state, visible: true};
        case 'FINANCIAL_REPORT.HIDE_EXPORT':
            return {...state, visible: false};
        default:
            return state;
    }
}

