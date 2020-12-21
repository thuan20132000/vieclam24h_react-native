import React, { useState, useEffect } from 'react'
import { RefreshControl, StyleSheet, Text, View } from 'react-native'
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { ActivityIndicator } from 'react-native-paper';
import CardHorizontal from '../components/Card/CardHorizontal';
import FilterBar from '../components/Filter/FilterBar';

import { getJobs } from '../utils/serverApi';


const JobListScreen = (props) => {


    const [jobs, setJobs] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [perPage, setPerPage] = useState(6);
    const [postnumber, setPostnumber] = useState(0);
    let { category } = props.route.params;

    const _getJobs = async () => {
        setIsLoading(true);

        let data = await getJobs(category.id, perPage, postnumber);
        if (data.data.length > 0) {
            setJobs(data.data);
        }
        setIsLoading(false);
    }

    const _navigateToJobDetail = async (job_id) => {
        props.navigation.navigate('JobDetail', { job_id: job_id })
    }

    useEffect(() => {
        _getJobs();
        props.navigation.dangerouslyGetParent().setOptions({
            tabBarVisible: false
        });

        props.navigation.setOptions({
            title: `${category.name}`
        })

        return () => {
            props.navigation.dangerouslyGetParent().setOptions({
                tabBarVisible: true
            });
        }
    }, []);



    const [selectedId, setSelectedId] = useState(null);

    let timeoutEvent;
    const _loadMoreJobs = async () => {
        setIsLoading(true);
        let postnumberIndex = postnumber + perPage;
        setPostnumber(postnumberIndex);
        let dataRes = await getJobs(category.id, perPage, postnumberIndex);
        if (dataRes.data?.length > 0) {
            setTimeout(() => {
                setJobs([...jobs, ...dataRes.data]);
                setIsLoading(false);

            }, 1200);
        }else{
            setIsLoading(false);
        }
    }



    return (

        <FlatList style={{ flex: 1, zIndex: -1 }}
            showsVerticalScrollIndicator={false}

            data={jobs}
            renderItem={({ item, index }) => (
                <CardHorizontal
                    {...props}
                    item={item}
                    key={index.toString()}
                    index={index}
                    onPress={_navigateToJobDetail}
                />
            )}
            keyExtractor={(item) => item.id}
            extraData={selectedId}
            onEndReachedThreshold={0.5}
            onEndReached={_loadMoreJobs}
            ListFooterComponent={
                <ActivityIndicator
                    animating={isLoading}
                />
            }
        />

    )
}

export default JobListScreen

const styles = StyleSheet.create({})
