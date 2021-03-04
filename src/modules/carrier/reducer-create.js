
const defaultState = {
    visible: false,
    loading:false,
    model: {},
    selectRoleCodeList:[],
    dispatchCentre:[],

};
export default function create(state = defaultState, action) {
    const {type, error,payload} = action;
    switch (type) {
        case 'CARRIER.SHOW_CREATE':
            return {...state, visible: true,selectRoleCodeList:[]};
        case 'CARRIER.HIDE_CREATE':
            return {...state, visible: false,model:{}};
        case 'CARRIER.CREATE':
            if(error===true){
                return {...state, loading:false};
            }
            return {...state, loading:false, visible: false};
        case 'CARRIER.CREATE_PENDING':
            return {...state, loading: true,model:{...payload}};
        case 'CARRIER.GET_DISPATCH_CENTRE':
            if(error===true){
                return state;
            }
            return {...state, dispatchCentre:action.payload};
        default:
            return state;
    }
}

