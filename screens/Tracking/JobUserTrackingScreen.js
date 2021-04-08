import React, { useState, useEffect } from 'react'
import { ActivityIndicator, Dimensions, StyleSheet, Text, View, ScrollView } from 'react-native'
import { JobItemPendingCard } from '../../components/Card/CardJobItem'
import CardUserContact from '../../components/Card/CardUserContact'
import StepIndicator from 'react-native-step-indicator';
import { _getJobCandidateDetail } from '../../utils/serverApi';
import { formatCash, formatDateTime } from '../../utils/helper';
import { useSelector } from 'react-redux';

const JobUserTrackingScreen = (props) => {

    const { userInformation } = useSelector(state => state.authentication);
    const { jobcandidate } = props.route.params;


    const labels = ["Ứng tuyển", "Chờ", "Chấp nhập", "Xác nhận", "Hoàn tất thanh toán"];
    const customStyles = {
        stepIndicatorSize: 25,
        currentStepIndicatorSize: 30,
        separatorStrokeWidth: 2,
        currentStepStrokeWidth: 3,
        stepStrokeCurrentColor: '#fe7013',
        stepStrokeWidth: 3,
        stepStrokeFinishedColor: '#fe7013',
        stepStrokeUnFinishedColor: '#aaaaaa',
        separatorFinishedColor: '#fe7013',
        separatorUnFinishedColor: '#aaaaaa',
        stepIndicatorFinishedColor: '#fe7013',
        stepIndicatorUnFinishedColor: '#ffffff',
        stepIndicatorCurrentColor: '#ffffff',
        stepIndicatorLabelFontSize: 13,
        currentStepIndicatorLabelFontSize: 13,
        stepIndicatorLabelCurrentColor: '#fe7013',
        stepIndicatorLabelFinishedColor: '#ffffff',
        stepIndicatorLabelUnFinishedColor: '#aaaaaa',
        labelColor: '#999999',
        labelSize: 13,
        currentStepLabelColor: '#fe7013',
    }

    const [jobcandidateDetail, setJobCandidateDetail] = useState(null);
    const [jobcandidateTracking, setJobCandidateTracking] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [trackingData, setTrackingData] = useState([]);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        _getJobCandidateDetail(userInformation.id, jobcandidate.id || null)
            .then((dataRes) => {
                if (dataRes.status) {
                    setJobCandidateDetail(dataRes?.data?.jobcandidate_info);
                    setJobCandidateTracking(dataRes?.data?.jobcandidate_tracking);

                } else {
                    setIsError(true);
                }
            })
            .catch((error) => {
                console.log('error: ', error);
            }).finally((e) => setIsLoading(false));

    }, []);



    const _onNavigateUserContact = async () => {
        // console.warn(jobcandidate.candidate);
        // return;
        props.navigation.navigate('CandidateDetail', {
            candidate: jobcandidate?.candidate
        });
    }



    if (isLoading) {
        return (
            <View
                style={{
                    display: 'flex',
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <ActivityIndicator
                    size={'large'}
                    color={'coral'}
                />
            </View>
        )
    }

    if (isError) {
        return (
            <View
                style={{
                    display: 'flex',
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <Text>Error</Text>
            </View>
        )
    }

    return (
        <ScrollView
            style={{
                display: 'flex',
                flex: 1,
                backgroundColor: 'white'
            }}
        >
            <JobItemPendingCard
                jobTitle={jobcandidateDetail?.job?.name}
                jobAddress={`${jobcandidateDetail?.job?.location?.subdistrict} -${jobcandidateDetail?.job?.location?.district} - ${jobcandidateDetail?.job?.location?.province}`}
                jobPrice={`${formatCash(jobcandidateDetail?.job?.suggestion_price)} > ${formatCash(jobcandidateDetail?.expected_price)}`}
                pressDisable={true}
                canRemove={false}
                children={

                    <CardUserContact
                        onItemPress={_onNavigateUserContact}
                        username={jobcandidateDetail?.candidate?.username}
                    />
                }
            />

            <View
                style={{
                    height: jobcandidateTracking.length * 80,
                    paddingHorizontal: 22,
                    backgroundColor: 'white'
                }}
            >
                <StepIndicator
                    customStyles={customStyles}
                    currentPosition={jobcandidateTracking.length - 1}
                    labels={jobcandidateTracking}
                    stepCount={jobcandidateTracking.length}
                    direction={'vertical'}
                    renderLabel={({ position, label, currentPosition, stepStatus }) =>
                        <View
                            style={{
                                width: deviceWidth - 80,
                                paddingHorizontal: 6
                            }}
                        >
                            <Text>{label.action_title}</Text>
                            <View
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'flex-start'
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: 12,
                                        color: 'grey',
                                    }}
                                >
                                    {label.action_content}
                                </Text>
                                <Text
                                    style={{
                                        fontSize: 10,
                                        color: 'grey',
                                        textAlign: 'right',
                                        marginVertical: 4
                                    }}
                                >
                                    {formatDateTime(label.created_at)}
                                </Text>

                            </View>
                        </View>
                    }



                />
            </View>

        </ScrollView>
    )
}
const deviceWidth = Dimensions.get('screen').width;
const deviceHeight = Dimensions.get('screen').height;

export default JobUserTrackingScreen

const styles = StyleSheet.create({})
