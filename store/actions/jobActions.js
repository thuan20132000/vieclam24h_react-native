export const UPDATE_JOB = 'UPDATE_JOB'



export const updateJob = (key,value) => {

    return {
        key:key,
        value:value,
        type:UPDATE_JOB
    }
}