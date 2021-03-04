
const defaultState = {
    visible: false,
    loading:false,
    model: {}

};
export default function create(state = defaultState, action) {
    const {type, error,payload} = action;
    switch (type) {
        case 'NAME_PROFILE.SHOW_CREATE':
            return {...state, visible: true,selectRoleCodeList:[]};
        case 'NAME_PROFILE.HIDE_CREATE':
            return {...state, visible: false,model:{}};
        case 'NAME_PROFILE.CREATE':
            if(error===true){
                return {...state, loading:false};
            }
            return {...state, loading:false, visible: false};
        case 'NAME_PROFILE.CREATE_PENDING':
            return {...state, loading: true,model:{...payload}};
        case 'NAME_PROFILE.GET_DISPATCH_CENTRE':
            if(error===true){
                return state;
            }
            return {...state, dispatchCentre:action.payload};
        default:
            return state;
    }
}

