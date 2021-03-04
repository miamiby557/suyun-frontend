const defaultState = {
    loading: false,
    dataSource: [],
    transportNo: null,
    selectedRowKeys: [],
    importLoading: false,
    clientList: [],
    carrierList: [],
    page: 1,
    pageSize: 20,
    totalElements: 0
};
export default function list(state = defaultState, action) {
    const {type, payload, error} = action;
    switch (type) {

        case 'TRANSPORT_ORDER.QUERY':
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
        case 'TRANSPORT_ORDER.SELECT':
            return {...state, selectedRowKeys: payload};
        case 'TRANSPORT_ORDER.IMPORT_PENDING':
            return {...state, importLoading: true};
        case 'TRANSPORT_ORDER.IMPORT':
            return {...state, importLoading: false};
        case 'TRANSPORT_ORDER.GET_CLIENT':
            return {...state, clientList: [...payload]};
        case 'TRANSPORT_ORDER.GET_CARRIER':
            return {...state, carrierList: [...payload]};
        default:
            return state;
    }
}

