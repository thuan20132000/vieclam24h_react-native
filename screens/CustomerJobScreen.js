import React, { useEffect, useState } from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { ActivityIndicator, Badge, Caption, Paragraph, Title } from 'react-native-paper';
import CardHorizontal from '../components/Card/CardHorizontal';
import { useSelector } from 'react-redux';
import {
    getCustomerJobs,
    getUserPendingJobs,
    getUserApprovedJobs
} from '../utils/serverApi';

import { TabView, SceneMap } from 'react-native-tab-view';



const CustomerJobItem = ({ _onPress, item }) => {


    // const _onPress = () => {
    //     navigation.navigate('JobCollaborator');
    // }
    const [jobItem, setJobItem] = useState({
        title: '',
        description: '',
        suggestion_price: '',
        created_at: '',
        candidateNumber: ''
    });



    useEffect(() => {
        setJobItem({
            title: item?.attributes.name,
            description: item?.attributes.description,
            suggestion_price: item?.attributes.suggestion_price,
            craeted_at: item?.attributes.created_at,
            candidateNumber: item?.relationships?.candidates.length
        });
    }, [])

    return (
        
        <TouchableOpacity style={styles.itemContainer}
            onPress={_onPress}
        >
            <Title>{jobItem.title}</Title>
            <Paragraph>{jobItem.description}</Paragraph>
            <View>
                <Text>Giá đưa ra: 450000</Text>
            </View>
            <Caption>đăng lúc: 12:30 12/11/2020</Caption>
            <Badge style={{ bottom: 100 }}
                size={34}
            >
                {jobItem.candidateNumber}
            </Badge>

        </TouchableOpacity>
    )
}


/**
 * description: collaborators list
 */
const PendingJob = ({ customerJobsData, navigation,isLoading }) => {



    const _navigateToJobCollaboratorApplying = (job) => {
        navigation.navigate('JobCollaboratorApplying', {
            job_id: job.id,
            candidates: job.relationships?.candidates
        });
    }
    return (
        <ScrollView>
            
            {
                !isLoading ?
                customerJobsData.map((e, index) =>
                    <CustomerJobItem
                        key={index.toString()}
                        _onPress={() => _navigateToJobCollaboratorApplying(e)}
                        item={e}
                    />
                ):
                <ActivityIndicator
                    size={'small'}
                />
            }
        </ScrollView>
    )

}



const ApprovedJob = ({ customerJobsData, navigation }) => {
    const _navigateToJobCollaboratorApplying = (job) => {
        navigation.navigate('JobCollaboratorApplying', {
            job_id: job.id,
            candidates: job.relationships?.candidates
        });
    }
    return (
        <ScrollView>
            {
                customerJobsData.map((e, index) =>
                    <CustomerJobItem
                        key={index.toString()}
                        _onPress={() => _navigateToJobCollaboratorApplying(e)}
                        item={e}
                    />
                )
            }
        </ScrollView>
    )
}


const ConfirmedJob = () => {
    return (
        <View>
            <Text>Job confirmed</Text>
        </View>
    )
}


const CustomerJobScreen = (props) => {

    const {
        navigation
    } = props;
    // const customerJobData = Array(10).fill({});

    const [index, setIndex] = useState(0);


    const { userInformation } = useSelector(state => state.authentication);


    const [isLoading,setIsLoading] = useState(false);
    const [customerJobsData, setCustomerJobsData] = useState([]);

    const [pendingJobsData, setPendingJobsData] = useState([]);
    const [approvedJobsData, setApprovedJobsData] = useState([]);
    const [confirmedJobsData, setConfirmJobsData] = useState([]);


    const [sortBy, setSortBy] = useState('desc')


    const _getCustomerJobs = async () => {
        let customerJobsRes = await getCustomerJobs(userInformation.id, sortBy, 12);
        setCustomerJobsData(customerJobsRes.data);
    }


    const _getPendingJobsData = async () => {
        setIsLoading(true);
        let pendingJobsRes = await getUserPendingJobs(userInformation.id);
        if (pendingJobsRes.status) {
            setPendingJobsData(pendingJobsRes.data);
        }
        setIsLoading(false);
    }

    const _getApprovedJobsData = async () => {
        setIsLoading(true);
        let approvedJobsRes = await getUserApprovedJobs(userInformation.id);
        if (approvedJobsRes.status) {
            setApprovedJobsData(approvedJobsRes.data);
        }
        setIsLoading(false);
    }

    useEffect(() => {

        // const unsubscribe = props.navigation.addListener('focus', () => {
        //     // do something



        // });

        // return unsubscribe;
            _getPendingJobsData();
            _getApprovedJobsData();


    }, []);
    const initialLayout = { width: Dimensions.get('window').width };



    const [routes] = useState([
        { key: 'pendingJob', title: 'Đang tuyển' },
        { key: 'approvedJob', title: 'Chờ xác nhận' },
        { key: 'confirmedJob', title: 'Đã xác nhận' }
    ])

    const renderScene = SceneMap({
        pendingJob: () =>
            <PendingJob
                customerJobsData={pendingJobsData}
                navigation={props.navigation}
                isLoading={isLoading}
            />,
        approvedJob: () =>
            <ApprovedJob
                customerJobsData={approvedJobsData}
                navigation={props.navigation}
                isLoading = {isLoading}
            />,
        confirmedJob: () =>
            <ConfirmedJob

            />,


    })

    return (

        <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={initialLayout}
        />
    )
}

export default CustomerJobScreen

const styles = StyleSheet.create({
    itemContainer: {
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        margin: 8,
        padding: 6
    }
})
