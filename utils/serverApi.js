import serverConfig from '../serverConfig';
import api from '../serverConfig';
import storage from '@react-native-firebase/storage';
import { Platform } from 'react-native';
import { generateCode } from './helper';


/**
 * author:thuantruong
 * description: Login
 * created_at:21/11/2020
 * 
 * @param {*} username 
 * @param {*} password 
 */
export const login = async (username, password) => {


    try {
        let url = serverConfig.url;
        let dataFetch = await fetch(`${api.api_v1_login}/signin`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "username": username,
                "password": password

            })
        });


        if (!dataFetch.ok) {
            return {
                data: null,
                message: dataFetch,
                status: false

            }
        }

        let dataRes = await dataFetch.json();

        if (!dataRes.status) {
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
        let dataFetch = await fetch(`http://18.141.229.83/api/v1/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: name,
                password: password,
                email: email


            })
        });


        if (!dataFetch.ok) {
            console.warn("ERROR AT REGISTER : ", dataFetch);
            return {
                data: null,
                message: dataFetch,
                status: false

            }
        }

        let dataRes = await dataFetch.json();
        // console.warn("DATA RES: ", dataRes);

        if (!dataRes.status) {
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



/**
 * author:thuantruong
 * descriptions: Đăng ký làm ứng viên tìm việc làm
 * @param {*} user_id 
 * @param {*} categories 
 * @param {*} location 
 * @param {*} fields 
 * @param {*} images_file 
 * @returns 
 */
export const register_candidate = async (
    user_id,
    categories,
    location,
    fields,
    photos
) => {


    try {


        const formData = new FormData();
        formData.append('user', user_id);
        formData.append('categories', JSON.stringify(categories));
        formData.append('location', JSON.stringify(location));
        formData.append('fields', JSON.stringify(fields));


        // formData.append('images',photos);
        if (photos && photos.length > 0) {
            photos = photos.map((e) => {
                const file = {
                    name: e.path,
                    type: e.mime,
                    uri: e.path
                }
                formData.append('images_file', file);

            });

        }
        // console.warn(user_id);
        // console.warn('form data: ',formData);

        let dataFetch = await fetch(`${api.api_v1}/user/${user_id}/register-candidate`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
            },
            body: formData

        });


        if (!dataFetch.ok) {
            console.warn("ERROR AT REGISTER : ", dataFetch);
            return {
                data: null,
                message: dataFetch,
                status: false

            }
        }

        let dataRes = await dataFetch.json();
        // console.warn("DATA RES: ", dataRes);

        if (!dataRes.status) {
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





/**
 * author:thuantruong
 * descriptions: Đăng ký làm ứng viên tìm việc làm
 * @param {*} user_id 
 * @param {*} categories 
 * @param {*} location 
 * @param {*} fields 
 * @param {*} images_file 
 * @returns 
 */
export const update_candidate = async (
    user_id,
    categories,
    location,
    fields,
    photos
) => {


    try {


        const formData = new FormData();
        formData.append('user', user_id);
        formData.append('categories', JSON.stringify(categories));
        formData.append('location', JSON.stringify(location));
        formData.append('fields', JSON.stringify(fields));


        // // formData.append('images',photos);
        if (photos && photos.length > 0) {
            photos = photos.map((e) => {
                const file = {
                    name: e.path,
                    type: e.mime,
                    uri: e.path
                }
                formData.append('images_file', file);

            });

        }
        // console.warn(user_id);
        // console.warn('form data: ',formData);

        let dataFetch = await fetch(`${api.api_v1}/user/${user_id}/update-candidate`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
            },
            body: formData

        });


        if (!dataFetch.ok) {
            console.warn("ERROR AT REGISTER : ", dataFetch);
            return {
                data: null,
                message: dataFetch,
                status: false

            }
        }

        let dataRes = await dataFetch.json();
        // console.warn("DATA RES: ", dataRes);

        if (!dataRes.status) {
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


/**
 * author:thuantruong
 * description: get all category
 * created_at:17/10/2020
 */
export const getCategory = async (access_token) => {

    try {
        let url = `${api.api_v1}/category`;
        let bearer = `Bearer ${access_token}`;
        let dataFetch = await fetch(url, {
            headers: {
                "Authorization": `${bearer}`
            }
        });

        if (!dataFetch.ok) {
            console.warn('ERROR AT FETCH CATEGORY');

            return {
                status: false,
                data: [],
                message: 'error'
            }
        }
        let dataRes = await dataFetch.json();
        // console.warn('data res: ', dataRes);

        return {
            status: true,
            data: dataRes,
            message: 'success'
        }

    } catch (error) {
        return {
            status: false,
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
                status: false,
                data: [],
                message: 'error'
            }
        }
        let dataRes = await dataFetch.json();

        return {
            status: true,
            data: dataRes.data,
            message: 'success'
        }


    } catch (error) {
        return {
            status: false,
            data: [],
            message: 'error ' + error
        }
    }
}


/**
 * 
 * @param {*} category 
 * @param {*} perpage 
 * @param {*} postnumber 
 */

export const getFields = async (category_id = '', access_token = '') => {
    try {
        let bearer = `Bearer ${access_token}`;
        let datafetch;
        if (category_id && category_id != '') {
            datafetch = await fetch(`${api.api_v1}/fields?category_id=${category_id}`, {
                headers: {
                    "Authorization": `${bearer}`
                }
            });
        } else {
            datafetch = await fetch(`${api.api_v1}/fields`, {
                headers: {
                    "Authorization": `${bearer}`
                }
            });
        }

        if (!datafetch.ok) {
            console.warn('ERROR AT FETCH JOBS');

            return {
                status: false,
                data: [],
                message: 'error'
            }
        }
        let dataRes = await datafetch.json();

        return {
            status: true,
            data: dataRes,
            message: 'success'
        }


    } catch (error) {
        return {
            status: false,
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

export const getJobs = async (category = '', perpage = 5, postnumber = 0) => {




    try {
        let url = serverConfig.url;
        let dataFetch = await fetch(`${api.api_v1}/jobs`);

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


export const getJobsByCategory = async (category_slug, limit = 10) => {
    try {
        let url = serverConfig.url;
        let dataFetch = await fetch(`${api.api_v1}/jobs?category_slug=${category_slug}`);

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
            next: dataRes.next,
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
        let dataFetch = await fetch(`${api.api_v1}/jobs/${id}`);

        if (!dataFetch.ok) {
            console.warn('ERROR AT FETCH JOB DETAIL');

            return {
                data: null,
                status: false,
                message: 'error'
            }
        }
        let dataRes = await dataFetch.json();

        if (!dataRes.status) {
            return {
                status: true,
                data: false,
                message: "false"
            }
        }


        return {
            status: true,
            data: dataRes.data,
            message: 'success'
        }


    } catch (error) {
        return {
            status: false,
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
        let dataFetch = await fetch(`${api.api_v1}/user/${user_id}/apply-job`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "expected_price": expected_price,
                "descriptions": description,
                "candidate_id": user_id,
                "job_id": job_id
            })
        });

        if (!dataFetch.ok) {
            return {
                data: null,
                message: dataFetch,
                status: false
            }
        }

        let dataRes = await dataFetch.json();

        if (dataRes?.data?.status) {
            return {
                data: dataRes,
                message: 'success',
                status: true
            }
        } else {

            return {
                data: dataRes,
                message: 'failed',
                status: false
            }

        }


    } catch (error) {
        return {
            data: null,
            message: 'error ' + error,
            status: false
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
    name = "title test",
    descriptions,
    location,
    suggestion_price = 0,
    field_id,
    photos = [],
    author,
    occupation_id,
    occupation_name,
    images = []
) => {
    try {

        // name: photo.fileName,
        // type: photo.type,
        // uri:
        //   Platform.OS === "android" ? photo.uri : photo.uri.replace("file://", "")



        // console.warn('photos: ',photos);

        const formData = new FormData();


        formData.append('name', name);
        formData.append('descriptions', descriptions);
        formData.append('location', JSON.stringify(location));
        formData.append('suggestion_price', suggestion_price);
        formData.append('author_id', 6);
        formData.append('field_id', field_id);

        // formData.append('images',photos);
        if (photos && photos.length > 0) {
            photos = photos.map((e) => {
                const file = {
                    name: e.path,
                    type: e.mime,
                    uri: e.path
                }
                console.warn(file);
                formData.append('images', file);

            });

        }
        // photos.forEach(e => {
        //     formData.append('images',e);
        // })


        let dataFetch = await fetch(`${api.api_v1}/job`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
            },
            method: 'POST',
            body: formData
        });

        if (!dataFetch.ok) {
            return {
                data: null,
                message: dataFetch,
                status: false,
            }
        }

        let dataRes = await dataFetch.json();

        console.warn('created res: ', dataRes);

        if (dataRes.status) {
            return {
                data: dataRes,
                message: 'success',
                status: true
            }

        }

        return {
            data: dataRes,
            message: 'failed',
            status: false
        }


    } catch (error) {
        return {
            data: null,
            message: 'error ' + error,
            status: false
        }
    }
}




/**
 * 
 * @param {*} user_id 
 * @param {*} status 
 * @param {*} per_page 
 */
export const getCollaboratorJobs = async (user_id, status, per_page) => {
    try {
        let url = serverConfig.url;
        let dataFetch = await fetch(`${url}/jobcollaborator/${user_id}/status/${status}?per_page=${per_page}`);

        if (!dataFetch.ok) {
            console.warn('ERROR AT FETCH COLLABORATOR JOB');

            return {
                data: [],
                message: 'error',
                status: false,
            }
        }
        let dataRes = await dataFetch.json();

        return {
            data: dataRes.data,
            message: 'success',
            status: true,
        }


    } catch (error) {
        return {
            data: [],
            message: 'error ' + error,
            status: false
        }
    }
}




export const _getApplyJobList = async (
    candidate_id,
    job_status
) => {
    try {
        let url = `${api.api_v1}/candidate/${candidate_id}/jobs?apply_status=${job_status}`;
        let dataFetch = await fetch(url);

        if (!dataFetch.ok) {
            console.warn(`ERROR AT FETCH JOB ${job_status} `);
            return {
                status: false,
                message: "error",
                data: []
            }
        }

        let dataRes = await dataFetch.json();

        return {
            status: true,
            message: "success",
            data: dataRes.data
        }


    } catch (error) {
        return {
            message: 'error ' + error,
            status: false,
            data: [],

        }
    }
}




export const _getCreatedJobList = async (
    user_id,
    job_status
) => {
    try {
        let url = `${api.api_v1}/user/${user_id}/jobs?job_status=${job_status}`;
        let dataFetch = await fetch(url);

        if (!dataFetch.ok) {
            console.warn(`ERROR AT FETCH CREATED JOB ${job_status}`);
            return {
                status: false,
                message: "error",
                data: []
            }
        }

        let dataRes = await dataFetch.json();

        return {
            status: true,
            message: "success",
            data: dataRes.data
        }

    } catch (error) {
        return {
            message: 'error ' + error,
            status: false,
            data: [],

        }
    }
}







export const _approve_jobcandidate = async (
    user_id,
    jobcandidate_id,
) => {
    try {

        let formdata = new FormData();
        formdata.append("jobcandidate_id", jobcandidate_id);
        formdata.append("status", "approved");


        let url = `${api.api_v1}/user/${user_id}/jobcandidate`;
        let dataFetch = await fetch(url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
            },
            method: "PUT",
            body: formdata,
        });

        if (!dataFetch.ok) {
            console.warn(`ERROR AT FETCH CREATED JOB ${status}`);
            return {
                status: false,
                message: "error",
                data: []
            }
        }

        let dataRes = await dataFetch.json();

        return {
            status: true,
            message: "success",
            data: dataRes.data
        }

    } catch (error) {
        return {
            message: 'error ' + error,
            status: false,
            data: [],

        }
    }
}




export const _confirm_jobcandidate = async (
    user_id,
    jobcandidate_id,
    review_level,
    review_content,
    confirmed_price,
) => {
    try {

        let formdata = new FormData();
        formdata.append("jobcandidate_id", jobcandidate_id);
        formdata.append("status", "confirmed");
        formdata.append("review_level", review_level);
        formdata.append("review_content", review_content);
        formdata.append("confirmed_price", confirmed_price);



        let url = `${api.api_v1}/user/${user_id}/jobcandidate`;
        let dataFetch = await fetch(url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
            },
            method: "PUT",
            body: formdata,
        });

        if (!dataFetch.ok) {
            console.warn(`ERROR AT FETCH CREATED JOB ${status}`);
            return {
                status: false,
                message: "error",
                data: []
            }
        }

        let dataRes = await dataFetch.json();

        if (!dataRes.status) {
            return {
                status: false,
                message: `error : ${dataRes.data}`,
                data: []
            }
        }

        return {
            status: true,
            message: "success",
            data: dataRes
        }

    } catch (error) {
        return {
            message: 'error ' + error,
            status: false,
            data: [],

        }
    }

}


/**
 * author:thuantruong
 * created_at:25/11/2020
 * 
 * @param {*} query 
 * @param {*} district 
 * @param {*} limit 
 */
export const searchJobs = async (query, district, limit = 6) => {
    try {
        let url = serverConfig.url;
        let dataFetch = await fetch(`${api.api_v1}/job/search?query=${query}&district=${district}&limit=${limit}`);
        if (!dataFetch.ok) {
            console.warn('ERROR AT SEARCH JOB');

            return {
                data: [],
                message: dataFetch,
                status: false
            }
        }

        let dataRes = await dataFetch.json();
        return {
            data: dataRes.data,
            message: 'success',
            status: true
        }

    } catch (error) {
        return {
            data: [],
            message: 'error ' + error,
            status: false
        }
    }
}



export const searchCandidates = async (query = null, district = null, limit = 6) => {
    try {
        let url = serverConfig.url;
        let dataFetch = await fetch(`${url}/collaborator-search?query=${query}&district=${district}&limit=${limit}`);

        if (!dataFetch.ok) {
            console.warn('ERROR AT SEARCH JOB');

            return {
                data: [],
                message: dataFetch,
                status: false
            }
        }
        let dataRes = await dataFetch.json();
        return {
            data: dataRes.data,
            message: 'success',
            status: true
        }


    } catch (error) {
        return {
            data: [],
            message: 'error ' + error,
            status: false
        }
    }
}



/**
 * author:thuantruong
 * created_at:28/11/2020
 * description:Get all collaborators or collaborator by category
 * @param {*} by_category 
 */
export const getCollaborator = async (by_category = null, byTopRating = null, district = 492, perpage = 10, postnumber = 0) => {
    try {
        let url = serverConfig.url;
        let url_with_params;

        if (by_category) {
            url_with_params = `${url}/collaborators?category=${by_category}&perpage=${perpage}&postnumber=${postnumber}`;
        }


        let datafetch = await fetch(url_with_params);


        if (!datafetch.ok) {
            console.warn('ERROR AT GET COLLABORATOR BY CATEGORY');

            return {
                data: [],
                message: dataFetch,
                status: false
            }
        }

        let dataRes = await datafetch.json();
        console.warn(dataRes);

        return {
            data: dataRes,
            message: 'success',
            status: true
        }
    } catch (error) {
        return {
            data: [],
            message: error,
            status: false
        }
    }
}


/**
 * author:thuantruong
 * created_at:19/12/2020
 * 
 * @param {*} by_category 
 * @param {*} perpage 
 * @param {*} postnumber 
 */
export const getCollaboratorByCategory = async (by_category = 1, perpage = 10, postnumber = 0,) => {
    try {
        let url = serverConfig.url;

        let url_with_params = `${url}/collaborators?category=${by_category}&perpage=${perpage}&postnumber=${postnumber}`;

        let datafetch = await fetch(url_with_params);


        if (!datafetch.ok) {
            console.warn('ERROR AT GET COLLABORATOR BY CATEGORY');

            return {
                data: [],
                message: dataFetch,
                status: false
            }
        }

        let dataRes = await datafetch.json();

        return {
            data: dataRes,
            message: 'success',
            status: true
        }
    } catch (error) {
        return {
            data: [],
            message: error,
            status: false
        }
    }
}


/**
 * author:thuantruong
 * created_at:19/12/2020
 * @param {*} district_id 
 * @param {*} perpage 
 * @param {*} postnumber 
 */
export const getCollaboratorsByDistrict = async (district_id = 1, perpage = 10, postnumber = 0) => {
    try {
        let url = serverConfig.url;

        let url_with_params = `${url}/collaborators?district=${district_id}&perpage=${perpage}&postnumber=${postnumber}`;

        let datafetch = await fetch(url_with_params);
        if (!datafetch.ok) {
            console.warn('ERROR AT GET COLLABORATOR BY CATEGORY');
            return {
                data: [],
                message: dataFetch,
                status: false
            }
        }

        let dataRes = await datafetch.json();

        return {
            data: dataRes,
            message: 'success',
            status: true
        }
    } catch (error) {
        return {
            data: [],
            message: error,
            status: false
        }
    }
}



/**
 * author:thuantruong
 */
export const getCollaboratorsTopRating = async (perpage = 10, postnumber = 0) => {
    try {
        let url = serverConfig.url;

        let url_with_params = `${url}/collaborators?sortbytoprating=true&perpage=${perpage}&postnumber=${postnumber}`;
        let datafetch = await fetch(url_with_params);


        if (!datafetch.ok) {
            console.warn('ERROR AT GET COLLABORATOR BY CATEGORY');

            return {
                data: [],
                message: dataFetch,
                status: false
            }
        }

        let dataRes = await datafetch.json();

        return {
            data: dataRes,
            message: 'success',
            status: true
        }
    } catch (error) {
        return {
            data: [],
            message: error,
            status: false
        }
    }
}




/**
 * author:thuantruong
 * created_at:28/11/2020
 * description:Get collaborator detail
 * @param {*} collaborator_id 
 */
export const getCollaboratorDetail = async (collaborator_id) => {
    try {
        let url = serverConfig.url;
        let dataFetch = await fetch(`${url}/collaborators/${collaborator_id}`);
        if (!dataFetch.ok) {
            console.warn("ERROT AT GET COLLABORATOR DETAIL");

            return {
                data: [],
                message: dataFetch,
                status: false,
            }
        }

        let dataRes = await dataFetch.json();

        return {
            data: dataRes.data,
            message: 'success',
            status: true
        }

    } catch (error) {
        return {
            data: [],
            message: error,
            status: false
        }
    }
}




/**
 * author:thuantruong
 * created_at:28/11/2020
 * description: get all jobs that created by customer
 * 
 * @param {Number} customer_id 
 * @param {desc|asc} sort_by
 */
export const getCustomerJobs = async (customer_id, sort_by = 'desc', per_page = 15) => {
    try {
        let url = serverConfig.url;
        let dataFetch = await fetch(`${url}/job?user_id=${customer_id}&sort_by=${sort_by}&per_page=${per_page}`);
        if (!dataFetch.ok) {
            console.warn("ERROT AT GET CUSTOMER JOBS");

            return {
                data: [],
                message: dataFetch,
                status: false,
            }
        }

        let dataRes = await dataFetch.json();

        return {
            data: dataRes.data,
            message: 'success',
            status: true
        }

    } catch (error) {
        return {
            data: [],
            message: error,
            status: false
        }
    }
}





export const selectCandidate = async (job_id, job_collaborator_id) => {
    try {
        let url = serverConfig.url;
        let dataFetch = await fetch(`${url}/job/select-candidate`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                job_id: job_id,
                job_collaborator_id: job_collaborator_id

            })
        });
        if (!dataFetch.ok) {
            console.warn("ERROT AT GET SELECT CANDIDATE");

            return {
                data: [],
                message: dataFetch,
                status: false,
            }
        }

        let dataRes = await dataFetch.json();

        return {
            data: dataRes.data,
            message: 'success',
            status: true
        }

    } catch (error) {
        return {
            data: [],
            message: error,
            status: false
        }
    }
}




/**
 * author:thuantruong
 * created_at:02/12/2020
 * description:Get all customer's pending jobs
 * @param {*} author_id 
 */
export const getUserPendingJobs = async (author_id) => {

    try {
        let url = serverConfig.url;
        let dataFetch = await fetch(`${url}/job/${author_id}/status/pending?`);
        if (!dataFetch.ok) {
            console.warn("ERROT AT GET CUSTOMER PENDING JOBS");

            return {
                data: [],
                message: dataFetch,
                status: false,
            }
        }

        let dataRes = await dataFetch.json();

        return {
            data: dataRes.data,
            message: 'success',
            status: true
        }
    } catch (error) {
        return {
            data: [],
            message: error,
            status: false
        }
    }
}





/**
 * author:thuantruong
 * created_at:02/12/2020
 * description:Get all customer's approved jobs
 * @param {*} author_id 
 */
export const getUserApprovedJobs = async (author_id) => {

    try {
        let url = serverConfig.url;
        let dataFetch = await fetch(`${url}/job/${author_id}/status/approved`);
        if (!dataFetch.ok) {
            console.warn("ERROT AT GET CUSTOMER APPROVED JOBS");

            return {
                data: [],
                message: dataFetch,
                status: false,
            }
        }

        let dataRes = await dataFetch.json();

        return {
            data: dataRes.data,
            message: 'success',
            status: true
        }
    } catch (error) {
        return {
            data: [],
            message: error,
            status: false
        }
    }
}




/**
 * author:thuantruong
 * created_at:05/12/2020
 * description:Get all customer's confirmed jobs
 * @param {*} author_id 
 */
export const getUserConfirmedJobs = async (author_id) => {

    try {
        let url = serverConfig.url;
        let dataFetch = await fetch(`${url}/job/${author_id}/status/confirmed`);

        if (!dataFetch.ok) {
            console.warn("ERROT AT GET CUSTOMER CONFIRMED JOBS");

            return {
                data: [],
                message: dataFetch,
                status: false,
            }
        }

        let dataRes = await dataFetch.json();
        return {
            data: dataRes.data,
            message: 'success',
            status: true
        }
    } catch (error) {
        return {
            data: [],
            message: error,
            status: false
        }
    }
}






/**
 * author:thuantruong
 * created_at:04/12/2020
 * description:confirm finished job with review
 * 
 * @param {*} job_collaborator_id 
 * @param {*} confirmed_price 
 * @param {*} range 
 * @param {*} content 
 */
export const confirmFinishedJob = async (job_collaborator_id, job_id, confirmed_price, range, content) => {

    try {
        let url = serverConfig.url;
        let dataFetch = await fetch(`${url}/job/confirm-candidate`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                job_collaborator_id: job_collaborator_id,
                job_id: job_id,
                confirmed_price: confirmed_price,
                range: range,
                content: content
            })
        });

        let dataRes = await dataFetch.json();
        if (dataRes.status) {
            return {
                data: dataRes,
                message: 'success',
                status: true,
            }
        }

        return {
            data: [],
            message: dataRes.message,
            status: false,
        }

    } catch (error) {

        return {
            data: [],
            status: false,
            message: error
        }

    }

}



/**
 * author:thuantruong
 * created_at:9/12/2020
 * description:Update user information
 * @param {*} user_id 
 * @param {*} username 
 * @param {*} phonenumber 
 * @param {*} idcard 
 * @param {*} address 
 * @param {*} province 
 * @param {*} district 
 * @param {*} subdistrict 
 * @param {*} profile_image 
 */
export const updateUser = async (user_id, username, phonenumber, idcard, address, province, district, subdistrict, profile_image, occupations = []) => {


    try {
        let url = serverConfig.url;
        let dataFetch = await fetch(`${url}/user/${user_id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "name": username,
                "phonenumber": phonenumber,
                "idcard": idcard,
                "address": address,
                "province": province,
                "district": district,
                "subdistrict": subdistrict,
                "profile_image": profile_image,
                "occupations": occupations
            })
        });

        let dataRes = await dataFetch.json();
        if (dataRes.data != null) {
            return {
                data: dataRes.data,
                message: 'success',
                status: true,
            }
        }

        return {
            data: [],
            message: dataRes.message,
            status: false,
        }

    } catch (error) {

        return {
            data: [],
            status: false,
            message: error
        }

    }

}




