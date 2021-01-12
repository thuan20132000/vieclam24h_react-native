
import {SET_LANGUAGE} from '../actions/languageActions';

const initialState = {
    current_language:'vi'
}



export default (state = initialState,action) => {
    switch (action.type) {
           
        case SET_LANGUAGE:
            let language_code =  action.language_code;
            return {
                ...state,current_language:language_code
            }

        default:
            break;
    }

    return state;
}