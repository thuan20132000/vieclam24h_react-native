export const UPDATE_JOB = 'UPDATE_JOB';
export const RESET_JOB = 'RESET_JOB';



export const updateJob = (data) => {

    return {
        data:{
            category:data.category,
            field:data.field,
            location:data.location,
            photos:data.photos,
            title:data.title,
            descriptions:data.descriptions,
            budget:data.budget
        },
        type:UPDATE_JOB
    }
}


export const resetJob = () => {
    return {
        type:RESET_JOB
    }
}