export const deleteJobByAuthor = async (author_id, job_id) => {
    try {
        let url = serverConfig.url;
        let dataFetch = await fetch(`${url}/job/${author_id}/delete/${job_id}`, {
            method: 'DELETE',
        });

        let dataRes = await dataFetch.json();
        if (dataRes.status) {
            return {
                data: dataRes.data,
                message: 'success',
                status: true,
            }
        }

        return {
            data: [],
            message: dataRes.message,
            status: false,
        }

    } catch (error) {
        return {
            data: [],
            message: error,
            status: false,
        }

    }
}




/**
 * author:thuantruong
 * created_at:15/12/2020
 * description: Get all client that connected to user
 * @param {*} user_id 
 */
export const getUserChatConnections = async (user_id) => {

    try {
        let url = serverConfig.url_chatlive;
        let dataFetch = await fetch(`${url}/user/${user_id}/connection`);

        if (!dataFetch.ok) {
            return {
                data: [],
                message: "failed " + dataFetch,
                status: false
            }
        }

        let dataRes = await dataFetch.json();
        if (dataRes.status) {
            return {
                data: dataRes.data,
                message: "success",
                status: true
            }
        } else {
            return {
                data: [],
                message: "failed 404",
                status: false
            }
        }



    } catch (error) {
        return {
            data: [],
            message: "failed 404",
            status: false
        }
    }
}



