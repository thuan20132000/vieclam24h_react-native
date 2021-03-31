/**
 * author:thuan
 * created_at:06/12/2020
 * description:Create soms function to help your needs
 */





export const generateCode = (prefix = '') => {
    let date = new Date();
    let xx = date.getTime()

    return prefix + xx;
}




export const formatDateTime = (timestring) => {
    let date = new Date(timestring);

    return `${date.getHours()}:${date.getMinutes()}  ${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
}

export const formatDateString = (timestring) => {
    let date = new Date(timestring);

    return `${date.getDate()} - ${date.getMonth()} - ${date.getFullYear()}`;
}

export const formatTimeString = (timestring) => {
    let time = new Date(timestring);

    return `${time.getHours()} : ${time.getMinutes()}`;
}


export const formatCash = (str) => {
    let convertToString = String(str);
    return convertToString.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export const isPhoneNumber = (number) => {
    let rex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (number.match(rex)) {
        return true;
    }
    else {
        return false;
    }
}


export const getDaysBetweenTwoDates = (created_at) => {
    var date1 = new Date(created_at);
    var date2 = new Date();
    var difference = date2.getTime() - date1.getTime();
    var days = Math.ceil(difference / (1000 * 3600 * 24));

    var ml_day = 3600 * 1000 * 24;
    var ms_to_now = date2.getTime() - date1.getTime();


    var diff = (date2.getTime() - date1.getTime()) / 1000;
    diff = diff / 60;
    var fm = Math.abs(Math.round(diff));

    if(fm>1440){
        console.warn(`${days-1} ngày trước at ${date1.getHours()} - ${date1.getMinutes()} - ${date1.getDate()}`);
        return `${days-1} ngày trước lúc ${formatDateString(created_at)}`

    }else if(fm>=60){
        let h = fm / 60;
        console.warn(`${h} giờ trước at ${date1.getHours()} - ${date1.getMinutes()} - ${date1.getDate()}`);
        return `${h} giờ trước lúc ${formatDateString(created_at)}`

        
    }else{
        console.warn(`${fm} phút trước ${date1.getHours()} - ${date1.getMinutes()} - ${date1.getDate()}`)
        return `${fm} phút trước lúc ${formatDateString(created_at)}`

    }
   
}