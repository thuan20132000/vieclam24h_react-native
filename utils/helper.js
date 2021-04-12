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
    var nowDateTimeString = new Date();

    let created_date_timestring = created_at

    if(isNaN(created_at)){
        var date1 = new Date(created_at);
        created_date_timestring = date1.getTime();
    }

    var difference = nowDateTimeString.getTime() - created_date_timestring;
    var days = Math.ceil(difference / (1000 * 3600 * 24));

    var diff = (nowDateTimeString.getTime() - created_date_timestring) / 1000;
    var fm = Math.floor(Math.abs(Math.round(diff / 60)));

    if(fm>1440){
        // console.warn('fm: ',fm);
        // console.warn(`${days} ngày trước at ${date1.getHours()} - ${date1.getMinutes()} - ${date1.getDate()}`);
        return `${days} ngày trước `

    }else if(fm>=60){
        let h =  Math.floor(fm / 60);
        // console.warn(`${h} giờ trước at ${date1.getHours()} - ${date1.getMinutes()} - ${date1.getDate()}`);
        return `${h} giờ trước `

        
    }else{
        // console.warn(`${fm} phút trước ${date1.getHours()} - ${date1.getMinutes()} - ${date1.getDate()}`)
        return `${fm} phút trước `

    }
   
}



export const isExistInArray = (item,array = []) => {
    
    let findRes = array.findIndex(e => e.id == item.id);
    if(findRes === -1){
        return false;
    }
    return true;

}