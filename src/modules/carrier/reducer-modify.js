
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
        case 'CARRIER.SHOW_MODIFY':
            return {...state, visible: true,selectRoleCodeList:[]};
        case 'CARRIER.HIDE_MODIFY':
            return {...state, visible: false,model:{}};
        case 'CARRIER.MODIFY':
            if(error===true){
                return {...state, loading:false};
            }
            return {...state, loading:false, visible: false};
        case 'CARRIER.MODIFY_PENDING':
            return {...state, loading: true,model:{...payload}};
        case 'CARRIER.GET':
            return {...state, loading: false,model:{...payload}};
        default:
            return state;
    }
}

