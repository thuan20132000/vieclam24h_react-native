

export const getProvince = async () => {
    try {
        let url = `https://raw.githubusercontent.com/madnh/hanhchinhvn/master/dist/tinh_tp.json`;
        let fetchData = await fetch(url);
        if(!fetchData.ok){
            return{
                data:[],
                message:'Error at fetch province'
            }
        }
        let resData = await fetchData.json();
        
        return {
            data:resData,
            message:'Fetch province data successfully.'
        }
        
    } catch (error) {
        return {
            data:[],
            message:'Error at fetch province ' + error
        }
    }
}


export const getDistrict = async (code) => {
    try {
        let url = `https://raw.githubusercontent.com/madnh/hanhchinhvn/master/dist/quan-huyen/${code}.json`;
        let fetchData = await fetch(url);
        if(!fetchData.ok){
            return {
                data:[],
                message:'Error at fetch district.'
            }
        }
        let resData = await fetchData.json();

        return {
            data:resData,
            message:"Error at fetch district",
        }

    } catch (error) {

        return {
            data:[],
            message:'Error at fetch district '+error
        }
        
    }
}


export const getSubdistrict = async (code) => {
    try {
        let url = `https://raw.githubusercontent.com/madnh/hanhchinhvn/master/dist/xa-phuong/${code}.json`;
        let fetchData = await fetch(url);

        if(!fetchData.ok){
            return {
                data:[],
                message:'Error at fetch subdistrict.'
            }
        }
        let resData = await fetchData.json();

        return {
            data:resData,
            message:"Error at fetch subdistrict",
        }

    } catch (error) {

        return {
            data:[],
            message:'Error at fetch subdistrict '+error
        }
        
    }
}