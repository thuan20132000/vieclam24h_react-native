import React, { useEffect, useState } from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { TabView, SceneMap } from 'react-native-tab-view';
import { useSelector } from 'react-redux';
import JobItem from '../components/Card/JobItem';

import { getCollaboratorJobs } from '../utils/serverApi';



const ApplyingJob = ({ user_id, status = 2 }) => {

    const [collaboratorJobs, setCollaboratorJob] = useState([]);

    const _getCollaboratorJobs = async () => {
        let collaboratorJobRes = await getCollaboratorJobs(user_id, status,4);
        if (collaboratorJobRes.status) {
            setCollaboratorJob(collaboratorJobRes.data);
        }

    }

    useEffect(() => {
        _getCollaboratorJobs();
    }, [])

    return (
        <ScrollView style={[styles.scene, { backgroundColor: 'white' }]} >
            {
                collaboratorJobs.map((e, index) => <JobItem job={e} />)
            }
        </ScrollView>
    )
}


const ConfirmJob = ({ user_id, status = 3 }) => {

    const [collaboratorJobs, setCollaboratorJob] = useState([]);

    const _getCollaboratorJobs = async () => {
        let collaboratorJobRes = await getCollaboratorJobs(user_id, status, 3);
        if (collaboratorJobRes.status) {
            setCollaboratorJob(collaboratorJobRes.data);
        }
    }

    useEffect(() => {
        _getCollaboratorJobs();
    }, [])

    return (
        <ScrollView style={[styles.scene, { backgroundColor: 'white' }]} >
            {
                collaboratorJobs.map((e, index) => <JobItem job={e} key={index.toString()} />)
            }
        </ScrollView>
    );
}




const CollaboratorJobScreen = () => {
    const [index, setIndex] = React.useState(0);

    const { userInformation } = useSelector(state => state.authentication);


    const [routes] = React.useState([
        { key: 'applyingJob', title: 'đang ứng tuyển' },
        { key: 'confirmJob', title: 'đã xác nhận' },
        { key: 'finishedJob', title: 'đã hoàn thành' },

    ]);
    const renderScene = SceneMap({
        applyingJob: () =>
            <ApplyingJob
                user_id={userInformation.id}
            />,
        confirmJob: () =>
            <ConfirmJob
                user_id={userInformation.id}
            />,
        finishedJob: () =>
            <ConfirmJob
                user_id={userInformation.id}
            />

    });

    const initialLayout = { width: Dimensions.get('window').width };
    return (
        <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={initialLayout}
        />
    )
}

export default CollaboratorJobScreen

const styles = StyleSheet.create({
    scene: {
        flex: 1,
    },

})
