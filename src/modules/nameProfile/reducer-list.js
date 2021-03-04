const defaultState = {
    loading: false,
    dataSource: [],
    selectedRowKeys: [],
    page: 1,
    pageSize: 50,
    totalElements: 0
};
export default function list(state = defaultState, action) {
    const {type, payload, error} = action;
    switch (type) {

        case 'NAME_PROFILE.QUERY':
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
        case 'NAME_PROFILE.QUERY_PENDING':
            return { ...state, loading: true,filter:payload?payload.filter:{}};
        case 'NAME_PROFILE.SELECT':
            return {...state, selectedRowKeys: payload};
        default:
            return state;
    }
}

