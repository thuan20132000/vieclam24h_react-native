import React, { useState, useRef } from 'react'
import { StyleSheet, Text, TextInput, View, ScrollView, Keyboard, Alert } from 'react-native'
import ReviewSatisfationLevel from '../../components/Review/ReviewSatisfationLevel';
import CommonColors from '../../constants/CommonColors';
import { _confirmService, _confirm_jobcandidate, _updateServiceBooking } from '../../utils/serverApi';
import { useSelector } from 'react-redux';
import { formatCash } from '../../utils/helper';
import ButtonSubmit from '../../components/Button/ButtonSubmit';

const OrderConfirmScreen = (props) => {

    const _refTextInput = useRef();

    const { order } = props.route?.params;

    const { userInformation } = useSelector(state => state.authentication)

    const [confirmedJobInfo, setConfirmedJobInfo] = useState({
        confirmedPrice: '',
        satisfationLevel: '',
        message: ''
    });
    const _onConfirm = async () => {
        // console.warn(data);
        // console.warn('auth: ',userInformation.id);
        // console.warn('candidate_id: ',data);
        _confirmService(userInformation.id, order.id, 'confirmed', 'đã xác nhận và đánh giá', 'Đã xác nhận hoàn thành và đánh giá', confirmedJobInfo.satisfationLevel, confirmedJobInfo.message)
            .then((res) => {
                if (res.status) {
                    Alert.alert("Thành công", "Xác nhận và đánh giá thành công.");
                    setTimeout(() => {
                        props.navigation.goBack();
                    }, 1600);
                } else {
                    console.log('res: ', res);
                }
            })
            .catch((err) => {
                console.warn('error: ', err);
            })
            .finally(() => console.warn('finnaly'));


    }


    React.useEffect(() => {

        console.warn('order: ', order.total_price);

        return () => {
            Keyboard.dismiss();
        }
    }, [])

    return (
        <View
            style={{
                paddingVertical: 60
            }}
        >
            <ScrollView style={{ marginHorizontal: 12 }}>


                <ReviewSatisfationLevel
                    onSelected={(item) => setConfirmedJobInfo({
                        ...confirmedJobInfo, satisfationLevel: item.value
                    })}
                />
                {/*  */}

                <View style={[styles.inputGroup]}>
                    <Text style={[styles.titleCaption]}>Đánh giá </Text>
                    <TextInput style={[styles.textInput, { height: 120, paddingTop: 16 }]}
                        value={confirmedJobInfo.message}
                        onChangeText={(text) => setConfirmedJobInfo({
                            ...confirmedJobInfo, message: text
                        }
                        )}
                        keyboardType={'default'}
                        // numberOfLines={8}
                        multiline={true}
                        placeholder={'Nội dung đánh giá...'}
                        textAlignVertical={'top'}
                        ref={_refTextInput}
                    />
                </View>
                <View
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center'
                    }}
                >
                    <ButtonSubmit
                        onItemPress={_onConfirm}
                        label={'Xác nhận'}
                    />
                </View>

            </ScrollView>
        </View>
    )
}

export default OrderConfirmScreen

const styles = StyleSheet.create({
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
        fontWeight: '700',
        fontSize: 16,
        marginVertical: 4,
        marginHorizontal: 12
    }
})
