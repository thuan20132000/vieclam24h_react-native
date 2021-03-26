import React, { useState, useEffect } from 'react'
import { Alert, KeyboardAvoidingView, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import { ScrollView, TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Button, Paragraph, Dialog, Portal, Title, RadioButton, Drawer, ActivityIndicator, HelperText } from 'react-native-paper';
import CommonColors from '../constants/CommonColors';

import { register } from '../utils/serverApi';

import LocationPicker from '../components/LocationPicker/LocationPicker';
import OccupationSelection from '../components/Selection/OccupationSelection';
import ModalConfirmPhoneNumber from '../components/Modal/ModalConfirmPhoneNumber';


const RegisterScreen = (props) => {

    const {
        navigation
    } = props;

    const [isLoading, setIsLoading] = useState(false);
    const [userInfo, setUserInfo] = useState({
        username: '',
        phonenumber: '',
        password: '',

    });
    const [isConfirm, setIsConfirm] = useState(false);
    const [confirmCode, setConfirmCode] = useState();



    const [isError, setIsError] = useState(false);

    const _onRegister = async () => {
        if (!userInfo.username || !userInfo.phonenumber || !userInfo.password) {
            Alert.alert("Thông báo", "Vui lòng nhập đầy đủ thông tin.")
            return;
        }


        setIsLoading(true);

        let registerRes = await register(
            userInfo.username,
            userInfo.phonenumber,
            userInfo.password
        );

        if (!registerRes.status) {
            setIsError(true);
            setIsLoading(false);

            Alert.alert(
                'Đăng ký thất bại',
                'Vui lòng kiểm tra thông tin đăng ký',
                [
                    { text: 'OK', onPress: () => console.log('OK Pressed') }
                ],
                { cancelable: false }
            );
        } else {
            Alert.alert("Thành Công", "Vui lòng xác nhận số điện thoại để đăng nhập vào hệ thống.",

                [
                    { text: 'OK', onPress: () => setIsConfirm(true) }
                ],
                { cancelable: false }
            );
            setIsLoading(false);

            // setIsConfirm(true);
            // props.navigation.navigate('login');
        }
    }




    const hasErrors = (error) => {
        if (error == 'name') {
            if (userInfo.name.length > 0) {
                return false;
            }
        }

    };




    // Confirm SMS OTP
    const _onCheckConfirmCode = () => {
        if (!confirmCode || confirmCode.length < 6) {
            return false;
        }
        return true;
    }

    const _onConfirmCode = async () => {
        setIsLoading(true);
        let isValid = _onCheckConfirmCode();

        if (!isValid) {
            setIsLoading(false);
            Alert.alert("Thông báo", "Mã OTP không hợp lệ!.")
            return;
        }

        setTimeout(() => {
            setIsConfirm(false);
            setIsLoading(false);
            props.navigation.navigate('login');
        }, 1200);

    }



    return (

        <>
            <KeyboardAvoidingView
                behavior={"height"}
                style={{ flex: 1 }}
                keyboardVerticalOffset={60}


            >
                <ScrollView style={styles.container}>



                    <View style={styles.formLogoWrap}>
                        <Title
                            style={{
                                fontSize: 26,
                                color: CommonColors.primary
                            }}
                        >
                            Dịch vụ 24/7
                </Title>
                        <Text
                            style={{
                                fontSize: 18,
                                color: CommonColors.primary
                            }}
                        >
                            Xin chào!
                </Text>
                    </View>


                    <View style={styles.loginForm}>


                        <TextInput
                            style={[styles.inputLogin, {}]}
                            onChangeText={text => setUserInfo({ ...userInfo, username: text })}
                            value={userInfo.username}
                            placeholder={'Nhập họ và tên'}

                        />
                        {
                            (isError && !userInfo.username)
                            && <HelperText type="error" visible={hasErrors()}>
                                Vui lòng nhập tên!
                            </HelperText>

                        }

                        <TextInput
                            style={[styles.inputLogin, {}]}
                            onChangeText={text => setUserInfo({ ...userInfo, phonenumber: text })}
                            value={userInfo.phonenumber}
                            placeholder={'Số điện thoại'}
                            keyboardType={'numeric'}
                        />
                        {
                            (isError && !userInfo.phonenumber)
                            && <HelperText type="error" visible={hasErrors()}>
                                Vui lòng nhập số điện thoại!
                            </HelperText>

                        }

                        <TextInput
                            style={[styles.inputLogin, {}]}
                            onChangeText={text => setUserInfo({ ...userInfo, password: text })}
                            value={userInfo.password}
                            placeholder={'Mật khẩu'}
                            secureTextEntry={true}

                        />
                        {
                            (isError && !userInfo.password)
                            && <HelperText type="error" visible={hasErrors()}>
                                Vui lòng nhập số điện thoại!
                            </HelperText>

                        }



                        {/*  */}
                        <TouchableOpacity style={styles.buttonSubmit}
                            onPress={_onRegister}
                            disabled={isLoading}
                        >
                            {
                                isLoading && <ActivityIndicator />
                            }
                            <Text style={{ textAlign: 'center', fontWeight: '600', color: 'white', fontSize: 18 }}>Đăng Ký</Text>

                        </TouchableOpacity>
                    </View>
                    <View style={styles.socialNetworkLogin}>
                        <Button style={{ marginRight: 16 }}
                            labelStyle={{
                                color: 'white'
                            }}
                            icon="facebook"
                            mode="contained" onPress={() => console.log('Pressed')}
                        >
                            Facebook
            </Button>
                        <Button
                            labelStyle={{
                                color: 'white'
                            }}
                            color={'salmon'}
                            icon="google"
                            mode="contained" onPress={() => console.log('Pressed')}
                        >
                            Google
            </Button>
                    </View>
                    {/* <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 40 }}>
                        <TouchableOpacity
                            onPress={() => console.warn('ds')}
                        >
                            <Text>Quên mật khẩu?</Text>
                        </TouchableOpacity>
                    </View> */}
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 40 }}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('login')}
                        >
                            <Text>Đã có tài khoản?</Text>
                        </TouchableOpacity>
                    </View>

                </ScrollView >
            </KeyboardAvoidingView>


            <ModalConfirmPhoneNumber
                isVisible={isConfirm}
                setIsVisible={setIsConfirm}
                transparent={true}
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

                            </View> :
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

export default RegisterScreen

const styles = StyleSheet.create({
    formLogoWrap: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1

    },
    inputLogin: {
        marginHorizontal: 16,
        marginVertical: 6,
        padding: 6,
        paddingLeft: 18,
        borderRadius: 22,
        height: 50,
        backgroundColor: 'whitesmoke'
    },
    container: {
        backgroundColor: 'navajowhite',
        flex: 1
    },
    loginForm: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: 60
    },
    buttonSubmit: {
        backgroundColor: CommonColors.primary,
        padding: 12,
        width: 220,
        alignSelf: 'center',
        borderRadius: 22,
        marginVertical: 16
    },
    socialNetworkLogin: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'

    },
    selectButton: {
        padding: 12,
        backgroundColor: 'hsla(360, 100%, 100%, 0.5)',
        width: 160,
        alignSelf: 'center'
    },
    formLogoWrap: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 32

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
    },
    row: {
        display: 'flex',
        flexDirection: 'row'
    }
})
