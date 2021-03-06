import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Dimensions, ScrollView, Image, ActivityIndicator } from 'react-native'
import OrderCart from './components/OrderCart'
import StepIndicator from 'react-native-step-indicator';
import CardUserContact from '../../components/Card/CardUserContact';
import { formatDateTime } from '../../utils/helper';
import { IconButton } from 'react-native-paper';
import CommonIcons from '../../constants/CommonIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ButtonSubmit from '../../components/Button/ButtonSubmit';
import { _getCandidateBookingDetail, _updateServiceBooking } from '../../utils/serverApi';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { FAB } from 'react-native-paper';
import CommonColors from '../../constants/CommonColors';
import CommonImages from '../../constants/CommonImages';
import ButtonIcon from '../../components/Button/ButtonIcon';

const OrderDetailScreen = (props) => {
    const navigation = useNavigation();
    const { userInformation } = useSelector(state => state.authentication);

    const { booking_id } = props.route.params;
    const [isLoading, setIsLoading] = React.useState(false);
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

    const [bookingTracking, setBookingTracking] = useState([]);
    const [bookingInfo, setBookingInfo] = useState();



    const _onUpdateTrackking = () => {

        setIsLoading(true);
        _getCandidateBookingDetail(userInformation.id, booking_id)
            .then((res) => {
                // console.log('res: ', res.data.data.order_tracking);
                if (res.status) {
                    let trackking = res.data?.data?.order_tracking;
                    if (trackking && trackking.length > 0) {
                        setBookingTracking(trackking);
                    }
                    setBookingInfo(res.data?.data?.order_info);
                    // console.warn('trackking: ', res.data?.data?.order_info)
                }
            })
            .catch((err) => {
                console.log('error: ', err);
            })
            .finally(() => {
                setIsLoading(false);
            })
    }



    useEffect(() => {


        _onUpdateTrackking();

        navigation.dangerouslyGetParent().setOptions({
            tabBarVisible: false,
        });

        return () => {
            navigation.dangerouslyGetParent().setOptions({
                tabBarVisible: true,
            });

        }

    }, []);




    const _onApprovedServiceBooking = async () => {

        try {

            let fetchRes = await _updateServiceBooking(userInformation.id, booking_id, 'approved', 'Chấp nhận yêu cầu dịch vụ',"Chấp nhận yêu cầu dịch vụ");
            
            if (fetchRes.status) {
                _onUpdateTrackking();
            }else{
                console.warn('res: ',fetchRes)
            }
        } catch (error) {
            console.warn('error: ', error);
        }
    }


    const _onNavigateToConfirm = async () => {

        props.navigation.navigate('OrderConfirm', {
            order: bookingInfo
        })
    }


    const _onSendRequestConfirm = async () => {
        _updateServiceBooking(userInformation.id,booking_id,'request_confirm','yêu cầu xác nhận và đánh giá chất lượng dịch vụ','Vui lòng xác nhận dịch vụ ')
        .then((res) => {
            if(res.status){
                _onUpdateTrackking();
            }else{
                console.warn('error: ',res);
            }
        })
        .catch((err) => {
            console.log('error: ',err)
        })
        .finally(() => {
            console.log('finally');
        })
        
    }



    if (isLoading || !bookingInfo || !bookingTracking) {
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

    return (
        <View
            style={{
                display: 'flex',
                flex: 1
            }}
        >
            <ScrollView

            >
                <OrderCart
                    time={new Date()}
                    service_list={bookingInfo?.services}
                    address={`76 Nguyễn Thái Bình`}
                    created_at={bookingInfo?.created_at}
                    total_price={bookingInfo?.total_price}
                    username={userInformation.id == bookingInfo?.candidate?.user ? bookingInfo?.user?.username : userInformation.username}
                    onDetailPress={() => console.warn('ds')}


                >
                    <TouchableOpacity style={[styles.row, {
                        backgroundColor: 'white'
                    }]} >
                        <Image
                            source={{
                                uri: CommonImages.avatar
                            }}
                            style={{
                                width: 40,
                                height: 40
                            }}
                        />
                        <Text
                            style={{ marginHorizontal: 22, fontSize: 18 }}
                        >
                            {userInformation.id == bookingInfo?.candidate?.user ? bookingInfo?.user?.username : userInformation.username}
                        </Text>
                    </TouchableOpacity>
                </OrderCart>

                <View
                    style={[
                        styles.section,
                        {
                            height: bookingTracking?.length * 120,
                            minHeight: 160,
                            paddingHorizontal: 6,
                            marginVertical: 22
                        }
                    ]}
                >
                    <StepIndicator
                        customStyles={customStyles}
                        currentPosition={bookingTracking?.length - 1}
                        labels={bookingTracking.length <= 0 ? labels : bookingTracking}
                        stepCount={bookingTracking.length || 1}
                        direction={'vertical'}
                        renderLabel={({ position, label, currentPosition, stepStatus }) =>
                            <View
                                style={{
                                    width: deviceWidth - 80,
                                    paddingHorizontal: 6
                                }}
                            >
                                <Text>{label.action_title || "title"}</Text>

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
                                        {label.action_content || " content "}
                                    </Text>
                                    <Text
                                        style={{
                                            fontSize: 10,
                                            color: 'grey',
                                            textAlign: 'right',
                                            marginVertical: 4
                                        }}
                                    >
                                        {formatDateTime(label?.updated_at)}
                                    </Text>

                                </View>
                            </View>
                        }
                    />
                    

                    {
                        (bookingInfo?.status == 'request_confirm' && userInformation.id != bookingInfo.candidate?.user) &&
                        <View
                            style={[
                                styles.row,
                                {
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }
                            ]}
                        >
                            <TouchableOpacity
                                style={{
                                    margin: 4,
                                    backgroundColor: CommonColors.btnSubmit,
                                    padding: 12,
                                    borderRadius: 4
                                }}

                                onPress={_onNavigateToConfirm}
                            >
                                <Text
                                    style={{ fontSize: 12, color: 'white', fontWeight: '700' }}
                                >
                                    Xác nhận hoàn thành
                                    </Text>
                            </TouchableOpacity>
                        </View>

                    }

                    {
                        (bookingTracking.length <= 1 && bookingInfo && userInformation.id == bookingInfo.candidate?.user) &&
                        <View
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <ButtonSubmit
                                label={"Nhận việc"}
                                onItemPress={_onApprovedServiceBooking}
                            />

                        </View>

                    }


                    {
                        (bookingInfo?.status == 'approved' && userInformation.id == bookingInfo.candidate?.user) &&
                        <View
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <ButtonSubmit
                                label={"gửi yêu cầu xác nhận"}
                                onItemPress={_onSendRequestConfirm}
                            />

                        </View>
                    }
                </View>


            </ScrollView>
            <FAB
                style={[
                    styles.fab2,
                    {
                        backgroundColor: CommonColors.btnSubmit
                    }
                ]}
                icon={CommonIcons.chatMessage}
                onPress={() => props.navigation.navigate('Chat',{user:'s'})}
                color={'white'}
            />
            <FAB
                style={[
                    styles.fab,
                    {
                        backgroundColor: CommonColors.btnSubmit
                    }
                ]}
                small={false}
                icon={CommonIcons.phone}
                onPress={() => console.log('Pressed')}
                color={'white'}

            />

        </View>
    )
}
const deviceWidth = Dimensions.get('screen').width;
const deviceHeight = Dimensions.get('screen').height;
export default OrderDetailScreen

const styles = StyleSheet.create({
    section: {
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,

        elevation: 12,
        marginVertical: 1,
        borderRadius: 4,
        marginHorizontal: 4
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 60,
    },
    fab2: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 140,
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    }
})
