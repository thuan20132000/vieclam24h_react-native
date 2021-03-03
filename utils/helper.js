/**
 * author:thuan
 * created_at:06/12/2020
 * description:Create soms function to help your needs
 */





export const generateCode = async (prefix='') => { 
    let date = new Date();
    let xx = date.getTime()

    return prefix+xx;
}




export const formatDateTime = (timestring) => {
    let date = new  Date(timestring);

    return `${date.getHours()}:${date.getMinutes()}  ${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`;
}

export const formatDateString = (timestring) => {
    let date = new Date(timestring);

    return  `${date.getDate()} - ${date.getMonth()}`;
}

export const formatTimeString = (timestring) => {
    let time = new Date(timestring);

    return `${time.getHours()} : ${time.getMinutes()}`;
}


export const formatCash = (str) => {
    let convertToString = String(str);
    return convertToString.replace(/\B(?=(\d{3})+(?!\d))/g, ',')  
}