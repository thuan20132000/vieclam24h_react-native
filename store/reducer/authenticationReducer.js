
import { LOGIN, LOGOUT, UPDATE } from '../actions/authenticationActions';

const initialState = {
    userInformation: '',
    access_token: null,
    role: ''
}



export default (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:

            return {
                ...state,
                userInformation: action.data.user,
                access_token: action.data.access,
            };


        case LOGOUT:

            state.userInformation = null;
            state.access_token = null;

            return state;

        case UPDATE:
            return {
                ...state,
                userInformation: action.data
            };

        default:
            break;
    }

    return state;
}