import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Dimensions, RefreshControl, StyleSheet, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { useSelector } from 'react-redux';
import JobItem from '../../components/Card/JobItem';
import LoadingSimple from '../../components/Loading/LoadingSimple';
import CommonColors from '../../constants/CommonColors';

import { _getApplyJobList } from '../../utils/serverApi';

import { JobItemApprovedCard, JobItemConfirmedCard, JobItemPendingCard } from '../../components/Card/CardJobItem';
import RowInformation from '../../components/Row/RowInformation';
import CommonIcons from '../../constants/CommonIcons';
import { formatCash, formatDateTime, formatTimeString } from '../../utils/helper';


/**
 * 
 * @param {*} param0 
 */
const ApplyingJob = ({ user_id, status = 2 }) => {

    const [collaboratorJobs, setCollaboratorJob] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const _getCollaboratorJobs = async () => {
        setIsLoading(true);
        let collaboratorJobRes = await _getApplyJobList(user_id, "published");
        // console.warn('res: ',collaboratorJobRes);
        if (collaboratorJobRes.status) {
            setCollaboratorJob(collaboratorJobRes.data);
        } else {
            setCollaboratorJob([]);
        }
        setIsLoading(false);

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

    }, []);


    if (isLoading) {
        return (
            <View
                style={{
                    display: 'flex',
                    flex: 1,
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
            tyle={[styles.scene, { backgroundColor: 'white' }]}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />

            }
        >

            {
                collaboratorJobs.length > 0 &&
                collaboratorJobs.map((e, index) =>
                    // <JobItem
                    //     key={index.toString()}
                    //     job={e}
                    //     isConfirmed={false}
                    // />
                    <JobItemPendingCard
                        key={index.toString()}
                        jobTitle={e.job?.name}
                        jobPrice={e.job?.suggestion_price}
                        jobExpectedPrice={e?.expected_price}
                        jobAddress={e?.job?.location?.province}
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
const ApprovedJob = ({ user_id, status = 3, navigation }) => {
    const [collaboratorJobs, setCollaboratorJob] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const _getCollaboratorJobs = async () => {
        let collaboratorJobRes = await _getApplyJobList(user_id, "approved");
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

    }, []);


    const _onNavigateJobCandidateTracking = (e) => {

        navigation.navigate('JobCandidateTracking');

    }

    if (refreshing) {
        return (
            <View
                style={{
                    display: 'flex',
                    flex: 1
                }}
            >
                <LoadingSimple />
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
                (collaboratorJobs && collaboratorJobs.length > 0) &&
                collaboratorJobs.map((e, index) =>

                    <JobItemApprovedCard
                        key={index.toString()}
                        jobTitle={e?.job?.name}
                        jobPrice={e?.job?.suggestion_price}
                        jobAddress={e?.job?.location?.province}
                        children={
                            <RowInformation
                                iconName={CommonIcons.close}
                                label={formatDateTime(e?.updated_at)}
                            />
                        }
                        onItemPress={() => _onNavigateJobCandidateTracking(e)}

                    />
                )
            }
        </ScrollView>
    );
}


const ConfirmJob = ({ user_id, status = 4, navigation }) => {

    const [collaboratorJobs, setCollaboratorJob] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const _getCollaboratorJobs = async () => {
        let collaboratorJobRes = await _getApplyJobList(user_id, "confirmed", 3);
        if (collaboratorJobRes.status) {
            setCollaboratorJob(collaboratorJobRes.data);
            console.log(collaboratorJobRes.data);
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
    }, []);


    const _onNavigateJobCandidateTracking = (e) => {

        navigation.navigate('JobCandidateTracking');

    }
    return (
        <ScrollView
            style={[styles.scene, { backgroundColor: 'white' }]}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />

            }
        >
            {
                (collaboratorJobs && collaboratorJobs.length > 0) &&
                collaboratorJobs.map((e, index) =>
                    <JobItemConfirmedCard
                        key={index.toString()}
                        jobTitle={e.job?.name}
                        jobAddress={`${e.job?.location?.district || ''} - ${e.job?.location?.province || ''} `}
                        jobPrice={`${formatCash(e.confirmed_price)} vnđ`}
                        onItemPress={() => _onNavigateJobCandidateTracking(e)}
                    >
                        <RowInformation
                            label={`${formatDateTime(e.updated_at)}`}
                            iconName={CommonIcons.calendarCheck}
                        />
                        <RowInformation
                            label={e?.reviews[0]?.content || "Không có đánh giá"}
                            iconName={CommonIcons.messages}
                        />
                        <RowInformation
                            iconName={CommonIcons.star}
                            iconColor={'gold'}
                            label={e?.reviews[0]?.review_level}
                        />
                    </JobItemConfirmedCard>
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

    const renderScene = ({ route }) => {
        switch (route.key) {
            case 'applyingJob':
                return <ApplyingJob user_id={userInformation.id} />;
            case 'approvedJob':
                return <ApprovedJob user_id={userInformation.id} navigation={props.navigation} />;
            case 'confirmedJob':
                return <ConfirmJob user_id={userInformation.id} navigation={props.navigation} />;
            default:
                return null;
        }
    };

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
