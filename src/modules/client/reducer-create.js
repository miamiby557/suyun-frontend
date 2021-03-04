
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
        case 'CLIENT.SHOW_CREATE':
            return {...state, visible: true,selectRoleCodeList:[]};
        case 'CLIENT.HIDE_CREATE':
            return {...state, visible: false,model:{}};
        case 'CLIENT.CREATE':
            if(error===true){
                return {...state, loading:false};
            }
            return {...state, loading:false, visible: false};
        case 'CLIENT.CREATE_PENDING':
            return {...state, loading: true,model:{...payload}};
        case 'CLIENT.GET_DISPATCH_CENTRE':
            if(error===true){
                return state;
            }
            return {...state, dispatchCentre:action.payload};
        default:
            return state;
    }
}

