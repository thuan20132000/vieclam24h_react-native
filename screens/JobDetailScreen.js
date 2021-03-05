import React, { useRef, useState, useEffect, useLayoutEffect } from 'react'
import { Alert, Dimensions, StyleSheet, Text, View, Button, Image, ImageBackground, Modal } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Headline, IconButton, TextInput, Snackbar } from 'react-native-paper';
import Carousel from 'react-native-snap-carousel';
import CardItem from '../components/Card/CardItem';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import CommonIcons from '../constants/CommonIcons';
import CommonColors from '../constants/CommonColors';
import RBSheet from "react-native-raw-bottom-sheet";
import { useSelector } from 'react-redux';

import { getJobDetail, applyJob, checkToConnectToUserChat } from '../utils/serverApi';
import { formatCash } from '../utils/helper';

import { JOB_DATA } from '../utils/SampleData';
import LoadingSimple from '../components/Loading/LoadingSimple';

import ImageViewer from 'react-native-image-zoom-viewer';
import CommonImages from '../constants/CommonImages';


import service_url from '../serverConfig';


const JobDetailScreen = (props) => {
    const { userInformation } = useSelector(state => state.authentication);


    const job_id = props.route?.params?.job_id;

    const productItems = Array(6).fill({});
    const refCarousel = useRef('carousel');
    const refRBSheet_applyJob = useRef();
    const [isLoading, setIsLoading] = useState(false);
    const [isDisabling, setIsDisabling] = useState(false);
    const [galleryVisible, setGalleryVisible] = useState(false);


    // Gallery images
    const images = [{
        // Simplest usage.
        url: 'https://avatars2.githubusercontent.com/u/7970947?v=3&s=460',

        // width: number
        // height: number
        // Optional, if you know the image size, you can set the optimization performance

        // You can pass props to <Image />.
        props: {
            // headers: ...
        }
    }, {
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtt716Ot-mm3fMbISo19RrwLY94wlLocE0Sw&usqp=CAU'
    }];

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
                if (!applyRes.status) {

                    Alert.alert("Thất bại", `${applyRes.data.message}`);
                    setTimeout(() => {
                        refRBSheet_applyJob.current.close();

                    }, 2500);


                } else {
                    Alert.alert("Thành công", "Ứng tuyển thành công, vui lòng chờ người tuyển dụng xác nhận.");
                    setTimeout(() => {
                        refRBSheet_applyJob.current.close();

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


    const _getJobDetail = async () => {
        setIsLoading(true);
        let job = await getJobDetail(job_id);
        // console.warn('job detail: ',job);
        // console.warn('job images: ',job.data.images);

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
        })

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


    useLayoutEffect(() => {

        return () => {

        };

    }, []);

    if (isLoading) {
        return (
            <View
                style={{
                    display: 'flex',
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignContent: 'center',
                    backgroundColor: 'white'

                }}
            >
                <LoadingSimple />

            </View>

        )
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

                            }}
                        >
                            {
                                jobDetail.images?.map((e, index) =>
                                    <TouchableOpacity
                                    
                                        style={[
                                            styles.imageWrap,
                                            {
                                                width: deviceWidth / 3 -10,
                                                height: 120,
                                                marginHorizontal: 2

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
                                borderRadius: 22,
                                marginHorizontal: 8
                            }
                        ]}

                        >
                            <Text style={[
                                styles.customerName,
                                {
                                    fontWeight: '400'
                                }
                            ]}>
                                {jobDetail.author?.name}
                            </Text>
                            <View style={styles.jobAddressContainer}>
                                <MaterialCommunityIcon
                                    name={CommonIcons.homeMarker}
                                    size={28}
                                    color={'coral'}
                                    style={{
                                        marginRight: 8
                                    }}
                                    onPress={_onNavigateToMapDirection}
                                />
                                <Text style={styles.jobAddress}>
                                    {`${jobDetail.location?.province} - ${jobDetail.location?.district}`}
                                </Text>
                            </View>
                            <View style={styles.jobControl}>

                                <TouchableOpacity
                                    onPress={() => refRBSheet_applyJob.current.open()}

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

                                <View
                                    style={[
                                        styles.row
                                    ]}
                                >
                                    <IconButton
                                        icon={CommonIcons.chatMessage}
                                        color={CommonColors.btnSubmit}
                                        size={22}
                                        onPress={_onNavigateToChat}
                                    />
                                    <IconButton
                                        icon={CommonIcons.phone}
                                        color={CommonColors.btnSubmit}
                                        size={22}
                                        onPress={_onNavigateToChat}
                                    />

                                </View>
                            </View>

                        </View>
                        {/* Description */}
                        <View style={[
                            styles.jobDescriptionsContainer,
                            {
                                backgroundColor: 'white',
                                marginHorizontal: 8,
                                borderRadius: 12
                            }
                        ]}
                        >
                            <Text style={styles.jobTitle}>{jobDetail.name}</Text>
                            <Text style={styles.jobPrice}>Giá đưa ra :
                            <Text style={{ fontSize: 18, color: CommonColors.primary }}>
                                    {formatCash(jobDetail.suggestion_price)} vnd
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
                                {/* <Button style={{ marginVertical: 16, width: 160, alignSelf: 'center', backgroundColor: CommonColors.primary }}
                                mode="contained"
                                onPress={_applyJob}
                                loading={isLoading}
                                disabled={isLoading}
                            >
                                Ứng Tuyển
                            </Button> */}

                                <Button
                                    onPress={_applyJob}
                                    title="Ứng Tuyến"
                                    color="#841584"
                                    accessibilityLabel="Learn more about this purple button"
                                />


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
