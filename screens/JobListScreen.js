import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { ActivityIndicator } from 'react-native-paper';
import CardHorizontal from '../components/Card/CardHorizontal';

import { getJobs } from '../utils/serverApi';

const JobListScreen = (props) => {


    const [jobs, setJobs] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const _getJobs = async () => {
        setIsLoading(true);
        let data = await getJobs();
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
                {
                    jobs.length > 0?
                    jobs.map((e, index) => 
                        <CardHorizontal
                            {...props}
                            item={e}
                            key={index.toString()}
                            index={index}
                            onPress={_navigateToJobDetail}
                        />
                    ):
                    <ActivityIndicator 
                        size={24}
                        style={{marginVertical:32}}
                    />
                }

        </ScrollView>
    )
}

export default JobListScreen

const styles = StyleSheet.create({})
