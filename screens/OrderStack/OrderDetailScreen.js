import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Dimensions, ScrollView } from 'react-native'
import OrderCart from './components/OrderCart'
import StepIndicator from 'react-native-step-indicator';
import CardUserContact from '../../components/Card/CardUserContact';
import { formatDateTime } from '../../utils/helper';
import { IconButton } from 'react-native-paper';
import CommonIcons from '../../constants/CommonIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ButtonSubmit from '../../components/Button/ButtonSubmit';
import { _getCandidateBookingDetail } from '../../utils/serverApi';
import { useSelector } from 'react-redux';

const OrderDetailScreen = (props) => {

    const { userInformation } = useSelector(state => state.authentication);

    const { booking } = props.route.params;

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


    useEffect(() => {

        _getCandidateBookingDetail(userInformation.id, booking.id)
            .then((res) => {
                // console.log('res: ', res.data.data.order_tracking);
                if (res.status) {
                    setBookingTracking(res.data?.data?.order_tracking);
                }
            })
            .catch((err) => {
                console.log('error: ', err)
            })
            .finally(() => console.log('final '))


        props.navigation.dangerouslyGetParent().dangerouslyGetParent().setOptions({
            tabBarVisible: false,
        });

        return () => {
            props.navigation.dangerouslyGetParent().dangerouslyGetParent().setOptions({
                tabBarVisible: true,
            });

        }

    }, [])

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
                />

                <View
                    style={[
                        styles.section,
                        {
                            height: bookingTracking?.length * 80,
                            minHeight: 80,
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
                                        {formatDateTime(new Date())}
                                    </Text>

                                </View>
                            </View>
                        }



                    />

                    {
                        bookingTracking.length <= 1 &&
                        <View
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginTop:32
                            }}
                        >
                            <ButtonSubmit
                                label={"Nhận việc"}
                            />

                        </View>

                    }
                </View>


            </ScrollView>
            <CardUserContact
                username={'customer'}

                containerStyle={{
                    position: 'absolute',
                    zIndex: 999,
                    bottom: 10,
                    marginHorizontal: 12,
                    display: 'flex',
                    alignSelf: 'center',
                    width: deviceWidth - 12
                }}
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
    }
})
