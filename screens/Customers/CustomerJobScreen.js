import React, { useEffect, useState } from 'react'
import { Alert, Dimensions, Image, RefreshControl, StyleSheet, Text, View } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { ActivityIndicator, Badge, Caption, IconButton, Paragraph, Title } from 'react-native-paper';
import CardHorizontal from '../../components/Card/CardHorizontal';
import { useSelector } from 'react-redux';
import {
    getCustomerJobs,
    getUserPendingJobs,
    getUserApprovedJobs,
    getUserConfirmedJobs,
    deleteJobByAuthor
} from '../../utils/serverApi';

import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

import { formatDateTime, formatCash } from '../../utils/helper';
import CardJobConfirm from '../../components/Card/CardJobConfirm';
import CommonColors from '../../constants/CommonColors';
import CommonIcons from '../../constants/CommonIcons';
import LoadingSimple from '../../components/Loading/LoadingSimple';



const CustomerJobItem = ({ _onPress, item, _onDelete }) => {


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

    const [isDelete, setIsDelete] = useState(false);



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

        <View>
            <TouchableOpacity style={[styles.itemContainer, { zIndex: -1 }]}
                onPress={_onPress}
            >
                <Text style={{
                    fontSize: 16,
                    color: 'black',
                    fontWeight: '600',
                    width: deviceWidth / 1.5

                }}>
                    {jobItem.title}
                </Text>
                <Paragraph>{jobItem.description}</Paragraph>
                <View>
                    <Text>Giá đưa ra: <Text style={{ color: 'red' }}>{formatCash(jobItem.suggestion_price)} vnđ</Text></Text>
                </View>


                <View style={[{ display: 'flex', flexDirection: 'row' }]}>
                    {
                        item.attributes?.images.map((e, index) =>
                            <Image style={{
                                width: 60,
                                height: 60,
                                margin: 4
                            }}
                                source={{
                                    uri: e.image_url
                                }}
                            />
                        )
                    }
                </View>
                <Caption>Đăng lúc: {formatDateTime(item?.attributes?.created_at)}</Caption>


                <View style={[{ position: 'absolute', right: 0, backgroundColor: CommonColors.primary, padding: 6 }]}>
                    <Text style={[{ color: 'white', fontStyle: 'italic' }]}>
                        Số người ứng tuyển <Text style={{ color: 'red', backgroundColor: 'white', fontWeight: '500', fontSize: 18 }}>{jobItem.candidateNumber}</Text>
                    </Text>
                </View>


            </TouchableOpacity>
            <IconButton style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                width: 100,
                zIndex: 999

            }}
                icon={CommonIcons.removeTrash}
                color={`red`}
                size={26}
                onPress={_onDelete}
                disabled={isDelete}
            />
        </View>



    )
}


/**
 * description: collaborators list
 */
const PendingJob = ({ navigation, userInformation }) => {


    const [pendingJobsData, setPendingJobsData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const _navigateToJobCollaboratorApplying = (job) => {
        navigation.navigate('JobCollaboratorApplying', {
            job_id: job.id,
            candidates: job.relationships?.candidates
        });
    }


    const _getPendingJobsData = async () => {
        setIsLoading(true);
        let pendingJobsRes = await getUserPendingJobs(userInformation.id);
        if (pendingJobsRes.status) {
            setPendingJobsData(pendingJobsRes.data);
        }
        setIsLoading(false);

    }

    let timeoutEvent;
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);

        timeoutEvent = setTimeout(() => {
            let pendingJobsRes = getUserPendingJobs(userInformation.id);
            if (pendingJobsRes.status) {
                setPendingJobsData(pendingJobsRes.data);
            }
            setRefreshing(false)
        }, 2000);
    }, []);

    useEffect(() => {


        _getPendingJobsData();

        return () => {
            clearTimeout(timeoutEvent);
        }
    }, [])


    const _onDeleteJob = async (job) => {
        let deleteRes = await deleteJobByAuthor(userInformation.id, job.id);

        if (deleteRes.status) {
            let jobs = pendingJobsData.filter(e => e.id != job.id);
            setPendingJobsData(jobs);
            Alert.alert("Thành Công", "Xoá công việc thành công")

        } else {
            Alert.alert("Thất Bại", "Xoá công việc thất bại!")

        }
    }


    if (isLoading) {
        return (
            <View
                style={{
                    display: 'flex',
                    flex: 1,
                    backgroundColor: 'white',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <LoadingSimple />
            </View>
        )
    }



    return (
        <ScrollView
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />

            }
        >

            {
                !isLoading ?
                    pendingJobsData.map((e, index) =>
                        <CustomerJobItem
                            key={index.toString()}
                            _onPress={() => _navigateToJobCollaboratorApplying(e)}
                            item={e}
                            _onDelete={() => _onDeleteJob(e)}

                        />
                    ) :
                    <ActivityIndicator
                        size={'small'}
                    />
            }
        </ScrollView>
    )

}



