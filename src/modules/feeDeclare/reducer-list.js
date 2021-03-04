const defaultState = {
    loading: false,
    dataSource: [],
    filter:{},
    selectedRowKeys: [],
    page: 1,
    pageSize: 20,
    totalElements: 0
};
export default function list(state = defaultState, action) {
    const {type, payload, error} = action;
    switch (type) {
        case 'FEE_DECLARE.QUERY':
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
        case 'FEE_DECLARE.SELECT':
            return {...state, selectedRowKeys: payload};
        default:
            return state;
    }
}

