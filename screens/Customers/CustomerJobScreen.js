import React, { useEffect, useState } from 'react'
import { Alert, Dimensions, Image, RefreshControl, StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import { ActivityIndicator, Badge, Caption, IconButton, Paragraph, Title } from 'react-native-paper';
import CardHorizontal from '../../components/Card/CardHorizontal';
import { useSelector } from 'react-redux';
import {
    getCustomerJobs,
    getUserPendingJobs,
    getUserApprovedJobs,
    getUserConfirmedJobs,
    deleteJobByAuthor,
    _getCreatedJobList
} from '../../utils/serverApi';

import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

import { formatDateTime, formatCash } from '../../utils/helper';
import CommonColors from '../../constants/CommonColors';
import CommonIcons from '../../constants/CommonIcons';
import LoadingSimple from '../../components/Loading/LoadingSimple';
import { JobItemApprovedCard, JobItemConfirmedCard, JobItemPendingCard } from '../../components/Card/CardJobItem';
import { CandidateCard } from '../../components/Card/CardUserItem';
import ButtonIcon from '../../components/Button/ButtonIcon';
import RowInformation from '../../components/Row/RowInformation';

import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';


/**
 * description: collaborators list
 */
const PendingJob = ({ navigation, userInformation }) => {


    const [pendingJobsData, setPendingJobsData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

  
    let timeoutEvent;
    const onRefresh = () => {
        setRefreshing(true);

        timeoutEvent = setTimeout(() => {
            _getCreatedJobList(userInformation.id, 'published')
                .then((data) => {
                    if (data.status) {
                        setPendingJobsData(data.data);
                    }
                })
                .catch((error) => {
                    console.log('error: ', error);
                })
                .finally(() => setRefreshing(false))
        }, 2000);
    };

    useEffect(() => {

        setIsLoading(true);
        _getCreatedJobList(userInformation.id, 'published')
            .then((data) => {
                if (data.status) {
                    setPendingJobsData(data.data);
                }
            })
            .catch((error) => {
                console.log('error: ', error);
            })
            .finally(() => setIsLoading(false))

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


    const _onNavigateToCandidateSelection = (job) => {
        navigation.navigate('JobCandidateSelection',{
            data:job?.candidates
        })
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
                        <JobItemPendingCard
                            key={index.toString()}
                            jobTitle={e?.name}
                            jobPrice={e?.suggestion_price}
                            jobAddress={`${e?.location?.district} - ${e?.location?.province}`}
                            onPressOpen={() => _onNavigateToCandidateSelection(e)}
                            children={
                                <>
                                <RowInformation
                                    iconName={CommonIcons.person}
                                    label={`${e.candidates?.length} người đã ứng tuyển`}
                                    labelStyle={{
                                        color:'red',
                                        fontSize:16,
                                        fontWeight:'700'
                                    }}
                                />
                                <RowInformation
                                    iconName={CommonIcons.calendarCheck}
                                    label={`đăng lúc ${formatDateTime(e?.created_at)}`}
                                />
                                </>
                            }
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


    let timeoutEvent;
    const onRefresh = () => {
        setRefreshing(true);
        timeoutEvent = setTimeout(() => {
            _getCreatedJobList(userInformation.id, 'approved')
                .then((data) => {
                    if (data.status) {
                        setApprovedJobsData(data.data);
                    }
                })
                .catch((error) => {
                    console.log('error: ', error);
                })
                .finally(() => setRefreshing(false))
        }, 2000);
    };



    useEffect(() => {
        setIsLoading(true);
        console.log(userInformation);
        _getCreatedJobList(userInformation.id, 'approved')
            .then((data) => {
                if (data.status) {
                    setApprovedJobsData(data.data);
                }
            })
            .catch((error) => {
                console.log('error: ', error);
            })
            .finally(() => setIsLoading(false));


        return () => {
            clearTimeout(timeoutEvent);
        }

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



    const _onConfirmJob = async (job) => {
        navigation.navigate('JobConfirm', {
            data: job
        });

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

                approvedJobsData.length > 0 &&

                approvedJobsData.map((e, index) =>

                    <JobItemApprovedCard
                        key={index.toString()}
                        jobTitle={e?.job?.name}
                        jobPrice={`${formatCash(e?.job?.suggestion_price)} vnđ`}
                        jobAddress={`${e?.job?.location?.district} - ${e?.job?.location?.province}`}
                        expectedPrice={`${formatCash(e?.expected_price)} vnđ`}
                        pressDisable={true}

                        children={
                            <>
                                <CandidateCard
                                    name={e?.candidate?.username}
                                    phone={e?.candidate?.phone || '097723213'}
                                    message={e?.descriptions}

                                    containerStyle={{

                                    }}
                                />
                                <View
                                    style={[{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'space-around',

                                    }]}
                                >
                                    <ButtonIcon
                                        title={"Huỷ"}
                                        iconName={CommonIcons.removeTrash}
                                    />
                                    <ButtonIcon
                                        title={"Xác nhận"}
                                        iconName={CommonIcons.checkboxCircleMark}
                                        onPress={() => _onConfirmJob(e)}
                                    />

                                </View>
                            </>
                        }
                    />
                )}
        </ScrollView>
    )
}


const ConfirmedJob = ({ navigation, userInformation }) => {


    const [confirmedJobsData, setConfirmedJobsData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);




    let timeoutEvent;
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        timeoutEvent = setTimeout(() => {
            _getCreatedJobList(userInformation.id, 'confirmed')
                .then((data) => {
                    if (data.status) {
                        setConfirmedJobsData(data.data);
                    }
                })
                .catch((error) => {
                    console.log('error: ', error);
                })
                .finally(() => setRefreshing(false))
        }, 2000);
    }, []);



    useEffect(() => {
        setIsLoading(true);
        _getCreatedJobList(userInformation.id, 'confirmed')
            .then((data) => {
                if (data.status) {
                    setConfirmedJobsData(data.data);
                }
            })
            .catch((error) => {
                console.log('error: ', error);
            })
            .finally(() => setIsLoading(false));


        return () => {
            clearTimeout(timeoutEvent);
        }

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
                        <JobItemConfirmedCard
                            key={index.toString()}
                            jobTitle={e?.job?.name}
                            jobAddress={`${e?.job?.location?.district} - ${e?.job?.location?.province}`}
                            pressDisable={true}
                            children={
                                <>
                                    <RowInformation
                                        iconName={CommonIcons.messages}
                                        label={`Đánh giá :`}
                                        value={e?.reviews[0]?.review_content}
                                        containerStyle={{
                                            alignItems: 'center',

                                        }}
                                        labelStyle={{
                                            fontStyle: 'italic'
                                        }}
                                    />
                                    <RowInformation
                                        iconName={CommonIcons.calendarCheck}
                                        value={formatDateTime(e?.created_at || '')}
                                        containerStyle={{
                                            alignItems: 'center',

                                        }}
                                        labelStyle={{
                                            fontStyle: 'italic'
                                        }}
                                    />
                                    <View style={{
                                        display: 'flex',
                                        flexDirection: 'row'
                                    }}>
                                        {
                                            Array(e?.reviews[0]?.review_level).fill({}).map((e, index) =>
                                                <MaterialCommunityIcon
                                                    name={CommonIcons.star}
                                                    color={'gold'}
                                                    size={18}
                                                />

                                            )
                                        }
                                    </View>
                                    <RowInformation
                                        iconName={CommonIcons.tagPrice}
                                        label={`${formatCash(e?.confirmed_price || 0)} vnđ`}
                                        labelStyle={{
                                            color: 'red',
                                            fontSize: 18,
                                            fontWeight: '700'
                                        }}
                                    />

                                    <CandidateCard
                                        name={e?.candidate?.username}
                                        phone={e?.candidate?.phone || '097723213'}
                                        message={e?.descriptions}

                                        containerStyle={{

                                        }}
                                    />


                                    <ButtonIcon
                                        title={"Đánh giá lại"}
                                        iconColor={'white'}
                                        iconName={CommonIcons.checkboxCircleMark}
                                        onPress={() => console.warn('review')}
                                        titleStyle={{
                                            fontWeight: '700',
                                            fontSize: 12,
                                            color: 'white'
                                        }}
                                        containerStyle={{
                                            position: 'absolute',
                                            bottom: 0,
                                            right: 0,
                                            backgroundColor: 'orangered',
                                            padding: 4,
                                            borderRadius: 6
                                        }}
                                    />

                                </>
                            }
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


    const renderScene = ({ route }) => {
        switch (route.key) {
            case 'pendingJob':
                return <PendingJob userInformation={userInformation} navigation={props.navigation} />;
            case 'approvedJob':
                return <ApprovedJob userInformation={userInformation} navigation={props.navigation} />;
            case 'confirmedJob':
                return <ConfirmedJob userInformation={userInformation} navigation={props.navigation} />;
            default:
                return null;
        }
    };

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
