import React, { useRef, useEffect, useState } from 'react'
import { Dimensions, Linking, StyleSheet, Text, View, TextInput, Alert } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { ActivityIndicator, Avatar, Chip, IconButton, Snackbar } from 'react-native-paper'
import CommonColors from '../../constants/CommonColors'
import CommonIcons from '../../constants/CommonIcons'
import RBSheet from "react-native-raw-bottom-sheet";
import CollaboratorInformation from '../../components/BottomSheet/CollaboratorInformation'
import {
    selectCandidate,
    confirmFinishedJob,
    checkToConnectToUserChat
} from '../../utils/serverApi';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleBottomSheet from '../../components/BottomSheet/SimpleBottomSheet'
import ReviewSatisfationLevel from '../../components/Review/ReviewSatisfationLevel'
import {useSelector} from 'react-redux';



const JobInidicatorItem = ({
    item,
    job_id,
    pressSelect,
    onNavigateToCollaboratorDetail,
    onConfirmJob,
    navigation

}) => {

    const { userInformation } = useSelector(state => state.authentication);

    const _refCollaboratorInformation = useRef();
    const _refConfirmFinishedJobBottomSheet = useRef();


    const [errorMessage, setErrorMessage] = useState({
        status: false,
        message: ''
    });
    const [showErrorMessage, setShowErrorMessage] = useState(false);

    const navigateToCollaboratorDetail = () => {
        _refCollaboratorInformation.current.open();
    }

    const _onCallPhoneNumber = () => {
        Linking.openURL(`tel:${item?.phonenumber}`)
    }


    const [isLoading, setIsLoading] = useState(false);

    const [confirmedJobInfo, setConfirmedJobInfo] = useState({
        confirmedPrice: '',
        satisfationLevel: '',
        message: ''
    });


    const _onCheckValidationConfirm = () => {
        if (confirmedJobInfo.confirmedPrice == "" || !confirmedJobInfo.confirmedPrice) {
            setErrorMessage({
                status: true,
                message: `Vui lòng nhập giá xác nhận`
            });
            return false;
        }
        if (confirmedJobInfo.satisfationLevel == "" || !confirmedJobInfo.satisfationLevel) {
            setErrorMessage({
                status: true,
                message: `Vui lòng đánh giá ứng viên`
            });
            return false;
        }
        return true;
    }

    const _onConfirmFinishedJob = async () => {
        let checkValidation = _onCheckValidationConfirm();

        if (checkValidation) {
            let confirmRes = await confirmFinishedJob(
                item.job_collaborator_id,
                job_id,
                confirmedJobInfo.confirmedPrice,
                confirmedJobInfo.satisfationLevel,
                confirmedJobInfo.message
            );
            
            if (confirmRes.status) {
                Alert.alert('Thành công',"Xác nhận công việc thành công");
                _refConfirmFinishedJobBottomSheet.current.close();

            }else{
                Alert.alert("Thất bại","Xác nhận công việc thất bại")
            }

        } else {
            setShowErrorMessage(true);
        }
    }

    const _onNavigateToChat = async () => {

       // console.warn(userInformation);
      // console.warn(item);

        let checkUserIsConnected = await checkToConnectToUserChat(
            userInformation.id,
            userInformation.id,
            item.id,
            item?.profile_image || ""
        );

        navigation.navigate('ChatLive', {
            user: item
        });

    }


    return (
        <View
            style={[styles.jobIndicatorItem, item.job_collaborator_status == 3 ? { backgroundColor: CommonColors.secondary } : { backgroundColor: 'white' }]}
        >
            <Avatar.Image size={84} source={{
                uri: item.profile_image || "https://ict-imgs.vgcloud.vn/2020/09/01/19/huong-dan-tao-facebook-avatar.jpg"
            }} />
            <View style={{
                display: 'flex',
                flexDirection: 'column',

            }}
            >
                <Text style={styles.textCaption}>{item?.name}</Text>
                <Text style={styles.textCaption}>Giá nhận : {item?.expected_price}</Text>
                <Text style={styles.textCaption}>Đánh giá: 5</Text>
                <MaterialCommunityIcons
                    name={CommonIcons.circle_brightness}
                    size={22}
                    color={item.job_collaborator_status == 3 ? "green" : 'grey'}
                />

                {
                    item.job_collaborator_status == 3 ?
                        <TouchableOpacity style={styles.buttonSubmit}
                            disabled={isLoading ? true : false}
                            onPress={() => _refConfirmFinishedJobBottomSheet.current.open()}
                        >
                            {
                                isLoading ?
                                    <ActivityIndicator
                                        size={'small'}
                                        color={'blue'}
                                    /> :
                                    <Text style={{ color: 'white', fontSize: 12, fontWeight: '500' }}>Xác nhận hoàn thành</Text>

                            }
                        </TouchableOpacity>
                        :
                        <TouchableOpacity style={styles.buttonSubmit}
                            disabled={isLoading ? true : false}
                            onPress={pressSelect}
                        >
                            {
                                isLoading ?
                                    <ActivityIndicator
                                        size={'small'}
                                        color={'blue'}
                                    /> :
                                    <Text style={{ color: 'white', fontSize: 12, fontWeight: '500' }}>Chọn ứng viên</Text>

                            }
                        </TouchableOpacity>

                }

            </View>




            <View>

                <IconButton
                    icon={CommonIcons.messages}
                    color={CommonColors.primary}
                    size={22}
                    onPress={_onNavigateToChat}
                />
                <IconButton
                    icon={CommonIcons.phone}
                    color={CommonColors.primary}
                    size={22}
                    onPress={_onCallPhoneNumber}
                />
                <IconButton
                    icon={CommonIcons.account}
                    color={CommonColors.primary}
                    size={22}
                    onPress={onNavigateToCollaboratorDetail}
                />

            </View>

            <SimpleBottomSheet
                refRBSheet={_refConfirmFinishedJobBottomSheet}
                height={deviceHeight}
                closeOnDragDown={false}
                closeOnPressMask={false}
                dragFromTopOnly={true}
            >
                <IconButton style={{ position: 'relative', paddingTop: 18 }}
                    icon={CommonIcons.backArrow}
                    color={'black'}
                    size={32}
                    onPress={() => _refConfirmFinishedJobBottomSheet.current.close()}
                />
                <ScrollView style={{ marginHorizontal: 12 }}>

                    <View style={[styles.inputGroup]}>
                        <Text style={[styles.titleCaption]}>Giá xác nhận</Text>
                        <TextInput style={[styles.textInput]}
                            value={confirmedJobInfo.confirmedPrice}
                            onChangeText={(text) => setConfirmedJobInfo({
                                ...confirmedJobInfo, confirmedPrice: text
                            }
                            )}
                            keyboardType={'numeric'}
                            placeholder={`Nhập giá hoàn thành công việc`}

                        />
                        <Text style={{ fontSize: 10, color: 'grey', fontStyle: 'italic' }}>
                            Vui lòng cung cấp giá xác nhận để cải thiện môi trường kết nối tin cậy.
                        </Text>
                    </View>
                    {/*  */}
                    <Text style={[styles.titleCaption, { marginHorizontal: 16 }]}>Mức độ hài lòng</Text>
                    <ReviewSatisfationLevel
                        onSelected={(item) => setConfirmedJobInfo({
                            ...confirmedJobInfo, satisfationLevel: item.value
                        })}
                    />
                    {/*  */}
                    <View style={[styles.inputGroup]}>
                        <Text style={[styles.titleCaption]}>Đánh giá ứng viên</Text>
                        <TextInput style={[styles.textInput, { height: 120, paddingTop: 16 }]}
                            value={confirmedJobInfo.message}
                            onChangeText={(text) => setConfirmedJobInfo({
                                ...confirmedJobInfo, message: text
                            }
                            )}
                            keyboardType={'default'}
                            // numberOfLines={8}
                            multiline={true}
                            placeholder={'Đánh giá'}
                        />
                    </View>

                    <TouchableOpacity style={[styles.buttonSubmit, { backgroundColor: CommonColors.primary, width: 180, alignSelf: 'center' }]}
                        onPress={_onConfirmFinishedJob}
                    >
                        <Text style={{ textAlign: 'center', color: 'white', fontSize: 18, fontWeight: '500' }}>
                            Xác Nhận
                        </Text>
                    </TouchableOpacity>
                </ScrollView>
                {
                    // errorMessage.status &&
                    <Snackbar style={{ backgroundColor: 'coral' }}
                        visible={showErrorMessage}
                        onDismiss={() => setShowErrorMessage(false)}
                        action={{
                            label: 'Undo',
                            onPress: () => console.warn('dsds')
                        }}>


                        {errorMessage.message}
                    </Snackbar>
                }

            </SimpleBottomSheet>


        </View>
    )
}





