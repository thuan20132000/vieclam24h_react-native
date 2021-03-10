
import { LOGIN, LOGOUT, UPDATE, REGISTER_CANDIDATE, EDIT_CANDIDATE, UPDATE_CANDIDATE_USER } from '../actions/authenticationActions';

const initialState = {
    userInformation: '',
    candidateInformation: {
        categories: '',
        fields: '',
        location: '',
        images: '',
    },
    access_token: null,
    role: '',
    refresh_token: null,
}



export default (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:

            return {
                ...state,
                userInformation: action.data.user,
                access_token: action.data.access,
                refresh_token: action.data.refresh
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


        case REGISTER_CANDIDATE:

            let data_register = action.data;
            var candidateUserTemp = state.candidateInformation;
            var newCandidateUserInformation = {
                categories: data_register?.categories || candidateUserTemp.categories,
                fields: data_register?.fields || candidateUserTemp.fields,
                location: data_register?.location || candidateUserTemp.location,
                images: data_register?.images || candidateUserTemp.images
            }

            return {
                ...state,
                candidateInformation: newCandidateUserInformation
            }

        case EDIT_CANDIDATE:
            let data_update = action.data;
            var candidateUserTemp = state.candidateInformation;
            var newCandidateUserInformation = {
                categories: data_update?.categories || candidateUserTemp.categories,
                fields: data_update?.fields || candidateUserTemp.fields,
                location: data_update?.location || candidateUserTemp.location,
                images: data_update?.images || candidateUserTemp.images
            }

            return {
                ...state,
                candidateInformation: newCandidateUserInformation
            }

        case UPDATE_CANDIDATE_USER:
            var candidate_user_info = action.data;
            var userInformationTemp = state.userInformation;
            userInformationTemp.candidate_info = candidate_user_info
            
            return {
                ...state,
                userInformation:userInformationTemp
            }
            break;


        default:
            break;
    }

    return state;
}