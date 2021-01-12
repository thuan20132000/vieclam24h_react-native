export const SET_LANGUAGE = 'SET_LANGUAGE';



export const setLanguage = (language_code) => {


    return {
        type:SET_LANGUAGE,
        language_code:language_code
    }


}