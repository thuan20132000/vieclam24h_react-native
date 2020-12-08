import React, { useState, useEffect } from 'react'
import { Alert, KeyboardAvoidingView, StyleSheet, View } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Dialog, Portal, Text, TextInput, Menu, Button, Divider, Title, Drawer, ActivityIndicator, Avatar, IconButton } from 'react-native-paper';
import CommonColors from '../constants/CommonColors';
import { useSelector } from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';

import { getProvince, getDistrict, getSubdistrict } from './../utils/locationApi';
import { updateUser } from './../utils/serverApi';
import CommonImages from '../constants/CommonImages';
import storage from '@react-native-firebase/storage';
import { utils } from '@react-native-firebase/app';

import {generateCode} from '../utils/helper';

import { useDispatch } from 'react-redux';
import * as userActions from '../store/actions/authenticationActions';

const SelectItem = ({ setDialogVisible, item, setLocationSelected, locationSelected, selectLocationType }) => {
    const [visible, setVisible] = React.useState(false);



    const openMenu = () => setVisible(true);

    const closeMenu = () => setVisible(false);

    const _onSelectItem = async () => {
        if (selectLocationType == 'province') {
            setLocationSelected({ ...locationSelected, province: item.name_with_type, province_code: item.code });
            setDialogVisible(false)
        }
        if (selectLocationType == 'district') {
            setLocationSelected({ ...locationSelected, district: item.name_with_type, district_code: item.code });
            setDialogVisible(false)
        }
        if (selectLocationType == 'subdistrict') {
            setLocationSelected({ ...locationSelected, subdistrict: item.name_with_type, subdistrict_code: item.code });
            setDialogVisible(false)
        }
    }

    return (
        <Drawer.Item
            style={{ backgroundColor: 'white' }}
            label={item.name_with_type}
            onPress={_onSelectItem}
        />

    )
}

