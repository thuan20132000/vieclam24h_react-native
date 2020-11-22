import serverConfig from '../serverConfig';
import api from '../serverConfig';



/**
 * author:thuantruong
 * description: Login
 * created_at:21/11/2020
 * 
 * @param {*} email 
 * @param {*} password 
 */
export const login = async (email, password) => {


    try {
        let url = serverConfig.url;
        let dataFetch = await fetch(`${url}/login`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "email": email,
                "password": password

            })
        });


        if (!dataFetch.ok) {
            console.warn("ERROR AT LOGIN : ", dataFetch);
            return {
                data: null,
                message: dataFetch,
                status: false

            }
        }

        let dataRes = await dataFetch.json();

        if (!dataRes.data) {
            return {
                data: dataRes,
                message: 'failed',
                status: false
            }
        }

        return {
            data: dataRes,
            message: 'success',
            status: true
        }



    } catch (error) {

        return {
            data: null,
            message: 'failed' + error,
            status: false

        }
    }

}



export const register = async (
    name,
    email,
    password,
    phonenumber,
    idcard,
    province,
    district,
    subdistrict,
    address,
    role,
) => {
    try {
        let url = serverConfig.url;
        let dataFetch = await fetch(`${url}/register`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "name": name,
                "email": email,
                "password": password,
                "phonenumber": phonenumber,
                "idcard": idcard,
                "address": address,
                "province": province,
                "district": district,
                "subdistrict": subdistrict,
                "role": role

            })
        });


        if (!dataFetch.ok) {
            console.warn("ERROR AT LOGIN : ", dataFetch);
            return {
                data: null,
                message: dataFetch,
                status: false

            }
        }

        let dataRes = await dataFetch.json();

        if (!dataRes.data) {
            return {
                data: dataRes,
                message: 'failed',
                status: false
            }
        }

        return {
            data: dataRes.data,
            message: 'success',
            status: true
        }

    } catch (error) {
        return {
            data: null,
            message: 'failed' + error,
            status: false
        }
    }
}


/**
 * author:thuantruong
 * description: get all category
 * created_at:17/10/2020
 */
export const getCategory = async () => {

    try {
        let url = `${api.url}/category`;
        let dataFetch = await fetch(url);

        if (!dataFetch.ok) {
            console.warn('ERROR AT FETCH CATEGORY');

            return {
                data: [],
                message: 'error'
            }
        }
        let dataRes = await dataFetch.json();

        return {
            data: dataRes.data,
            message: 'success'
        }

    } catch (error) {
        return {
            data: [],
            message: 'error ' + error
        }
    }

}


/**
 * author:thuantruong
 * description: get all occupations
 * created_at:18/11/2020
 * 
 */

export const getOccupations = async (category_id = '') => {
    try {
        let url = serverConfig.url;
        let dataFetch = await fetch(`${url}/occupation?category=${category_id}`);

        if (!dataFetch.ok) {
            console.warn('ERROR AT FETCH JOBS');

            return {
                data: [],
                message: 'error'
            }
        }
        let dataRes = await dataFetch.json();

        return {
            data: dataRes.data,
            message: 'success'
        }


    } catch (error) {
        return {
            data: [],
            message: 'error ' + error
        }
    }
}




/**
 * author:thuantruong
 * description: get all jobs
 * created_at:17/11/2020
 */

export const getJobs = async (category = '', number = '') => {




    try {
        let url = serverConfig.url;
        let dataFetch = await fetch(`${url}/job?category=${category}&per_page=${number}`);

        if (!dataFetch.ok) {
            console.warn('ERROR AT FETCH JOBS');

            return {
                data: [],
                message: 'error'
            }
        }
        let dataRes = await dataFetch.json();

        return {
            data: dataRes.data,
            message: 'success'
        }


    } catch (error) {
        return {
            data: [],
            message: 'error ' + error
        }
    }
}



/**
 * author:thuantruong
 * description:get a job detail
 * created_at:18/11/2020
 */


export const getJobDetail = async (id) => {




    try {
        let url = serverConfig.url;
        let dataFetch = await fetch(`${url}/job/${id}`);

        if (!dataFetch.ok) {
            console.warn('ERROR AT FETCH JOB DETAIL');

            return {
                data: null,
                message: 'error'
            }
        }
        let dataRes = await dataFetch.json();

        return {
            data: dataRes.data,
            message: 'success'
        }


    } catch (error) {
        return {
            data: null,
            message: 'error ' + error
        }
    }
}




/**
 * author:thuantruong
 * description: apply a job
 * created_at:18/11/2020
 */

export const applyJob = async (user_id, job_id, expected_price, description = "") => {

    try {
        let url = serverConfig.url;
        let dataFetch = await fetch(`${url}/job-collaborator`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "expected_price": expected_price,
                "description": description,
                "user_id": user_id,
                "job_id": job_id
            })
        });

        if (!dataFetch.ok) {
            return {
                data: null,
                message: dataFetch
            }
        }

        let dataRes = await dataFetch.json();
        return {
            data: dataRes,
            message: 'success'
        }
    } catch (error) {
        return {
            data: null,
            message: 'error ' + error
        }
    }

}




/**
 * author:thuantruong
 * description:Create a new Job 
 * created_at:22/11/2020
 * 
 * @param {*} name 
 * @param {*} description 
 * @param {*} address 
 * @param {*} province 
 * @param {*} district 
 * @param {*} subdistrict 
 * @param {*} suggestion_price 
 * @param {*} author 
 * @param {*} occupation_id 
 * @param {*} occupation_name 
 * @param {*} images 
 */
export const createJob = async (
    name,
    description,
    address,
    province,
    district,
    subdistrict,
    suggestion_price,
    author,
    occupation_id,
    occupation_name,
    images = []
) => {
    try {
        let url = serverConfig.url;

        let dataFetch = await fetch(`${url}/job`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                description: description,
                street: address,
                province: province,
                district: district,
                subdistrict: subdistrict,
                suggestion_price: suggestion_price,
                author: author,
                occupation_id: occupation_id,
                occupation_name: occupation_name,
                images: images
            })
        });

        if (!dataFetch.ok) {
            return {
                data: null,
                message: dataFetch
            }
        }

        let dataRes = await dataFetch.json();

        if (dataRes.status) {
            return {
                data: dataRes,
                message: 'success'
            }

        }

        return {
            data: dataRes,
            message: 'failed'
        }


    } catch (error) {
        return {
            data: null,
            message: 'error ' + error
        }
    }
}





export const getCollaboratorJobs = async (user_id,status,per_page) => {
    try {
        let url = serverConfig.url;
        let dataFetch = await fetch(`${url}/job-collaborator-applying?user_id=${user_id}&status=${status}&per_page=${per_page}`);

        if (!dataFetch.ok) {    
            console.warn('ERROR AT FETCH COLLABORATOR JOB');

            return {
                data: [],
                message: 'error',
                status:false,
            }
        }
        let dataRes = await dataFetch.json();

        return {
            data: dataRes.data,
            message: 'success',
            status:true,
        }


    } catch (error) {
        return {
            data: [],
            message: 'error ' + error,
            status:false
        }
    }
}