/**
 * author:thuantruong
 * created_at:15/12/2020
 * description: Check whereas User is connected to client
 *              -> if not connected
 *              -> else do nothing
 * @param {*} user_id 
 * @param {*} from 
 * @param {*} to 
 * @param {*} user_image 
 */
export const checkToConnectToUserChat = async (user_id, from, to, user_image) => {
    try {
        let url = serverConfig.url_chatlive;

        let conversation_id = `${from}-${to}`;

        let dataFetch = await fetch(`${url}/connection/${user_id}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "conversation_id": conversation_id,
                "from": from,
                "to": to,
                "user_image": user_image
            })

        });

        if (!dataFetch.ok) {
            return {
                data: [],
                message: "failed " + dataFetch,
                status: false
            }
        }

        let dataRes = await dataFetch.json();
        if (dataRes.status) {
            return {
                data: dataRes.data,
                message: "User was exists",
                status: true
            }
        } else {
            return {
                data: dataRes.data,
                message: "failed 404",
                status: false
            }
        }





    } catch (error) {

    }
}




export const getUserConversation = async (conversation_id, limit = 12, pagenext = 10, sortby = 'asc') => {


    try {
        let url = serverConfig.url_chatlive;
        let dataFetch = await fetch(`${url}/conversations/${conversation_id}?limit=${limit}&pagenext=${pagenext}&sortby=${sortby}`);
        if (!dataFetch.ok) {
            return {
                data: [],
                message: "failed " + dataFetch,
                status: false
            }
        }

        let dataRes = await dataFetch.json();
        if (dataRes.status) {
            return {
                data: dataRes,
                message: "success",
                status: true
            }
        } else {
            return {
                data: [],
                message: "failed 404",
                status: false
            }
        }

    } catch (error) {
        return {
            data: [],
            message: "failed 404",
            status: false
        }
    }
}



export const getUserDetail = async (user_id) => {
    try {
        let url = serverConfig.url;
        let dataFetch = await fetch(`${url}/user/${user_id}`);
        if (!dataFetch.ok) {
            return {
                data: null,
                message: "Error: " + dataFetch,
                status: false,
            }
        }

        let dataRes = await dataFetch.json();
        if (dataRes.status) {
            return {
                data: dataRes.data,
                message: "Get user success",
                status: dataRes.status
            }
        } else {
            return {
                data: null,
                message: "Get user failed",
                status: false,
            }
        }

    } catch (error) {
        return {
            data: null,
            message: "Get user failed",
            status: false,
        }
    }
}





export const getCollaboratorStatistic = async (collaborator_id) => {

    try {
        let url = serverConfig.url;
        let dataFetch = await fetch(`${url}/collaborator-statistic/${collaborator_id}`);
        if (!dataFetch.ok) {
            return {
                data: null,
                message: "Error: " + dataFetch,
                status: false,
            }
        }

        let dataRes = await dataFetch.json();
        if (dataRes.status) {
            return {
                data: dataRes.data,
                message: "Get user success",
                status: dataRes.status
            }
        } else {
            return {
                data: null,
                message: "Get user failed",
                status: false,
            }
        }

    } catch (error) {
        return {
            data: null,
            message: "Get user failed",
            status: false,
        }
    }
}






export const getGraphQl = async () => {



    try {
        let url = 'http://localhost:3000/graphql?';
        let dataFetch = await fetch(url, {
            method: 'GET',
            body: {
                firstName,
            }
        });

        let dataRes = await dataFetch.json();

        console.warn(dataRes);

    } catch (error) {
        console.warn("ERROR : ", error);
    }

}



