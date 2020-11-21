export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'




export const login = (data) => {
    return async (dispatch) => {
        try {

            dispatch({
                type:LOGIN,
                data:data
            })
        } catch (error) {
            console.warn(error);
        }


    }

    
}



export const logout = () => {
    return async (dispatch) => {
        dispatch({
            type: LOGOUT,
        })
    }
}