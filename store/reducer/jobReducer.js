
import {UPDATE_JOB,RESET_JOB} from '../actions/jobActions';

const initialState = {
    jobInformation:{
        category:'',
        field:'',
        location:'',
        photos:[],
        title:'',
        time:'',
        descriptions:'',
        budget:''
    },
}


export default (state = initialState,action) => {

    switch (action.type) {
        case UPDATE_JOB:

            let jobTemp = state.jobInformation;
            let newJobInformation = {
                category:action.data?.category || jobTemp.category,
                field:action.data?.field || jobTemp.field,
                photos: action.data?.photos || jobTemp.photos,
                location:action.data?.location || jobTemp.location,
                descriptions: action.data?.descriptions || jobTemp.descriptions,
                title:action.data?.title || jobTemp.title,
                time:action.data?.time || jobTemp.time,
                budget: action.data?.budget || jobTemp.budget,
            }

        
        return {
            ...state,
            jobInformation:newJobInformation
        }

        

        case RESET_JOB:
            let resetJob = {
                category:'',
                field:'',
                location:'',
                photos:[],
                title:'',
                time:'',
                descriptions:'',
                budget:''
            }
        return {
            ...state,
            jobInformation:resetJob
        }

        default:
            break;
    }

    return state;

}