
import {UPDATE_JOB} from '../actions/jobActions';

const initialState = {
    jobInformation:{
        cagegory:'',
        field:'',
        location:'',
        photos:[],
        title:'',
        time:'',
        description:'',
        budget:''
    },
}


export default (state = initialState,action) => {

    switch (action.type) {
        case UPDATE_JOB:

        
            
        return {
            ...state.jobInformation,
            
        }

            break;
    
        default:
            break;
    }

}