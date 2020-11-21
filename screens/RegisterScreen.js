import React, { useState, useEffect } from 'react'
import { Alert, KeyboardAvoidingView, StyleSheet, Text, TextInput, View } from 'react-native'
import { ScrollView, TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Button, Paragraph, Dialog, Portal, Title, RadioButton, Drawer, ActivityIndicator, HelperText } from 'react-native-paper';
import CommonColors from '../constants/CommonColors';

import { register } from '../utils/serverApi';

import LocationPicker from '../components/LocationPicker/LocationPicker';
import OccupationSelection from '../components/Selection/OccupationSelection';


const SelectRole = ({ selectRoleVisible, setSelectRoleVisible, roleSelected, setRoleSelected }) => {

    const [value, setValue] = useState('isCustomer');

    useEffect(() => {
        setRoleSelected(value);
    }, [value])

    const _onConfirm = () => {
        setRoleSelected({
            name: roleSelected == 'isCustomer' ? 'Tôi là khách hàng' : 'Tôi là cộng tác viên',
            value: roleSelected == 'isCustomer'?3:2
        });
        setSelectRoleVisible(false);
    }

    return (
        <View>

            <Portal>
                <Dialog visible={selectRoleVisible} onDismiss={() => setSelectRoleVisible(false)}>
                    <Dialog.Content>
                        <RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value}>
                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <Text>Tôi là khách hàng</Text>
                                <RadioButton
                                    value="isCustomer"
                                />
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }} >
                                <Text>Tôi là cộng tác viên</Text>
                                <RadioButton
                                    value="isCollaborator"
                                />
                            </View>
                        </RadioButton.Group>

                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={_onConfirm}>OK</Button>

                        <Button onPress={() => setSelectRoleVisible(false)}>Cancel</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </View>

    )
}



const RegisterScreen = (props) => {

    const {
        navigation
    } = props;

    const [isLoading, setIsLoading] = useState(false);
    const [selectRoleVisible, setSelectRoleVisible] = useState(false);
    const [roleSelected, setRoleSelected] = useState({
        name: '',
        value: '',
    });

    const [occupationSelect, setOccupationSelect] = useState([]);

    const [value, onChangeText] = useState();

    const [userInfo, setUserInfo] = useState({
        name: '',
        email: '',
        phonenumber: '',
        password: '',
        idcard: '',
        province: '',
        province_code: '',
        district: '',
        district_code: '',
        subDistrict: '',
        subDistrict_code: '',
        address: '',
        role: ''
    });

    const [isError, setIsError] = useState(false);




    const _onRegister = async () => {

        if(!userInfo.role){
            Alert.alert("Alert","Vui lòng chọn vai trò!");
            return;
        }

        setIsLoading(true);

        let registerRes = await register(
            userInfo.name,
            userInfo.email,
            userInfo.password,
            userInfo.phonenumber,
            userInfo.idcard,
            userInfo.province,
            userInfo.district,
            userInfo.subDistrict,
            userInfo.address,
            userInfo.role
        );
        if (!registerRes.status) {
            setIsError(true);
            let errors = registerRes.data.message.email[0];
            Alert.alert("Failed",errors);
        }
        setIsLoading(false);
    }


    useEffect(() => {
        setUserInfo({...userInfo,role:roleSelected.value});

    }, [roleSelected]);


    const hasErrors = (error) => {
        if (error == 'name') {
            if (userInfo.name.length > 0) {
                return false;
            }
        }

    };


    return (
        <KeyboardAvoidingView
            behavior={"height"}
            style={{ flex: 1 }}
            keyboardVerticalOffset={60}


        >
            <ScrollView style={styles.container}>



                <SelectRole
                    selectRoleVisible={selectRoleVisible}
                    setSelectRoleVisible={setSelectRoleVisible}
                    setRoleSelected={setRoleSelected}
                    roleSelected={roleSelected}
                />


                <View style={styles.loginForm}>

                    <TouchableOpacity style={styles.selectButton}
                        onPress={() => setSelectRoleVisible(true)}
                    >
                        <Text>{roleSelected.name ? roleSelected.name : 'Chọn vai trò'}</Text>
                    </TouchableOpacity>

                    {/* display occupation if user is collaborator */}
                    {
                        roleSelected.value == 'isCollaborator' &&
                        <OccupationSelection
                            itemSelected={occupationSelect}
                            setItemSelected={setOccupationSelect}

                        />

                    }

                    <TextInput
                        style={[styles.inputLogin, {}]}
                        onChangeText={text => setUserInfo({...userInfo,name:text})}
                        value={userInfo.name}
                        placeholder={'Tên'}

                    />
                    {
                        (isError && !userInfo.name)
                        && <HelperText type="error" visible={hasErrors()}>
                            Vui lòng nhập tên!
                            </HelperText>

                    }


                    <TextInput
                        style={[styles.inputLogin, {}]}
                        onChangeText={text => setUserInfo({ ...userInfo, email: text })}
                        value={userInfo.email}
                        placeholder={'Email'}

                    />
                    {
                        (isError && !userInfo.email)
                        && <HelperText type="error" visible={hasErrors()}>
                            Vui lòng nhập email!
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
                            Vui lòng nhập mật khẩu!
                            </HelperText>

                    }
                    <TextInput
                        style={[styles.inputLogin, {}]}
                        onChangeText={text => setUserInfo({ ...userInfo, idcard: text })}
                        value={userInfo.idcard}
                        placeholder={'Số chứng minh nhân dân / căn cước công dân'}
                        keyboardType={'numeric'}

                    />
                    {
                        (isError && !userInfo.idcard)
                        && <HelperText type="error" visible={hasErrors()}>
                            Vui lòng nhập chứng minh nhân dân!
                            </HelperText>

                    }

                    <LocationPicker />

                    <TextInput
                        style={[styles.inputLogin, {}]}
                        onChangeText={text => setUserInfo({...userInfo,address:text})}
                        value={userInfo.address}
                        placeholder={'Địa chỉ'}
                        multiline={true}

                    />
                    {
                        (isError && !userInfo.idcard)
                        && <HelperText type="error" visible={hasErrors()}>
                            Vui lòng nhập chứng minh địa chỉ!
                            </HelperText>

                    }


                    {/*  */}
                    <TouchableOpacity style={styles.buttonSubmit}
                        onPress={_onRegister}
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

            </ScrollView >
        </KeyboardAvoidingView>

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
    }
})
