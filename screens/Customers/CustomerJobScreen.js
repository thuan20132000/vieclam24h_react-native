import React, { useEffect, useState } from 'react'
import { Alert, Dimensions, Image, RefreshControl, StyleSheet, Text, View, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native'
import { Badge, Caption, IconButton, Paragraph, Title } from 'react-native-paper';
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

        if (job?.candidates?.length <= 0) {
            return;
        }

        navigation.navigate('JobCandidateSelection', {
            data: job?.candidates
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
                <ActivityIndicator
                    color={'coral'}
                    size={'large'}

                />
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
                            jobPrice={`${formatCash(e?.suggestion_price)} vnđ`}
                            jobAddress={`${e?.location?.district} - ${e?.location?.province}`}
                            onPressOpen={() => _onNavigateToCandidateSelection(e)}
                            children={
                                <>
                                    <RowInformation
                                        iconName={CommonIcons.person}
                                        label={`${e.candidates?.length} người đã ứng tuyển`}
                                        labelStyle={{
                                            color: 'red',
                                            fontSize: 16,
                                            fontWeight: '700'
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
        _getCreatedJobList(userInformation.id, 'approved')
            .then((data) => {
                if (data.status && data.data != null) {

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

    const _onOpenSchedule = async (e) => {
        navigation.navigate('JobUserTracking', {
            data: e,
            jobcandidate: e
        })
    }

    const _onNavigateUserContact = async (e) => {
        // console.warn(e.candidate);
        // return;
        navigation.navigate('CandidateDetail', {
            candidate: e?.candidate
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
                <ActivityIndicator
                    size={'large'}
                    color={'coral'}
                />
            </View>
        )
    }

    if (approvedJobsData?.length <= 0) {
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
                <Text>Chưa có ứng viên</Text>
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

                approvedJobsData?.length > 0 &&

                approvedJobsData.map((e, index) =>

                    <JobItemApprovedCard
                        key={index.toString()}
                        jobTitle={e?.job?.name}
                        jobPrice={`${formatCash(e?.job?.suggestion_price)} - ${formatCash(e?.expected_price)} `}
                        jobAddress={`${e?.job?.location?.district} - ${e?.job?.location?.province}`}
                        expectedPrice={`${formatCash(e?.expected_price)} vnđ`}
                        pressDisable={true}
                        children={
                            <>
                                <CandidateCard
                                    name={e?.candidate?.username}
                                    // phone={e?.candidate?.phone || '097723213'}
                                    // message={e?.descriptions}
                                    containerStyle={[
                                        styles.itemContainer
                                    ]}
                                    onItemPress={() => _onNavigateUserContact(e)}
                                    bodyChildren={
                                        <Text
                                            style={{
                                                fontStyle: 'italic',
                                                color: 'grey',
                                                marginVertical: 4,
                                            }}
                                            numberOfLines={2}
                                            ellipsizeMode={'tail'}
                                        >
                                            {e?.descriptions}
                                        </Text>
                                    }
                                />
                                <View
                                    style={[{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'space-around',

                                    }]}
                                >
                                    <ButtonIcon
                                        title={"Theo dõi"}
                                        iconName={CommonIcons.calendarCheck}
                                        onPress={() => _onOpenSchedule(e)}
                                    />
                                    <ButtonIcon
                                        title={"Xác nhận"}
                                        iconName={CommonIcons.checkboxCircleMark}
                                        onPress={() => _onConfirmJob(e)}
                                        iconColor={'red'}
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
    const onRefresh = () => {
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
    };



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



    const _onOpenSchedule = async (e) => {
        navigation.navigate('JobUserTracking', {
            data: e,
            jobcandidate: e
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
                <ActivityIndicator
                    size={'large'}
                    color={'coral'}

                />
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
                            jobAddress={`${e?.job?.location?.subdistrict} - ${e?.job?.location?.district} - ${e?.job?.location?.province}`}
                            pressDisable={false}
                            onItemPress={() => _onOpenSchedule(e)}
                            children={
                                <>
                                    {/* <RowInformation
                                        iconName={CommonIcons.messages}
                                        label={`Đánh giá :`}
                                        containerStyle={{
                                            alignItems: 'center',

                                        }}
                                        labelStyle={{
                                            fontStyle: 'italic'
                                        }}
                                    /> */}

                                    <View
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            justifyContent: 'flex-start',
                                            alignItems: 'flex-start',
                                        }}
                                    >
                                        <RowInformation
                                            iconName={CommonIcons.calendarCheck}
                                            value={formatDateTime(e?.created_at || '')}
                                            containerStyle={{
                                                alignItems: 'center',
                                                width: '50%'

                                            }}
                                            labelStyle={{
                                                fontStyle: 'italic'
                                            }}
                                        />
                                        <RowInformation
                                            iconName={CommonIcons.calendarCheck}
                                            value={formatDateTime(e?.updated_at || '')}
                                            containerStyle={{
                                                alignItems: 'center',
                                                width: '50%'


                                            }}
                                            labelStyle={{
                                                fontStyle: 'italic'
                                            }}
                                        />

                                    </View>
                                    <RowInformation
                                        iconName={CommonIcons.tagPrice}
                                        value={`${formatCash(e?.job?.suggestion_price)} vnđ`}
                                        valueStyle={{
                                            color: 'red'
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
