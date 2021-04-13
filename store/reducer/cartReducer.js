import {
    ADD_SERVICE,
    UPDATE_SERVICE,
    DELETE_SERVICE,
    GET_SERVICE,
    UPDATE_SERVICE_REVIEW
} from '../actions/cartActions';

const initialState = {
    service_list:[],
    total_price:0,
    total_number:0,
    location:'',
    payment:'',
    time:'',
}


export default (state = initialState,action) => {
    switch (action.type) {
        case ADD_SERVICE:
            state.service_list = action.data;
            state.total_price = action.total_price;
            state.total_number = action.total_number;

            return state
            
        case UPDATE_SERVICE_REVIEW:
            state.payment = action.payment,
            state.location = action.location,
            state.time = action.time
            return state
        
        default:
            break;
    }

    return state;
}