import React, { useState, useEffect } from 'react'
import { Alert, StyleSheet, Text, TextInput, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ActivityIndicator, Button, HelperText, Snackbar, Title } from 'react-native-paper'
import { useDispatch } from 'react-redux';
import CommonColors from '../constants/CommonColors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { login } from '../utils/serverApi';

import * as userActions from '../store/actions/authenticationActions';

const LoginScreen = (props) => {

    const {
        navigation
    } = props;

    const dispatch = useDispatch();
    const [userAuth, setUserAuth] = useState({
        email: '',
        password: ''
    });
    const [loginError, setLoginError] = useState();


    const [isLoading, setIsLoading] = useState(false);

    const _login = async () => {

        try {
            setIsLoading(true);

            let loginRes = await login(userAuth.email, userAuth.password);
            if (loginRes.status) {
                dispatch(userActions.login(loginRes.data));
                _saveUserInfo(loginRes.data);

            }


            if (!loginRes.status) {
                Alert.alert("Failed", loginRes.data?.message);
            }


            setIsLoading(false);
        } catch (error) {
            console.warn("ERROR :", error);
        }

    }




    const _saveUserInfo = async (data) => {

        try {
            const jsonValue = JSON.stringify(data)
            await AsyncStorage.setItem('@user_info', jsonValue)
        } catch (e) {
            // saving error
            console.warn('error: ', e);
        }

    }




    const _getUserInfo = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@user_info')
            let dataRes = jsonValue != null ? JSON.parse(jsonValue) : null;
            if (dataRes) {
                dispatch(userActions.login(dataRes));

            }

        } catch (e) {
            // error reading value
            console.warn('error: ', e);
        }

    }


    useEffect(() => {
        _getUserInfo();

    }, [])



    return (
        <View style={styles.container}>


            <View style={styles.formLogoWrap}>
                <Title>Viec Lam 24h</Title>
                <Text>Welcome</Text>
            </View>

            <View style={styles.loginForm}>
                <TextInput
                    style={[styles.inputLogin, {}]}
                    onChangeText={text => setUserAuth({ ...userAuth, email: text })}
                    value={userAuth.email}
                    placeholder={'Email'}

                />
                <TextInput
                    style={[styles.inputLogin, {}]}
                    onChangeText={text => setUserAuth({ ...userAuth, password: text })}
                    value={userAuth.password}
                    placeholder={'Password'}
                    secureTextEntry={true}

                />
                <TouchableOpacity style={styles.buttonSubmit}
                    onPress={_login}
                >
                    {
                        isLoading ? <ActivityIndicator /> :
                            <Text style={{ textAlign: 'center', fontWeight: '600', color: 'white', fontSize: 18 }}>Đăng Nhập</Text>

                    }
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
            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 40 }}>
                <TouchableOpacity
                    onPress={() => console.warn('ds')}
                >
                    <Text>Quên mật khẩu?</Text>
                </TouchableOpacity>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 40 }}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('register')}
                >
                    <Text>Đăng ký tài khoản mới?</Text>
                </TouchableOpacity>
            </View>



        </View>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    formLogoWrap: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 32

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

    }

})
