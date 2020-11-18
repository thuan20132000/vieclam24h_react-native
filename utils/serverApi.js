import serverConfig from '../serverConfig';
import api from '../serverConfig';



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
 * description: get all jobs
 * created_at:17/11/2020
 */

export const getJobs = async (category = '', number = '') => {




    try {
        let url = serverConfig.url;
        let dataFetch = await fetch(`${url}/job?category=${category}&number=${number}`);

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

export const applyJob = async (user_id,job_id,expected_price,description="") => {

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
                "user_id":user_id,
                "job_id": job_id
            })
        });

        if(!dataFetch.ok){
            return {
                data:null,
                message:dataFetch
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