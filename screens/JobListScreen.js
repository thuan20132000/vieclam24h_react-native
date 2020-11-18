import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import CardHorizontal from '../components/Card/CardHorizontal';

import { getJobs } from '../utils/serverApi';

const JobListScreen = (props) => {


    const [jobs, setJobs] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const _getJobs = async () => {
        setIsLoading(true);
        let data = await getJobs();
        console.warn(data.data);
        if (data.data.length > 0) {
            setJobs(data.data);
        }
        setIsLoading(false);
    }

    const _navigateToJobDetail = async (job_id) => {
        props.navigation.navigate('JobDetail',{job_id:job_id})
    }

    useEffect(() => {
        _getJobs();
    }, []);

    return (
        <ScrollView
            style={{ display: 'flex', flexDirection: 'column', flex: 1 }}
        >
            <View>
                {
                    jobs &&
                    jobs.map((e, index) => 
                        <CardHorizontal
                            {...props}
                            item={e}
                            index={index}
                            onPress={_navigateToJobDetail}
                        />
                    )
                }
            </View>


        </ScrollView>
    )
}

export default JobListScreen

const styles = StyleSheet.create({})
