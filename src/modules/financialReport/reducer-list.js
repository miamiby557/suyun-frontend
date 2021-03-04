const defaultState = {
    loading: false,
    dataSource: [],
    transportNo: null,
    selectedRowKeys: [],
    filter: {},
    createTimeStart: '',
    createTimeEnd: '',
    clientName: '',
    carrierName: '',
    page: 1,
    pageSize: 20,
    totalElements: 0
};
export default function list(state = defaultState, action) {
    const {type, payload, error} = action;
    switch (type) {

        case 'FINANCIAL_REPORT.QUERY':
            if (error === true) {
                return {...state, loading: false};
            }
            return {
                ...state,
                loading: false,
                dataSource: payload.content,
                page: payload.page,
                pageSize: payload.pageSize,
                totalElements: payload.totalElements,
                selectedRowKeys: []
            };
        case 'FINANCIAL_REPORT.SELECT':
            return {...state, selectedRowKeys: payload};
        case 'FINANCIAL_REPORT.UPDATE_FILTER':
            return {...state, filter: {...payload}};
        case 'FINANCIAL_REPORT.UPDATE_TIME':
            return {...state, createTimeStart: payload.createTimeStart, createTimeEnd: payload.createTimeEnd};
        case 'FINANCIAL_REPORT.UPDATE_CLIENT_NAME':
            return {...state, clientName: payload};
        case 'FINANCIAL_REPORT.UPDATE_CARRIER_NAME':
            return {...state, carrierName: payload};
        default:
            return state;
    }
}