const ApprovedJob = ({ navigation, userInformation }) => {


    const [approvedJobsData, setApprovedJobsData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);


    const _navigateToJobCollaboratorApplying = (job) => {
        navigation.navigate('JobCollaboratorApplying', {
            job_id: job.id,
            candidates: job.relationships?.candidates
        });
    }


    const _getApprovedJobsData = async () => {
        setIsLoading(true);
        let approvedJobsRes = await getUserApprovedJobs(userInformation.id);
        if (approvedJobsRes.status) {
            setApprovedJobsData(approvedJobsRes.data);
        }
        setIsLoading(false);
    }

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);

        setTimeout(() => {
            let approvedJobsRes = getUserApprovedJobs(userInformation.id);
            if (approvedJobsRes.status) {
                setApprovedJobsData(approvedJobsRes.data);
            }
            setRefreshing(false)
        }, 2000);
    }, []);



    useEffect(() => {
        _getApprovedJobsData();
    }, []);




    const _onDeleteJob = async (job) => {
        let deleteRes = await deleteJobByAuthor(userInformation.id, job.id);

        if (deleteRes.status) {
            let jobs = approvedJobsData.filter(e => e.id != job.id);
            setApprovedJobsData(jobs);
            Alert.alert("Thành Công", "Xoá công việc thành công")

        } else {
            Alert.alert("Thất Bại", "Xoá công việc thất bại!")

        }
    }



    if (isLoading) {
        return (
            <View
                style={{
                    display: 'flex',
                    flex: 1,
                    backgroundColor: 'white',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <LoadingSimple />
            </View>
        )
    }

    return (
        <ScrollView
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />

            }
        >
            {
                !isLoading ?

                    approvedJobsData.map((e, index) =>
                        <CustomerJobItem
                            key={index.toString()}
                            _onPress={() => _navigateToJobCollaboratorApplying(e)}
                            item={e}
                            _onDelete={() => _onDeleteJob(e)}
                        />
                    ) :
                    <ActivityIndicator
                        size={'small'}

                    />
            }
        </ScrollView>
    )
}


const ConfirmedJob = ({ navigation, userInformation }) => {


    const [confirmedJobsData, setConfirmedJobsData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);


    const _navigateToJobCollaboratorConfirmed = (job) => {
        navigation.navigate('JobCollaboratorApplying', {
            job_id: job.id,
            candidates: job.relationships?.candidates
        });
    }


    const _getConfirmedJobsData = async () => {
        setIsLoading(true);
        let approvedJobsRes = await getUserConfirmedJobs(userInformation.id);
        if (approvedJobsRes.status) {
            setConfirmedJobsData(approvedJobsRes.data);
        }
        setIsLoading(false);
    }

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            let approvedJobsRes = getUserConfirmedJobs(userInformation.id);
            if (approvedJobsRes.status) {
                setConfirmedJobsData(approvedJobsRes.data);
            }
            setRefreshing(false)
        }, 2000);
    }, []);



    useEffect(() => {
        _getConfirmedJobsData();
    }, []);


    if (isLoading) {
        return (
            <View
                style={{
                    display: 'flex',
                    flex: 1,
                    backgroundColor: 'white',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <LoadingSimple />
            </View>
        )
    }

    return (
        <ScrollView
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />

            }
        >
            {
                !isLoading ?

                    confirmedJobsData.map((e, index) =>
                        <CardJobConfirm
                            key={index.toString()}
                            item={e}

                        />
                    ) :
                    <ActivityIndicator
                        size={'small'}

                    />
            }
        </ScrollView>
    )
}


const CustomerJobScreen = (props) => {

    const {
        navigation
    } = props;
    // const customerJobData = Array(10).fill({});

    const [index, setIndex] = useState(0);


    const { userInformation } = useSelector(state => state.authentication);


    const [isLoading, setIsLoading] = useState(false);
    const [customerJobsData, setCustomerJobsData] = useState([]);

    const [confirmedJobsData, setConfirmJobsData] = useState([]);


    const [sortBy, setSortBy] = useState('desc')


    const _getCustomerJobs = async () => {
        let customerJobsRes = await getCustomerJobs(userInformation.id, sortBy, 12);
        setCustomerJobsData(customerJobsRes.data);
    }


    useEffect(() => {


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
                navigation={props.navigation}
                userInformation={userInformation}
            />,
        approvedJob: () =>
            <ApprovedJob
                navigation={props.navigation}
                userInformation={userInformation}
            />,
        confirmedJob: () =>
            <ConfirmedJob
                navigation={props.navigation}
                userInformation={userInformation}
            />,


    });


    const RenderTabBar = props => (
        <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: 'white' }}
            style={{ backgroundColor: CommonColors.primary }}
            labelStyle={{
                fontWeight: '500'
            }}
        />
    );


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


const deviceWidth = Dimensions.get('screen').width;
const deviceHeight = Dimensions.get('screen').height;
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
