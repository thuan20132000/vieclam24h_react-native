import React, { useContext, useState } from 'react'
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert } from 'react-native'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import ItemSelectionChecbox from '../../components/Item/ItemSelectionChecbox'
import CommonColors from '../../constants/CommonColors'
import CommonIcons from '../../constants/CommonIcons'
import { formatCash, formatDateString, formatTimeString } from '../../utils/helper'

import DateTimePicker from '@react-native-community/datetimepicker';
import RowInformation from '../../components/Row/RowInformation'
import { List } from 'react-native-paper'
import BottomNavigation from './components/BottomNavigation'
import { useDispatch, useSelector } from 'react-redux';
import * as cartActions from '../../store/actions/cartActions';
import ModalCompleteConfirmed from '../../components/Modal/ModalCompleteConfirmed'
import { _bookService } from '../../utils/serverApi'


const SelectedServiceReviewScreen = (props) => {
    const { candidate } = props.route?.params;



    const dispatch = useDispatch();
    const { service_list, total_price, total_number } = useSelector(state => state.cart);
    const { location } = useSelector(state => state.location);
    const [dateSelected, setDateSelected] = useState(new Date());
    const [timeSelected, setTimeSelected] = useState(new Date());
    const [descriptions, setDescriptions] = useState('');
    const [serviceLocation, setServiceLocation] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState('cash');
    const { userInformation } = useSelector(state => state.authentication);
    const [isConfirming, setIsConfirming] = useState(false);
    const [isConfirmed, setIsConfirmed] = useState(false);



    const [mode, setMode] = useState('date');
    const [datetimepickerShow, setDatetimepickerShow] = useState(false);

    const onChange = (event, selectedDate) => {
        try {
            setDatetimepickerShow(false);

            const currentDate = selectedDate || dateSelected;
            let selectedTime = new Date(event.nativeEvent.timestamp || currentDate);
            if (mode == 'date') {
                setDateSelected(selectedTime);
            } else if (mode == 'time') {
                setTimeSelected(selectedTime);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const showMode = (currentMode) => {
        setDatetimepickerShow(true);
        // if (currentMode == 'date') {
        //     setDateSelected(new Date());
        // } else {
        //     setTimeSelected(new Date());
        // }
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };

    const [withTime, setWithTime] = useState(false);





    const _onNavigateToPaymentMethodSelection = () => {
        props.navigation.navigate('PaymentMethodSelection');
    }

    const _onNavigateToLocationSelection = () => {
        props.navigation.navigate('LocationSelection', {
            selectedLocation: (location) => {
                setServiceLocation(location);
            }
        });
    }



    const _onReviewSubmit = async () => {

        let services_id_list = service_list.map((e) => e.id);
        let bookres = await _bookService(userInformation.id, candidate.id, total_price, services_id_list);

        if (bookres.status) {
            Alert.alert("Thành công", "Đã gửi yêu cầu dịch vụ thành công, vui lòng theo dõi ở thông báo.", [

                {
                    text: "OK", onPress: () => {
                        props.navigation.reset({
                            index: 0,
                            routes: [
                                { name: 'Notification' },
                               
                            ],
                        });


                    }
                }
            ])
        }


        return;
        setIsConfirming(true);

        setTimeout(() => {


            setIsConfirmed(true);
        }, 2200);

        dispatch(cartActions.updateServiceReview(timeSelected, serviceLocation, paymentMethod));
    }


    const _onBackHomePress = () => {
        setIsConfirmed(false);
        setIsConfirming(false);
        props.navigation.reset({
            index: 1,
            routes: [
                {
                    name: 'SearchHome'
                }
            ]
        })
    }


    return (
        <View
            style={{
                display: 'flex',
                flex: 1,
                backgroundColor: 'white',
                justifyContent: 'space-between'
            }}
        >

            <ScrollView>
                {/* address */}
                <ModalCompleteConfirmed
                    visible={isConfirming}
                    isConfirmed={isConfirmed}
                    setVisible={setIsConfirming}
                    onCompleteSubmit={_onBackHomePress}


                />
                <View
                    style={[styles.section]}
                >

                    <List.Item
                        title="Địa chỉ"
                        left={props => <List.Icon {...props} icon={CommonIcons.mapCheck} />}
                        onPress={_onNavigateToLocationSelection}

                        description={
                            serviceLocation &&
                            `${userInformation.username} (${userInformation.phonenumber}) ${serviceLocation?.address} ${serviceLocation?.subdistrict} ${serviceLocation?.district} ${serviceLocation?.province}`}
                        descriptionNumberOfLines={3}
                    />
                </View>


                {/* time */}
                <View
                    style={[styles.section]}
                >
                    <View style={[styles.group]}>
                        <View>
                            <ItemSelectionChecbox
                                isChecked={withTime}
                                label={'Thời gian'}
                                onItemPress={() => setWithTime(!withTime)}
                                labelStyle={[styles.textLabel]}
                            />
                        </View>
                        {
                            withTime &&
                            <View style={[styles.group, styles.row, { justifyContent: 'space-around' }]}>
                                <TouchableOpacity
                                    onPress={showTimepicker}
                                    style={[styles.buttonpicker]}


                                >
                                    <Text style={[{ textAlign: 'center', fontWeight: '700', fontSize: 18 }]} >
                                        {timeSelected && formatTimeString(timeSelected) || `Chọn giờ`}
                                    </Text>
                                    <Text style={[{ textAlign: 'center' }]}>Giờ</Text>

                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={showDatepicker}
                                    style={[styles.buttonpicker]}
                                >
                                    <Text style={[{ textAlign: 'center', fontWeight: '700', fontSize: 18 }]} > {formatDateString(dateSelected) || `Chọn ngày`} </Text>
                                    <Text style={[{ textAlign: 'center' }]}>Ngày</Text>
                                </TouchableOpacity>
                            </View>
                        }

                        {/* Show datetime picker */}
                        {
                            datetimepickerShow &&
                            <DateTimePicker

                                testID="dateTimePicker"
                                value={dateSelected}
                                mode={mode}
                                is24Hour={true}
                                display="default"
                                onChange={onChange}
                            />

                        }


                    </View>
                </View>


                {/* Services */}
                <View
                    style={[
                        styles.section
                    ]}
                >
                    {
                        service_list && service_list.length > 0 &&
                        service_list.map((e, index) =>
                            <List.Item
                                key={index.toString()}
                                title={e.name}
                                description={formatCash(e.price)}
                                left={props => <List.Icon {...props} icon={CommonIcons.tagPrice} />}
                            />

                        )
                    }

                </View>

                {/* Payment */}
                <View
                    style={[styles.section]}
                >
                    <List.Item
                        title="Phương thức thanh toán"
                        right={props => <List.Icon {...props} icon={CommonIcons.account} />}
                        onPress={_onNavigateToPaymentMethodSelection}
                        description={'Thanh toán tiền mặt'}
                    />
                    <List.Item
                        title="Tổng tiền dịch vụ"
                        description={formatCash(total_price)}
                        descriptionStyle={{
                            color: 'red',
                            fontWeight: '700'
                        }}
                    />
                </View>


            </ScrollView>
            <View
                style={{
                    padding: 12
                }}
            >
                <Text
                    style={{
                        fontSize: 12,
                        textAlign: 'center'

                    }}
                >
                    Xác nhận dịch vụ đồng nghĩa với việc bạn đồng ý với các điều khoản của dịch vụ cung cấp
                    </Text>
            </View>
            <BottomNavigation
                nextTitle={'Xác nhận dịch vụ'}
                nextButtonStyle={{
                    backgroundColor: CommonColors.btnSubmit
                }}
                onNextPress={_onReviewSubmit}

                containerStyle={{
                    borderTopLeftRadius: 22,
                    borderTopRightRadius: 22,
                    shadowColor: "black",
                    shadowOffset: {
                        width: 4,
                        height: 5,
                    },
                    shadowOpacity: 0.65,
                    shadowRadius: 1.84,

                    elevation: 11,

                }}
            />



        </View>
    )
}

export default SelectedServiceReviewScreen

const styles = StyleSheet.create({
    row: {
        display: 'flex',
        flexDirection: 'row',
    },
    column: {
        display: 'flex',
        flexDirection: 'column'
    },
    addressContainer: {
        margin: 4,
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: 6,
        borderRadius: 4,
        paddingVertical: 4
    },
    group: {
        marginVertical: 6,
        marginHorizontal: 4
    },
    textLabel: {
        fontSize: 16,
        fontWeight: '700',
        marginVertical: 4
    },
    textinput: {
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        paddingLeft: 8
    },
    buttonpicker: {
        width: 140,
        backgroundColor: 'white',
        padding: 12,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,

    },
    section: {
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: 6,
        margin: 4
    }
})
