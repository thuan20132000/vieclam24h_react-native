export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'




export const login = (email,password) => {

    return async (dispatch) => {
        try {
            dispatch({
                type:LOGIN,
                email:email,
                password:password
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