const JobCollaboratorScreen = (props) => {

    const jobIndicatorData = Array(12).fill({});
    const [jobCandidates, setJobCandidates] = useState([]);
    const [jobId, setJobId] = useState();

    const [approvedCandidate, setApprovedCandidate] = useState();




    const _onSelecteCandidate = async (item) => {
        // console.warn(jobCandidates[0]);
        let selectRes = await selectCandidate(jobId, item.job_collaborator_id);
        if (selectRes.status) {
            let xx = jobCandidates.filter((e, index) => {
                if (e.id != item.id) {
                    e.job_collaborator_status = 1;
                } else {
                    e.job_collaborator_status = 3;
                }
                return jobCandidates;
            });
            setJobCandidates(xx.sort(compare_item));
        }

    }


    const _navigateToCollaboratorDetail = async (item) => {

        props.navigation.navigate('CollaboratorDetail', { collaborator_id: item.id });
    }

    // Comparing based on the property item
    function compare_item(a, b) {
        // a should come before b in the sorted order
        if (a.job_collaborator_status < b.job_collaborator_status) {
            return 1;
            // a should come after b in the sorted order
        } else if (a.job_collaborator_status > b.job_collaborator_status) {
            return -1;
            // and and b are the same
        } else {
            return 0;
        }
    }




    useEffect(() => {
        let jobCandidates = props.route.params?.candidates;
        let job_id = props.route.params?.job_id;
        if (jobCandidates) {
            let candidatesData = props.route.params?.candidates;

            setJobCandidates(candidatesData.sort(compare_item));
        }
        if (job_id) {
            setJobId(job_id);
        }


        props.navigation.setOptions({
            title: 'Ứng viên ứng tuyển'
        });


        props.navigation.dangerouslyGetParent().setOptions({
            tabBarVisible: false
        });

        return () => {
            props.navigation.dangerouslyGetParent().setOptions({
                tabBarVisible: true
            });
        }

    }, []);



    return (
        <>
            {
                // approvedCandidate &&
                // <JobInidicatorItem
                //         item={approvedCandidate}
                // />
            }
            <ScrollView>
                {(jobCandidates && jobId) &&
                    jobCandidates.map((e, index) =>
                        <JobInidicatorItem
                            key={index}
                            item={e}
                            job_id={jobId}
                            pressSelect={() => _onSelecteCandidate(e)}
                            onNavigateToCollaboratorDetail={() => _navigateToCollaboratorDetail(e)}
                            navigation={props.navigation}
                        />
                    )
                }
            </ScrollView>
        </>
    )
}

export default JobCollaboratorScreen

const deviceWidth = Dimensions.get('screen').width;
const deviceHeight = Dimensions.get('screen').height;

const styles = StyleSheet.create({
    jobIndicatorItem: {
        padding: 12,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },

    buttonSubmit: {
        marginVertical: 16,
        backgroundColor: CommonColors.btnSubmit,
        padding: 12,
        borderRadius: 16
    },
    textCaption: {
        fontSize: 14,
        marginVertical: 2,

    },
    textInput: {
        height: 40,
        paddingLeft: 12,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        backgroundColor: 'white',
        marginVertical: 8
    },
    inputGroup: {
        marginVertical: 16,
        marginHorizontal: 8
    },
    titleCaption: {
        fontWeight: '500',
        fontSize: 16,
        marginVertical: 8,
        marginHorizontal: 12
    }
})
