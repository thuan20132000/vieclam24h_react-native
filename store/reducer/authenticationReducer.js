
import {LOGIN, LOGOUT} from '../actions/authenticationActions';

const initialState = {
    userInformation:'',
    access_token:null,
}



export default (state = initialState,action) => {
    switch (action.type) {
        case LOGIN:
            var email = String(action.email).toLocaleLowerCase();
            var password = String(action.password).toLocaleLowerCase();
            
            if(email==='admin@gmail.com' && password==='admin'){
                state.access_token = 'adminadmin';
                state.userInformation = {
                    email:email,
                }
            }
            return state;
        

        case LOGOUT:
            
            state.userInformation = null;
            state.access_token = null;
            
            return state;

        default:
            break;
    }

    return state;
}