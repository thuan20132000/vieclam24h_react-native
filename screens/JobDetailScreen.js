import React, { useRef, useState, useEffect, useLayoutEffect } from 'react'
import {
    Alert,
    Dimensions,
    StyleSheet,
    Text,
    View,
    Image,
    Modal,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native'
import { ScrollView, } from 'react-native-gesture-handler';
import { Headline, IconButton, TextInput, Snackbar } from 'react-native-paper';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import CommonIcons from '../constants/CommonIcons';
import CommonColors from '../constants/CommonColors';
import RBSheet from "react-native-raw-bottom-sheet";
import { useSelector } from 'react-redux';

import { getJobDetail, applyJob, checkToConnectToUserChat } from '../utils/serverApi';
import { formatCash } from '../utils/helper';

import ImageViewer from 'react-native-image-zoom-viewer';
import CommonImages from '../constants/CommonImages';


import service_url from '../serverConfig';
import RowInformation from '../components/Row/RowInformation';


const JobDetailScreen = (props) => {
    const { userInformation } = useSelector(state => state.authentication);


    const job_id = props.route?.params?.job_id;

   
    const refRBSheet_applyJob = useRef();
    const [isLoading, setIsLoading] = useState(false);
    const [isDisabling, setIsDisabling] = useState(false);
    const [galleryVisible, setGalleryVisible] = useState(false);


    //const [galleryImages,setGalleryImages] = useState([]);

    const [galleryImages, setGalleryImages] = useState([]);
    const _onOpenPhotoGallery = async () => {


        let images = jobDetail.images.map((e) => {
            return { url: `${service_url.url_absolute}/${e.image}` }
        })
        setGalleryImages(images);
        setGalleryVisible(true);
    }


    const [jobApplyData, setJobApplyData] = useState({
        expected_price: '',
        description: '',
        user_id: '',
        job_id: ''
    });


    const _onValidateMaxSuggesstionPrice = () => {

    }

    const [jobDetail, setJobDetail] = useState();
    const [errorMessagage, setErrorMessage] = useState({
        status: false,
        message: ''
    });
    // const [showError,setShowError] = useState(false);


    const _onCheckValidateApply = () => {

        if ((jobApplyData.expected_price > jobDetail.suggestion_price * 2) || jobApplyData.expected_price < 0) {
            setErrorMessage({
                status: true,
                message: `Mức giá đưa ra không hợp lý`
            });
            return false;
        } else if ((!jobApplyData.description || jobApplyData.description == "")) {
            setErrorMessage({
                status: true,
                message: `Vui lòng nhập lời nhắn`
            });
            return false;
        } else {
            return true;
        }

    }

    const _applyJob = async () => {
        try {
            setIsLoading(true);
            setIsDisabling(true);


            let checkValidated = _onCheckValidateApply();



            if (checkValidated) {

                let applyRes = await applyJob(userInformation.id, job_id, jobApplyData.expected_price, jobApplyData.description);
                console.log('apply res: ',applyRes);
                if (!applyRes.status) {
                    if (applyRes.code == "CANDIDATE_404") {
                        Alert.alert("Thông báo", "Bạn cần đăng ký ứng viên để ứng tuyển.");

                    } else {
                        Alert.alert("Thất bại", `Ứng viên đã ứng tuyển, không thể ứng tuyển lại!`);
                    }
                    refRBSheet_applyJob.current.close();

                    setTimeout(() => {
                        props.navigation.navigate('Accounts')
                        

                    }, 1500);



                } else {
                    Alert.alert("Thành công", "Ứng tuyển thành công, vui lòng chờ người tuyển dụng xác nhận.");
                    setTimeout(() => {
                        refRBSheet_applyJob.current.close();
                        props.navigation.reset({
                            index: 1,
                            routes: [
                                { name: 'HomeStack' },

                            ],
                        })

                    }, 2500);
                }
            }

            setIsLoading(false);
            setIsDisabling(false);
        } catch (error) {
            console.warn('error: ', error);
            setIsLoading(false);
            setIsDisabling(false);
            // refRBSheet_applyJob.current.close();

        }
    }

    const [expectedPrice, setExpectedPrice] = useState('');
    const [jobMessage, setJobMessage] = useState('');

    let timeoutEvent;
    const _getJobDetail = async () => {
        setIsLoading(true);
        let job = await getJobDetail(job_id);


        if (job.data) {
            setJobDetail(job.data);
        }

        setTimeout(() => {
            setIsLoading(false);

        }, 400);
    }

    useEffect(() => {
        _getJobDetail();

        props.navigation.setOptions({
            title: "Chi tiết công việc",
            headerBackTitleVisible: false
        });

        return () => {
            clearTimeout(timeoutEvent);
        }

    }, []);




    const _onNavigateToChat = async () => {
        let author = jobDetail.relationships?.author;
        // console.warn(author);

        let checkUserIsConnected = await checkToConnectToUserChat(
            userInformation.id,
            userInformation.id,
            author.id,
            ""
        );

        //  console.warn(checkUserIsConnected);

        props.navigation.navigate('ChatLive', {
            user: checkUserIsConnected.data
        });
    }



    const _onNavigateToMapDirection = () => {
        props.navigation.navigate('MapDirection')
    }


    return (
        <ScrollView>
            {
                jobDetail ?

                    <>

                        {/* Gallery Image */}
                        {/* Image Show */}
                        <View
                            style={{
                                display: 'flex',
                                justifyContent: 'space-around',
                                alignContent: 'center',
                                flexDirection: "row",
                                flexWrap: 'wrap',
                                marginVertical: 6

                            }}
                        >
                            {
                                jobDetail.images?.map((e, index) =>
                                    <TouchableOpacity key={index.toString()}

                                        style={[
                                            styles.imageWrap,
                                            {
                                                width: deviceWidth / 3 - 10,
                                                height: 120,
                                                marginHorizontal: 2,

                                            }
                                        ]}
                                        onPress={_onOpenPhotoGallery}

                                    >

                                        <Image
                                            source={{
                                                uri: `${service_url.url_absolute}/${e.image}` || CommonImages.notFound
                                            }}
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                borderRadius: 6

                                            }}

                                        />
                                    </TouchableOpacity>
                                )
                            }

                        </View>
                        {/* End Gallery images */}





                        {/* user info and location */}
                        <View style={[
                            styles.customerInfoContainer,
                            {
                                borderRadius: 6,
                                marginHorizontal: 8
                            }
                        ]}

                        >

                            <RowInformation
                                iconName={CommonIcons.account}
                                iconColor={'coral'}
                                value={jobDetail?.author?.username}
                            />
                            <RowInformation
                                iconName={CommonIcons.homeCircle}
                                iconColor={'coral'}
                                value={`${jobDetail.location?.province} - ${jobDetail.location?.district}`}
                            />

                            <View style={styles.jobControl}>

                                <TouchableOpacity
                                    onPress={() => refRBSheet_applyJob.current.open()}
                                    disabled={jobDetail?.author?.id == userInformation.id?true:false}
                                    style={{
                                        paddingHorizontal: 18,
                                        paddingVertical: 12,
                                        backgroundColor: jobDetail?.author?.id == userInformation.id ?'grey':'coral',
                                        borderRadius: 6
                                    }}

                                >
                                    <Text
                                        style={[
                                            {
                                                fontSize: 18,
                                                fontWeight: '700',
                                                color: 'white'
                                            }
                                        ]}
                                    >
                                        Ứng tuyển
                                </Text>
                                </TouchableOpacity>

                                <View
                                    style={[
                                        styles.row,

                                    ]}
                                >
                                    <View
                                        style={[
                                            {
                                                borderRadius: 8,
                                                backgroundColor: 'white',
                                                shadowColor: "#000",
                                                shadowOffset: {
                                                    width: 0,
                                                    height: 2,
                                                },
                                                shadowOpacity: 0.25,
                                                shadowRadius: 3.84,

                                                elevation: 5,
                                                marginHorizontal: 2
                                            }
                                        ]}
                                    >
                                        <IconButton
                                            icon={CommonIcons.chatMessage}
                                            color={CommonColors.btnSubmit}
                                            size={26}
                                            onPress={_onNavigateToChat}
                                        />

                                    </View>
                                    <View
                                        style={[
                                            {
                                                borderRadius: 8,
                                                backgroundColor: 'white',
                                                shadowColor: "#000",
                                                shadowOffset: {
                                                    width: 0,
                                                    height: 2,
                                                },
                                                shadowOpacity: 0.25,
                                                shadowRadius: 3.84,

                                                elevation: 5,
                                                marginHorizontal: 2
                                            }
                                        ]}
                                    >
                                        <IconButton
                                            icon={CommonIcons.phone}
                                            color={CommonColors.btnSubmit}
                                            size={26}
                                            onPress={_onNavigateToChat}
                                        />

                                    </View>

                                </View>
                            </View>

                        </View>

                        {/* Description */}
                        <View style={[
                            styles.jobDescriptionsContainer,
                            {
                                backgroundColor: 'white',
                                marginHorizontal: 8,
                                borderRadius: 6,
                                minHeight: 400
                            }
                        ]}
                        >
                            <Text style={styles.jobTitle}>{jobDetail.name}</Text>
                            <Text style={styles.jobPrice}>Giá đưa ra :
                            <Text style={{ fontSize: 18, color: CommonColors.primary }}>
                                    {formatCash(jobDetail?.suggestion_price)} vnd
                            </Text>
                            </Text>
                            <View style={styles.jobDescriptionWrap}>
                                <Text style={styles.jobDescriptionText}>
                                    {jobDetail.descriptions}
                                </Text>
                            </View>
                        </View>


                        {/* Ref */}
                        <RBSheet
                            ref={refRBSheet_applyJob}
                            closeOnDragDown={true}
                            closeOnPressMask={false}
                            customStyles={{
                                wrapper: {
                                    backgroundColor: "transparent"
                                },
                                draggableIcon: {
                                    backgroundColor: "#000"
                                }
                            }}
                            height={Dimensions.get('screen').height}
                        >

                            <View>

                                <TextInput style={styles.input}
                                    label="Giá đưa ra"
                                    value={jobApplyData.expected_price}
                                    onChangeText={text => setJobApplyData({ ...jobApplyData, expected_price: text })}
                                    keyboardType={'number-pad'}
                                    error={errorMessagage.status ? true : false}
                                />

                                <Text style={{
                                    paddingHorizontal: 18,
                                    color: 'coral',
                                    fontSize: 12,
                                    fontWeight: '300',
                                    fontStyle: 'italic'
                                }}>
                                    Ngân sách đưa ra : {formatCash(jobDetail?.suggestion_price)} VND
                            </Text>
                                <TextInput style={[styles.input, { height: 160 }]}
                                    label="Lời nhắn"
                                    value={jobApplyData.description}
                                    onChangeText={text => setJobApplyData({ ...jobApplyData, description: text })}
                                    keyboardType={'default'}
                                    multiline={true}

                                />


                                <View style={[
                                    styles.row,
                                    {
                                        justifyContent: 'center'
                                    }
                                ]}>
                                    {
                                        isLoading ?
                                            <ActivityIndicator
                                                color={'coral'}
                                                size={'large'}
                                            /> :
                                            <TouchableOpacity
                                                onPress={_applyJob}

                                                style={{
                                                    paddingHorizontal: 18,
                                                    paddingVertical: 12,
                                                    backgroundColor: CommonColors.btnSubmit,
                                                    borderRadius: 12
                                                }}


                                            >
                                                <Text
                                                    style={[
                                                        {
                                                            fontSize: 18,
                                                            fontWeight: '600',
                                                            color: 'white'
                                                        }
                                                    ]}
                                                >
                                                    Ứng tuyển
                                    </Text>
                                            </TouchableOpacity>

                                    }
                                </View>

                                {
                                    errorMessagage.status &&
                                    <Snackbar style={{ backgroundColor: 'coral', position: 'relative', top: 60 }}
                                        visible={errorMessagage.status}
                                        onDismiss={() => setErrorMessage({
                                            status: false
                                        })}
                                        action={{
                                            label: 'cancel',
                                            onPress: () => setErrorMessage({ status: false })
                                        }}
                                    >
                                        {errorMessagage.message}
                                    </Snackbar>
                                }



                            </View>
                        </RBSheet>


                        {/* Gallery Photo */}
                        <Modal visible={galleryVisible} transparent={true}>

                            <ImageViewer
                                imageUrls={galleryImages}

                                onSwipeDown={() => setGalleryVisible(false)}
                                enableSwipeDown={true}



                                renderFooter={() =>
                                    <View

                                    >
                                        <ScrollView
                                            horizontal={true}

                                        >
                                            {
                                                jobDetail.images.map((e, index) =>
                                                    <Image
                                                        key={index.toString()}
                                                        style={{
                                                            width: 80,
                                                            height: 80,
                                                            margin: 12
                                                        }}

                                                        source={{
                                                            uri: `${service_url.url_absolute}/${e.image}` || CommonImages.notFound
                                                        }}
                                                    />
                                                )
                                            }
                                        </ScrollView>
                                    </View>
                                }
                                footerContainerStyle={{
                                    // backgroundColor: 'white',
                                    width: '100%',
                                    height: 100
                                }}

                            />
                        </Modal>

                    </> :
                    <Text>Không tìm thấy công việc.</Text>
            }




        </ScrollView>
    )
}
const deviceWidth = Dimensions.get('screen').width;

export default JobDetailScreen

const styles = StyleSheet.create({
    customerInfoContainer: {
        padding: 12,
        margin: 6,
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
    customerName: {
        fontSize: 24,
    },
    jobAddressContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center'
    },
    jobDescriptionsContainer: {
        padding: 12
    },
    jobTitle: {
        fontSize: 18
    },
    jobControl: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    jobDescriptionText: {
        fontSize: 16,
        margin: 6
    },
    input: {
        marginVertical: 16,
        marginHorizontal: 12
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center'
    },
    imageWrap: {
        marginBottom: 4
    },
    textBackground: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
    }
})
