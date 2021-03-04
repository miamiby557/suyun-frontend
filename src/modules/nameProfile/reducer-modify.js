const defaultState = {
    visible: false,
    model: {}
};
export default function modify(state = defaultState, action) {
    const {type, payload, error} = action;
    switch (type) {

        case 'NAME_PROFILE.SHOW_MODIFY':
            return {...state, visible: true};
        case 'NAME_PROFILE.HIDE_MODIFY':
            return {...state, visible: false, model: {}};
        case 'NAME_PROFILE.GET':
            if (error === true) {
                return {...state, loading: false, visible: true};
            }
            return {...state, visible: true, model: {...payload}};
        case 'NAME_PROFILE.MODIFY':
            if (error === true) {
                return {...state, loading: false, visible: true};
            }
            return {...state, loading: false, model: {}};
        case 'NAME_PROFILE.MODIFY_PENDING':
            return {...state, loading: true};
        default:
            return state;
    }
}

