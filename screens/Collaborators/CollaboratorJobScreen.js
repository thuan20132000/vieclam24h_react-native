import React, { useEffect, useState } from 'react'
import { Dimensions, RefreshControl, StyleSheet, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { useSelector } from 'react-redux';
import JobItem from '../../components/Card/JobItem';
import LoadingSimple from '../../components/Loading/LoadingSimple';
import CommonColors from '../../constants/CommonColors';

import { getCollaboratorJobs } from '../../utils/serverApi';


/**
 * 
 * @param {*} param0 
 */
const ApplyingJob = ({ user_id, status = 2 }) => {

    const [collaboratorJobs, setCollaboratorJob] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const _getCollaboratorJobs = async () => {
            let collaboratorJobRes = await getCollaboratorJobs(user_id, status, 2);

            if (collaboratorJobRes.status) {
                setCollaboratorJob(collaboratorJobRes.data);
            } else {
                setCollaboratorJob([]);
            }
        

    }


    let timeoutEvent;
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setIsLoading(true);
        timeoutEvent = setTimeout(() => {
            _getCollaboratorJobs();
            setRefreshing(false)
            
        }, 2000);
    }, []);

    useEffect(() => {
        _getCollaboratorJobs();
    

        return () => {
            clearTimeout(timeoutEvent);
        }

    }, [])

    return (
        <ScrollView
            tyle={[styles.scene, { backgroundColor: 'white' }]}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />

            }
        >
            {
                collaboratorJobs.map((e, index) =>
                    <JobItem
                        key={index.toString()}
                        job={e}
                        isConfirmed={false}
                    />
                )
            }
        </ScrollView>
    )
}




/**
 * 
 * @param {*} param0 
 */
const ApprovedJob = ({ user_id, status = 3 }) => {
    const [collaboratorJobs, setCollaboratorJob] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const _getCollaboratorJobs = async () => {
        let collaboratorJobRes = await getCollaboratorJobs(user_id, status, 3);
        if (collaboratorJobRes.status) {
            setCollaboratorJob(collaboratorJobRes.data);
        }
    }


    let timeoutEvent;
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);

        timeoutEvent = setTimeout(() => {
            _getCollaboratorJobs();
            setRefreshing(false)
        }, 2000);
    }, []);

    useEffect(() => {
        _getCollaboratorJobs();
        return () => {
            clearTimeout(timeoutEvent);
        }

    }, [])

    if(refreshing){
        return (
            <View
                style={{
                    display:'flex',
                    flex:1 
                }}
            >
                <LoadingSimple/>
            </View>
        )
    }

    return (
        <ScrollView
            style={[styles.scene, { backgroundColor: 'white' }]}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />

            }
        >
            {
                collaboratorJobs.map((e, index) =>
                    <JobItem
                        job={e}
                        key={index.toString()}
                        isConfirmed={false}

                    />
                )
            }
        </ScrollView>
    );
}


const ConfirmJob = ({ user_id, status = 4 }) => {

    const [collaboratorJobs, setCollaboratorJob] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const _getCollaboratorJobs = async () => {
        let collaboratorJobRes = await getCollaboratorJobs(user_id, status, 3);
        if (collaboratorJobRes.status) {
            setCollaboratorJob(collaboratorJobRes.data);
        }
    }


    let timeoutEvent;
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);

        timeoutEvent = setTimeout(() => {
            _getCollaboratorJobs();
            setRefreshing(false)
        }, 2000);
    }, []);


    useEffect(() => {
        _getCollaboratorJobs();

        return () => {
            clearTimeout(timeoutEvent);
        }
    }, [])

    return (
        <ScrollView
            style={[styles.scene, { backgroundColor: 'white' }]}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />

            }
        >
            {
                collaboratorJobs.map((e, index) =>
                    <JobItem
                        job={e}
                        key={index.toString()}
                    />
                )
            }
        </ScrollView>
    );
}




const CollaboratorJobScreen = (props) => {
    const [index, setIndex] = React.useState(0);

    const { userInformation } = useSelector(state => state.authentication);


    const [routes] = React.useState([
        { key: 'applyingJob', title: 'đang ứng tuyển' },
        { key: 'approvedJob', title: 'đã chấp thuận' },
        { key: 'confirmedJob', title: 'đã hoàn thành' },

    ]);
    const renderScene = SceneMap({
        applyingJob: () =>
            <ApplyingJob
                user_id={userInformation.id}
            />,
        approvedJob: () =>
            <ApprovedJob
                user_id={userInformation.id}
            />,
        confirmedJob: () =>
            <ConfirmJob
                user_id={userInformation.id}
            />

    });

    const initialLayout = { width: Dimensions.get('window').width };

    const RenderTabBar = props => (
        <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: 'white' }}
            style={{ backgroundColor: CommonColors.primary }}
            labelStyle={{
                fontWeight: '500',
                fontSize: 12
            }}
        />
    );


    useEffect(() => {
        props.navigation.setOptions({
            title: "Ứng tuyển"
        })
    }, [])



    return (
        <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={initialLayout}
            renderTabBar={RenderTabBar}
        />
    )
}

export default CollaboratorJobScreen

const styles = StyleSheet.create({
    scene: {
        flex: 1,
    },

})
