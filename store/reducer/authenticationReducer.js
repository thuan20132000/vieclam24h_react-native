
import {SET_AUTHENTICATION, SET_LOGOUT} from '../actions/authenticationActions';

const initialState = {
    userInformation:'',
    access_token:'',
}



export default (state = initialState,action) => {
    switch (action.type) {
        case SET_AUTHENTICATION:
            var userAuth = action.data
            
            if(userAuth){
                state.access_token = userAuth.access_token;
                state.userInformation = userAuth
            }
            break;
        

        case SET_LOGOUT:
            state.access_token = null;
            state.userInformation = null;
            break;

        default:
            break;
    }

    return state;
}