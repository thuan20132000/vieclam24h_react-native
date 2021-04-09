import serverConfig from '../serverConfig';
import api from '../serverConfig';
import storage from '@react-native-firebase/storage';
import { Platform } from 'react-native';
import { generateCode } from './helper';
import messaging from '@react-native-firebase/messaging';

/**
 * author:thuantruong
 * description: Login
 * created_at:21/11/2020
 * 
 * @param {*} phonenumber 
 * @param {*} password 
 */
export const login = async (phonenumber, password) => {


    try {
        let dataFetch = await fetch(`${api.api_v1_login}/signin`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "phonenumber": phonenumber,
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
    phonenumber,
    password

) => {

    try {
        let dataFetch = await fetch(`http://18.141.229.83/api/v1/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: name,
                phonenumber: phonenumber,
                password: password
            })
        });


        if (!dataFetch.ok) {
            console.log("ERROR AT REGISTER : ", dataFetch);
            return {
                data: null,
                message: "Account has exists!",
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
        // let bearer = `Bearer ${access_token}`;
        let dataFetch = await fetch(url, {
            // headers: {
            //     "Authorization": `${bearer}`
            // }
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
        // let bearer = `Bearer ${access_token}`;
        let datafetch;
        if (category_id && category_id != '') {
            datafetch = await fetch(`${api.api_v1}/fields?category_id=${category_id}`, {
                // headers: {
                //     "Authorization": `${bearer}`
                // }
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
        console.log("apply res: ", dataRes);

        if (dataRes?.data?.status) {
            return {
                data: dataRes,
                message: 'success',
                status: true,
            }
        } else {

            return {
                data: dataRes.data,
                message: 'failed',
                status: false,
                code: dataRes?.code

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
        formData.append('author_id', author);
        formData.append('field_id', field_id);

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

        if (!dataRes.status) {
            return {
                status: false,
                message: "error : " + dataRes.message,
                data: []
            }
        }

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
            console.warn(`ERROR AT FETCH UPDATE JOBCANDIDATE CONFIRMED`);
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




export const _searchCandidate = async (
    user_id,
    query = ''
) => {


    try {
        let url = `${api.api_v1}/user/${user_id}/search-candidate?query=${query.toLocaleLowerCase()}`;
        let dataFetch = await fetch(`${url}`);
        if (!dataFetch.ok) {
            console.log('ERROR AT SEARCH JOB');

            return {
                data: [],
                message: dataFetch,
                status: false
            }
        }

        let dataRes = await dataFetch.json();

        if (!dataRes.status) {
            return {
                data: [],
                message: dataRes,
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
            data: [],
            message: 'error ' + error,
            status: false
        }
    }
}






export const _getCandidateDetail = async (
    user_id,
) => {


    try {
        let url = `${api.api_v1}/user/${user_id}/detail`;
        let dataFetch = await fetch(`${url}`);
        if (!dataFetch.ok) {
            console.log('ERROR AT GET CANDIDATE DETAIL');

            return {
                data: [],
                message: dataFetch,
                status: false
            }
        }

        let dataRes = await dataFetch.json();

        if (!dataRes.status) {
            return {
                data: [],
                message: dataRes,
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
            data: [],
            message: 'error ' + error,
            status: false
        }
    }
}






export const _getCandidateReviews = async (
    user_id,
) => {


    try {
        let url = `${api.api_v1}/candidate/${user_id}/reviews`;
        let dataFetch = await fetch(`${url}`);
        if (!dataFetch.ok) {
            console.warn('ERROR AT GET CANDIDATE REVIEWS');

            return {
                data: [],
                message: dataFetch,
                status: false
            }
        }

        let dataRes = await dataFetch.json();

        if (!dataRes.status) {
            return {
                data: [],
                message: dataRes,
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
            data: [],
            message: 'error ' + error,
            status: false
        }
    }
}





export const _getUserNotifications = async (user_id) => {
    try {
        let url = `${api.api_v1}/user/${user_id}/notifications`;
        let dataFetch = await fetch(`${url}`);
        if (!dataFetch.ok) {
            console.warn('ERROR AT GET User Notification');

            return {
                data: [],
                message: dataFetch,
                status: false
            }
        }

        let dataRes = await dataFetch.json();

        if (!dataRes.status) {
            return {
                data: [],
                message: dataRes,
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
            data: [],
            message: 'error ' + error,
            status: false
        }
    }
}





export const _updateUserNotificationStatus = async (user_id, notification_id) => {
    try {
        let url = `${api.api_v1}/user/${user_id}/notification/${notification_id}`;
        let dataFetch = await fetch(`${url}`,{
            method:'PUT'
        });
        if (!dataFetch.ok) {
            console.log('ERROR AT Update User Notification ',url);

            return {
                data: [],
                message: dataFetch,
                status: false
            }
        }

        let dataRes = await dataFetch.json();

        if (!dataRes.status) {
            return {
                data: [],
                message: dataRes,
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
            data: [],
            message: 'error ' + error,
            status: false
        }
    }
}





export const _getJobCandidateDetail = async (user_id, jobcandidate_id) => {
    try {
        let url = `${api.api_v1}/candidate/${user_id}/jobcandidate/${jobcandidate_id}/detail`;
        let dataFetch = await fetch(`${url}`);
        if (!dataFetch.ok) {
            console.warn('ERROR AT GET User Notification');

            return {
                data: [],
                message: dataFetch,
                status: false
            }
        }

        let dataRes = await dataFetch.json();

        if (!dataRes.status) {
            return {
                data: [],
                message: dataRes,
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
            data: [],
            message: 'error ' + error,
            status: false
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


export const onSubscribeToTopic = async (topic_name) => {

    try {


        messaging().subscribeToTopic(topic_name)
            .then(() => {
                return true;
            }).catch(() => {
                return false
            })

        return false;
    } catch (error) {
        return false;
    }
}




export const _updateNotificationStatus = async (
    notification_type,
    value,
    user_id
) => {
    try {
        let formData = new FormData();
        formData.append(notification_type,value);

        let url = `${api.api_v1}/user/${user_id}/notification-configuration/update`;
        let dataFetch = await fetch(`${url}`,{
            method:'PUT',
            body:formData
        });
        if (!dataFetch.ok) {
            console.warn('ERROR AT GET User Notification');

            return {
                data: [],
                message: dataFetch,
                status: false
            }
        }

        let dataRes = await dataFetch.json();

        if (!dataRes.status) {
            return {
                data: [],
                message: dataRes,
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
            data: [],
            message: 'error ' + error,
            status: false
        }
    }
}



export const _getUserNotificationConfig = async (user_id) => {
    try {
        let url = `${api.api_v1}/user/${user_id}/notification-configuration`;
        let dataFetch = await fetch(`${url}`);
        if (!dataFetch.ok) {
            console.log('ERROR AT GET USER NOTIFIACTION CONFIG');

            return {
                data: [],
                message: dataFetch,
                status: false
            }
        }

        let dataRes = await dataFetch.json();

        if (!dataRes.status) {
            return {
                data: [],
                message: dataRes,
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
            data: [],
            message: 'error ' + error,
            status: false
        }
    }
}