const CollaboratorProfileScreen = () => {

    const { userInformation } = useSelector(state => state.authentication);

    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [profileImage,setProfileImage] = useState('');
    const [userProfile, setUserProfile] = useState({
        id: '',
        username: '',
        email: '',
        phoneNumber: '',
        idCard: '',
        province: '',
        district: '',
        subdistrict: '',
        address: '',
        profile_image:''
    });

    useEffect(() => {
        if (userInformation) {
            setUserProfile({
                id: userInformation.id,
                username: userInformation.attributes?.name,
                email: userInformation.attributes?.email,
                phoneNumber: userInformation.attributes?.phonenumber,
                idCard: userInformation.attributes?.idcard,
                address: userInformation.attributes?.address,
                profile_image:userInformation?.attributes?.profile_image
            });
        }

    }, [userInformation]);


    const [dialogVisible, setDialogVisible] = useState(false);
    const [dialogData, setDialogData] = useState([]);
    const [locationSelected, setLocationSelected] = useState({
        province: '',
        province_code: '',
        district: '',
        district_code: '',
        subdistrict: '',
        subdistrict_code: '',
    });
    const [selectLocationType, setSelectLocationType] = useState('province');
    const _openDialogLocation = async (type) => {
        setIsLoading(true);
        if (type == 'province') {
            setSelectLocationType(type);
            let locationRes = await getProvince();
            setDialogData(Object.values(locationRes.data));
            setDialogVisible(true);
        }
        if (type == 'district') {
            setSelectLocationType(type);
            if (locationSelected.province_code) {
                let locationRes = await getDistrict(locationSelected.province_code);
                setDialogData(Object.values(locationRes.data));
                setDialogVisible(true);
            }

        }
        if (type == 'subdistrict') {
            setSelectLocationType(type);
            if (locationSelected.district_code) {
                let locationRes = await getSubdistrict(locationSelected.district_code);
                setDialogData(Object.values(locationRes.data));
                setDialogVisible(true);
            }
        }
        setIsLoading(false);

    }

    const [isUpdating,setIsUpdating] = useState(false);
    const _updateUserProfile = async () => {

        // console.warn(userProfile);
        // console.warn(locationSelected)
        let image_update = userProfile.profile_image;
        setIsUpdating(true);
        if(profileImage){
            let image_name = await generateCode('_');
            const reference = storage().ref(image_name);
            let image_updaloaded = await reference.putFile(profileImage);
            let image_url = await storage().ref(image_name).getDownloadURL();
            image_update = image_url;
        }

        let userRes = await updateUser(
            userProfile.id,
            userProfile.username,
            userProfile.phoneNumber,
            userProfile.idCard,
            userProfile.address,
            locationSelected.province_code,
            locationSelected.district_code,
            locationSelected.subdistrict_code,
            image_update
        )

        if(!userRes.status){
            Alert.alert("Thất bại","Cập nhật không thành công");

        }else{
            Alert.alert("Thành công","Cập nhật tài khoản thành công");

       
            dispatch(userActions.update(userRes.data));
        }

        setIsUpdating(false);
    }


    const _onOpenImagePicker = async () => {
        ImagePicker.openPicker({
            multiple:false,
            mediaType:'photo'
        }).then(imageRes => {
            setUserProfile({...userProfile,profile_image:imageRes.path});
            setProfileImage(imageRes.path);
        });

    }

    useEffect(() => {
        setLocationSelected({ ...locationSelected, district: '', district_code: '' })
    }, [locationSelected.province]);

    useEffect(() => {
        setLocationSelected({ ...locationSelected, subdistrict: '', subdistrict_code: '' })
    }, [locationSelected.district])

    return (

        <ScrollView>
            <KeyboardAvoidingView
                behavior={"padding"}
                style={{
                    backgroundColor: 'white', flex: 1
                }}
                keyboardVerticalOffset={50}
            >
                <View style={{display:'flex',alignItems:'center'}}>
                    <Avatar.Image style={{ zIndex: -1, position: 'relative' }}
                        size={88}
                        source={{
                            uri: userProfile.profile_image || CommonImages.avatar
                        }}
                    />
                    <IconButton style={{ position: 'absolute', left: '50%', bottom: -10 }}
                        icon={"camera"}
                        color={CommonColors.primary}
                        size={20}
                        onPress={_onOpenImagePicker}
                    />
                </View>
                <TextInput style={styles.input}
                    label="Tên"
                    value={userProfile.username}
                    onChangeText={text => setUserProfile({ ...userProfile, username: text })}
                />
                <TextInput style={styles.input}
                    label="Email"
                    value={userProfile.email}
                    onChangeText={text => setUserProfile({ ...userProfile, email: text })}
                />
                <TextInput style={styles.input}
                    label="Số điện thoại"
                    value={userProfile.phoneNumber}
                    onChangeText={text => setUserProfile({ ...userProfile, phoneNumber: text })}
                />
                <TextInput style={styles.input}
                    label="Chứng minh nhân dân"
                    value={userProfile.idCard}
                    onChangeText={text => setUserProfile({ ...userProfile, idCard: text })}
                />

                <Drawer.Item
                    style={{ backgroundColor: CommonColors.primary }}
                    label={locationSelected.province || "Chọn Tỉnh / Thành Phố"}
                    onPress={() => _openDialogLocation('province')}
                />
                <Drawer.Item
                    style={{ backgroundColor: CommonColors.primary }}
                    label={locationSelected.district || "Chọn Quận / Huyện"}
                    onPress={() => _openDialogLocation('district')}
                />
                <Drawer.Item
                    style={{ backgroundColor: CommonColors.primary }}
                    label={locationSelected.subdistrict || "Chọn Phường / Xã"}
                    onPress={() => _openDialogLocation('subdistrict')}
                />
                <TextInput style={styles.input}
                    label="Địa chỉ"
                    value={userProfile.address}
                    multiline={true}
                    onChangeText={text => setUserProfile({ ...userProfile, address: text })}
                />


                <Button style={{
                    backgroundColor: 'coral',
                    alignSelf: 'center',
                    borderRadius: 12,
                    width: 220,
                    marginVertical: 18
                }}
                    labelStyle={{
                        color: 'white'
                    }}
                    onPress={_updateUserProfile}
                    loading={isUpdating}
                    disabled={isUpdating}
                >
                    CẬP NHẬT
            </Button>
            </KeyboardAvoidingView>
            <Portal>
                <Dialog visible={dialogVisible} onDismiss={() => setDialogVisible(false)} style={{ flex: 1, padding: 0 }}>
                    <Dialog.ScrollArea style={{ paddingHorizontal: 0 }}>
                        <ScrollView contentContainerStyle={{ paddingHorizontal: 0 }}>
                            {
                                isLoading ?
                                    <ActivityIndicator /> :
                                    dialogData.map((e, index) =>
                                        <SelectItem
                                            item={e}
                                            setDialogVisible={setDialogVisible}
                                            setLocationSelected={setLocationSelected}
                                            locationSelected={locationSelected}
                                            selectLocationType={selectLocationType}
                                        />
                                    )
                            }
                        </ScrollView>
                    </Dialog.ScrollArea>

                </Dialog>
            </Portal>

        </ScrollView>

    )
}

export default CollaboratorProfileScreen

const styles = StyleSheet.create({
    input: {
        margin: 4
    }
})
