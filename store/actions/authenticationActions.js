export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'
export const UPDATE = 'UPDATE'
export const REGISTER_CANDIDATE = 'REGISTER_CANDIDATE'
export const EDIT_CANDIDATE = 'EDIT_CANDIDATE'
export const UPDATE_CANDIDATE_USER = 'UPDATE_CANDIDATE_USER'



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


export const update = (data) => {
    return async (dispatch) => {
        try {
            dispatch({
                type:UPDATE,
                data:data,
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



export const register_candidate = (data) => {

    
    return {
        data:data,
        type:REGISTER_CANDIDATE
    }
}


export const edit_candidate = (data) => {

    return {
        data:data,
        type:EDIT_CANDIDATE
    }
}



export const update_candidate_user = (data) => {
    return {
        data:data,
        type:UPDATE_CANDIDATE_USER
    }
}
