import {SUBCRIBE} from '../actions/websocketActions'


const initialState = {
    responseData: '',

}



export default (state = initialState, action) => {
    switch (action.type) {
        case SUBCRIBE:

            return {
                ...state,responseData:action.data
            };


        default:
            break;
    }

    return state;
}