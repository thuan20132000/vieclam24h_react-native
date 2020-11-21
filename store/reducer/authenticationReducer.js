
import {LOGIN, LOGOUT} from '../actions/authenticationActions';

const initialState = {
    userInformation:'',
    access_token:null,
}



export default (state = initialState,action) => {
    switch (action.type) {
        case LOGIN:
            console.warn(action.data);
            return {...state,userInformation:action.data.data,access_token:action.data.token};
        

        case LOGOUT:
            
            state.userInformation = null;
            state.access_token = null;
            
            return state;

        default:
            break;
    }

    return state;
}