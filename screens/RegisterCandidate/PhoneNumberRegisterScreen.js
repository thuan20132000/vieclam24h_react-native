import React, { useState } from 'react'
import { ActivityIndicator, Alert, Button, Pressable, StyleSheet, Text, View } from 'react-native'
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import ModalConfirmPhoneNumber from '../../components/Modal/ModalConfirmPhoneNumber'
import { isPhoneNumber } from '../../utils/helper'
import BottomNavigation from './components/BottomNavigation'

const PhoneNumberRegisterScreen = (props) => {





    React.useLayoutEffect(() => {
        props.navigation.setOptions({
            title: 'Xác minh số điện thoại',

        });
    }, []);



    const [isConfirm, setIsConfirm] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [phoneNumber, setPhoneNumber] = React.useState('');
    const [confirmCode, setConfirmCode] = useState('');

    const _onValidatePhoneNumber = () => {

        if (!isPhoneNumber(phoneNumber)) {
            return false;
        }
        return true;

    }


    const _onCheckConfirmCode = () => {
        if(!confirmCode || confirmCode.length < 6){
            return false;
        }
        return true;
    }

    const _onConfirmCode = async () => {
        setIsLoading(true);
        let isValid = _onCheckConfirmCode();

        if(!isValid){
            setIsLoading(false);
            Alert.alert("Thông báo","Mã OTP không hợp lệ!.")
            return;
        }

        setTimeout(() => {
            setIsConfirm(false);
            setIsLoading(false);
            props.navigation.navigate('ReviewRegister');
        }, 1200);

    }



    const _onNextSection = async () => {
        let isValid = _onValidatePhoneNumber();

        if (!isValid) {
            return;
        }
        setIsConfirm(true);

        
    }







    return (
        <>
            <View
                style={[
                    styles.container
                ]}
            >
                <View style={[
                    {
                        display: 'flex',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        backgroundColor: 'white',
                        flex: 2,
                        alignItems: 'center'
                    }
                ]}>
                    <Text>Nhập số điện thoại xác minh</Text>
                    <TextInput
                        placeholder={"+84"}
                        onChangeText={(text) => setPhoneNumber(text)}
                        style={[
                            styles.inputText,
                            {
                                fontSize: 28,
                                textAlign: 'center'
                            }
                        ]}
                        keyboardType={'number-pad'}
                        value={phoneNumber}

                    />

                </View>


                <BottomNavigation
                    nextTitle={'Tiếp tục'}
                    onNextPress={_onNextSection}
                />

            </View>

            <ModalConfirmPhoneNumber
                isVisible={isConfirm}
                setIsVisible={setIsConfirm}
                transparent={false}
                animationType={"slide"}

            >
                <Text style={{ fontWeight: '700' }}>Nhập mã xác nhận OTP</Text>
                <View style={{ width: 260 }}>
                    <TextInput
                        value={confirmCode}
                        onChangeText={(text) => setConfirmCode(text)}
                        keyboardType={'number-pad'}
                        placeholder={"000000"}
                        style={{
                            borderBottomWidth: 1,
                            borderColor: 'coral',
                            padding: 12,
                            fontSize: 32,
                            textAlign: 'center'
                        }}
                        editable={!isLoading}
                    />

                    {
                        !isLoading ?
                        <View style={[styles.row, {
                            alignItems: 'center',
                            justifyContent: 'space-around',
                            marginVertical: 18
                        }]}>
                            <Pressable
                                style={[styles.button, {
                                }]}
                                onPress={() => setIsConfirm(!isConfirm)}
                            >
                                <Text style={styles.textStyle}>Huỷ</Text>
                            </Pressable>
                            <Pressable
                                style={[styles.button, {}]}
                                onPress={_onConfirmCode}
                            >
                                <Text style={styles.textStyle}>Xác nhận</Text>
                            </Pressable>

                        </View>:
                        <ActivityIndicator
                            color={'coral'}
                            size={'large'}
                        />

                    }
                </View>
            </ModalConfirmPhoneNumber>
        </>
    )
}

export default PhoneNumberRegisterScreen

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        backgroundColor: '#c0c0c0',
        justifyContent: 'space-between'
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
    },
    inputText: {
        backgroundColor: '#f5f5f5',
        width: 280,
        paddingHorizontal: 12

    },
    button: {
        borderRadius: 20,
        padding: 10,
        backgroundColor: 'coral',
        width: 120
    },
    textStyle: {
        fontSize: 18,
        textAlign: 'center',
        color: 'white',
        fontWeight: '700'
    }

})
