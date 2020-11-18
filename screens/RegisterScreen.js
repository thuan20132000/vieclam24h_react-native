import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Button, Title } from 'react-native-paper'
import CommonColors from '../constants/CommonColors';
const RegisterScreen = (props) => {

    const {
        navigation
    } = props;
    
    const [value, onChangeText] = useState();

    return (
        <View style={styles.container}>


            <View style={styles.formLogoWrap}>
                <Title>Viec Lam 24h</Title>
                <Text>Welcome</Text>
            </View>

            <View style={styles.loginForm}>
                <TextInput
                    style={[styles.inputLogin, {}]}
                    onChangeText={text => onChangeText(text)}
                    value={value}
                    placeholder={'Email'}

                />
                <TextInput
                    style={[styles.inputLogin, {}]}
                    onChangeText={text => onChangeText(text)}
                    value={value}
                    placeholder={'Password'}

                />
                <TouchableOpacity style={styles.buttonSubmit}

                >
                    <Text style={{ textAlign: 'center', fontWeight: '600', color: 'white', fontSize: 18 }}>Đăng Nhập</Text>
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
                    onPress={() => navigation.navigate('login')}
                >
                    <Text>Đã có tài khoản?</Text>
                </TouchableOpacity>
            </View>


        </View>
    )
}

export default RegisterScreen

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
