const defaultState = {
    loading: false,
    dataSource: [],
    account: null,
    name: null,
    selectedRowKeys: [],
    page: 1,
    pageSize: 50,
    roleList: [],
    totalElements: 0
};
export default function list(state = defaultState, action) {
    const {type, payload, error} = action;
    switch (type) {

        case 'CARRIER.QUERY':
            if (error === true) {
                return {...state, loading: false};
            }
            return {
                ...state,
                loading: false,
                dataSource: payload && [...payload],
                selectedRowKeys: []
            };
        case 'CARRIER.QUERY_PENDING':
            return {...state, loading: true, filter: payload ? payload.filter : {}};
        case 'CARRIER.SELECT':
            return {...state, selectedRowKeys: payload};
        default:
            return state;
    }
}

