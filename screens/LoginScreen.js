import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ActivityIndicator, Button, Title } from 'react-native-paper'
import { useDispatch } from 'react-redux';
import CommonColors from '../constants/CommonColors';



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

    const [isLoading, setIsLoading] = useState(false);

    const _login = async () => {

        try {
            setIsLoading(true);
            dispatch(userActions.login(userAuth.email,userAuth.password));
            setIsLoading(false);
        } catch (error) {
            console.warn("ERROR :", error);
        }

    }

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
                        isLoading ? <ActivityIndicator/>:
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
