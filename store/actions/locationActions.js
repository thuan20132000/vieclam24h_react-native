
export const UPDATE_LOCATION = 'UPDATE_LOCATION'



export const updateLocation = (data) => {
    return (dispatch) => {
        dispatch({
            type:UPDATE_LOCATION,
            data:data
        })
    }
}