import React, { useState, useEffect } from 'react'
import { RefreshControl, StyleSheet, Text, View } from 'react-native'
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { ActivityIndicator } from 'react-native-paper';
import CardHorizontal from '../components/Card/CardHorizontal';
import FilterBar from '../components/Filter/FilterBar';

import { getJobs } from '../utils/serverApi';


const wait = (timeout) => {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}


const JobListScreen = (props) => {


    const [jobs, setJobs] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [perPage, setPerPage] = useState(5);

    const _getJobs = async () => {
        setIsLoading(true);
        let { category_id } = props.route.params;

        let data = await getJobs(category_id, perPage);
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
            tabBarVisible:false
        });

        return ()=>{
            props.navigation.dangerouslyGetParent().setOptions({
                tabBarVisible:true
            });
        }
    }, []);



    const [selectedId, setSelectedId] = useState(null);

    const _loadMoreJobs = async () => {
        setPerPage(perPage + 3);
        await _getJobs();
    }

    const FooterList = () => {
        return (
            <ActivityIndicator
                size={"small"}
                animating={isLoading}
            />
        )
    }
    

    return (
        <View
            style={{
                flex:1,
                justifyContent:'center',
                alignItems:'center'
            }}
        >
            
            {/*  */}
            <FlatList style={{ flex: 1,zIndex:-1 }}
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
                onEndReached={_loadMoreJobs}
                ListFooterComponent={() => <FooterList />}
            />
        </View>

    )
}

export default JobListScreen

const styles = StyleSheet.create({})
