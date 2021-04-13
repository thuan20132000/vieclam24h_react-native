import {
    UPDATE_LOCATION
} from '../actions/locationActions';



const initialState = {
    location:''
}


export default (state = initialState,action) => {
    switch (action.type) {
        case UPDATE_LOCATION:
            state.location = action.data

            return state
    
        default:
            break;
    }
    return state
}