import React from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { TabView, SceneMap } from 'react-native-tab-view';
import JobItem from '../components/Card/JobItem';



const collaboratorJobs = Array(10).fill({});

const ApplyingJob = () => (
    
    <ScrollView style={[styles.scene, { backgroundColor: 'white' }]} >
        {
            collaboratorJobs.map((e,index) => <JobItem/>)
        }
    </ScrollView>
);


const FinishedJob = () => (
    <View style={[styles.scene, { backgroundColor: 'white' }]} />
);



const CollaboratorJobScreen = () => {
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'applyingJob', title: 'Apply Job' },
        { key: 'finishedJob', title: 'Finished Job' },
    ]);

    const renderScene = SceneMap({
        applyingJob: ApplyingJob,
        finishedJob:FinishedJob

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
