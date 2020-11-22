import React, { useRef, useState, useEffect } from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Button, Headline, IconButton, TextInput } from 'react-native-paper';
import Carousel from 'react-native-snap-carousel';
import CardItem from '../components/Card/CardItem';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import CommonIcons from '../constants/CommonIcons';
import CommonColors from '../constants/CommonColors';
import RBSheet from "react-native-raw-bottom-sheet";
import {useSelector} from 'react-redux';

import { getJobDetail,applyJob } from '../utils/serverApi';


const JobDetailScreen = (props) => {
    const {userInformation} = useSelector(state => state.authentication);


    const job_id = props.route?.params?.job_id;

    const productItems = Array(6).fill({});
    const refCarousel = useRef('carousel');
    const refRBSheet_applyJob = useRef();
    const [isLoading, setIsLoading] = useState(false);
    const [isDisabling, setIsDisabling] = useState(false);

    const [jobApplyData,setJobApplyData] = useState({
        expected_price:'',
        description:'',
        user_id:'',
        job_id:''
    });


    const [jobDetail, setJobDetail] = useState();


    const _applyJob = async () => {

        try {
            setIsLoading(true);
            setIsDisabling(true);
            let applyRes = await applyJob(userInformation.id,job_id,jobApplyData.expected_price,jobApplyData.description);
            console.warn('apply: ',applyRes);
            setIsLoading(false);
            setIsDisabling(false);
        } catch (error) {
            console.warn('error: ', error);
            setIsLoading(false);
            setIsDisabling(false);
        }
    }

    const [expectedPrice, setExpectedPrice] = useState('');
    const [jobMessage, setJobMessage] = useState('');

    console.warn(job_id);


    const _getJobDetail = async () => {
        setIsLoading(true);
        let job = await getJobDetail(job_id);
        if (job.data) {
            setJobDetail(job.data);
        }
        setIsLoading(false);
    }

    useEffect(() => {
        _getJobDetail();
    }, [])

    return (
        <ScrollView>
            {
                jobDetail &&

                <>
                    <Carousel
                        ref={refCarousel}
                        data={productItems}
                        renderItem={({ item }) => <CardItem product={item} {...props} />}
                        sliderWidth={deviceWidth}
                        itemWidth={deviceWidth}
                    />
                    {/* user info and location */}
                    <View style={styles.customerInfoContainer}>
                        <Text style={styles.customerName}>{jobDetail.relationships?.author?.name} </Text>
                        <View style={styles.jobAddressContainer}>
                            <MaterialCommunityIcon
                                name={CommonIcons.homeMarker}
                                size={28}
                                color={'#f4a460'}
                            />
                            <Text style={styles.jobAddress}>{jobDetail.relationships?.author?.address}</Text>
                        </View>
                        <View style={styles.jobControl}>
                            <Button
                                mode={'outlined'}
                                onPress={() => refRBSheet_applyJob.current.open()}
                                style={{
                                    justifyContent: 'center',
                                    backgroundColor: CommonColors.primary
                                }}

                            >
                                Ứng tuyển vị trí
                    </Button>
                            <IconButton
                                icon={CommonIcons.chatMessage}
                                color={CommonColors.primary}
                                size={28}
                                onPress={() => console.log('Pressed')}
                            />


                        </View>
                    </View>
                    {/* Description */}
                    <View style={styles.jobDescriptionsContainer}>
                        <Text style={styles.jobTitle}>{jobDetail.attributes.name}</Text>
                        <Text style={styles.jobPrice}>Giá đưa ra : <Text style={{ fontSize: 18, color: CommonColors.primary }}>{jobDetail.attributes.suggestion_price} vnd</Text></Text>
                        <View style={styles.jobDescriptionWrap}>
                            <Text style={styles.jobDescriptionText}>
                                {jobDetail.attributes.description}
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
                                onChangeText={text => setJobApplyData({...jobApplyData,expected_price:text})}
                                keyboardType={'number-pad'}
                            />
                            <TextInput style={[styles.input, { height: 160 }]}
                                label="Lời nhắn"
                                value={jobApplyData.description}
                                onChangeText={text => setJobApplyData({...jobApplyData,description:text})}
                                keyboardType={'default'}
                                multiline={true}

                            />
                            <Button style={{ marginVertical: 16, width: 160, alignSelf: 'center', backgroundColor: CommonColors.primary }}
                                mode="contained"
                                onPress={_applyJob}
                                loading={isLoading}
                                disabled={isDisabling}
                            >
                                Ứng Tuyển
                            </Button>
                        </View>
                    </RBSheet>
                </>
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
    }
})
