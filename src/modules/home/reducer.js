const defaultState = {
    loading: false,
    dashboardDto: {},
    orderItems: [],
    feeItems: [],
    monthClientOrderCount: [],
    monthCarrierOrderCount: [],
    clientList: [],
    carrierList: []
};

export default function home(state = defaultState, action) {
    const {type, payload} = action;
    switch (type) {
        case 'DASHBOARD.DASHBOARD':
            return {...state, dashboardDto: {...payload}};
        case 'DASHBOARD.CLIENT_LIST':
            return {...state, clientList: [...payload]};
        case 'DASHBOARD.CARRIER_LIST':
            return {...state, carrierList: [...payload]};
        case 'DASHBOARD.GENERATE_DAY_FEE':
            return {...state, orderItems: payload.orderItems || [], feeItems: payload.feeItems || []};
        case 'DASHBOARD.MONTH_ORDER_COUNT':
            return {
                ...state,
                monthClientOrderCount: payload.clientOrderCounts || [],
                monthCarrierOrderCount: payload.carrierOrderCounts || []
            };
        default:
            return state;
    }
}
