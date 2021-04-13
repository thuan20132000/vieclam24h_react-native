export const ADD_SERVICE = 'ADD_SERVICE'
export const UPDATE_SERVICE = 'UPDATE_SERVICE'
export const DELETE_SERVICE = 'DELETE_SERVICE'
export const GET_SERVICE = 'GET_SERVICE'
export const UPDATE_SERVICE_REVIEW = 'UPDATE_SERVICE_REVIEW'


export const addService = (data = [],total_price,total_number) => {
    return (dispatch) => {
        dispatch({
            type:ADD_SERVICE,
            data:data,
            total_price:total_price,
            total_number:total_number
        })
    }
}

export const updateServiceReview = (time,location,payment) => {
    return (dispatch) => {
        dispatch({
            type:UPDATE_SERVICE_REVIEW,
            time:time,
            location:location,
            payment:payment
        })
    }
}