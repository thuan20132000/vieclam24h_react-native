import React, { useState, useEffect, useRef } from 'react'
import { Alert, Dimensions, KeyboardAvoidingView, StyleSheet, TextInput, View } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Dialog, Portal, Text, Menu, Button, Divider, Title, Drawer, ActivityIndicator, Avatar, IconButton } from 'react-native-paper';
import CommonColors from '../../constants/CommonColors';
import { useSelector } from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';

import { getProvince, getDistrict, getSubdistrict } from '../../utils/locationApi';
import { updateUser } from '../../utils/serverApi';
import CommonImages from '../../constants/CommonImages';
import storage from '@react-native-firebase/storage';
import { utils } from '@react-native-firebase/app';

import { generateCode } from '../../utils/helper';

import { useDispatch } from 'react-redux';
import * as userActions from '../../store/actions/authenticationActions';
import OccupationSelection from '../../components/Selection/OccupationSelection';
import ItemSelection from '../../components/Item/ItemSelection';
import SimpleBottomSheet from '../../components/BottomSheet/SimpleBottomSheet';
import { RenderDistrict, RenderProvince, RenderSubDistrict } from '../../components/Render/RenderLocation';
import CommonIcons from '../../constants/CommonIcons';

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





const CollaboratorProfileScreen = (props) => {

    const { userInformation } = useSelector(state => state.authentication);

    const _refBottomSheetLocation = useRef();

    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [profileImage, setProfileImage] = useState('');
    const [userProfile, setUserProfile] = useState({
        id: '',
        username: '',
        email: '',
        phoneNumber: '',
        idCard: '',
        province_code:'',
        province: '',
        district_code:'',
        district: '',
        subdistrict_code:'',
        subdistrict: '',
        address: '',
        profile_image: '',
    });
    const [userOccupations, setUserOccupations] = useState([]);

    useEffect(() => {
        if (userInformation) {
            setUserProfile({
                id: userInformation.id,
                username: userInformation.attributes?.name,
                email: userInformation.attributes?.email,
                phoneNumber: userInformation.attributes?.phonenumber,
                idCard: userInformation.attributes?.idcard,
                address: userInformation.attributes?.address,
                profile_image: userInformation?.attributes?.profile_image
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

    const [isUpdating, setIsUpdating] = useState(false);
    const _updateUserProfile = async () => {

        // console.warn(userProfile);
        // console.warn(locationSelected)
        let image_update = userProfile.profile_image;
        setIsUpdating(true);
        if (profileImage) {
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
            image_update,
            userOccupations
        )

        if (!userRes.status) {
            Alert.alert("Thất bại", "Cập nhật không thành công");

        } else {
            Alert.alert("Thành công", "Cập nhật tài khoản thành công");


            dispatch(userActions.update(userRes.data));
        }

        setIsUpdating(false);
    }


    const _onOpenImagePicker = async () => {
        try {
            ImagePicker.openPicker({
                multiple: false,
                mediaType: 'photo'
            }).then(imageRes => {
                if (imageRes.path) {
                    setUserProfile({ ...userProfile, profile_image: imageRes.path });
                    setProfileImage(imageRes.path);
                }

            }).catch((error) =>
                console.warn(error)
            )
        } catch (error) {
            console.warn('ERRPR: ', error);
        }


    }

    useEffect(() => {
        setLocationSelected({ ...locationSelected, district: '', district_code: '' })
    }, [locationSelected.province]);

    useEffect(() => {
        setLocationSelected({ ...locationSelected, subdistrict: '', subdistrict_code: '' })
    }, [locationSelected.district])


    useEffect(() => {

        let user_role = userInformation.role[0];

        props.navigation.setOptions({
            title: "Thông Tin Cá Nhân"
        })
    }, []);


    const [occupationSelected, setOccupationSelected] = useState([]);
    useEffect(() => {
        let occupation_ids = [];
        occupationSelected.map(e => occupation_ids.push(e.id));
        setUserOccupations(occupation_ids);
    }, [occupationSelected])



    const [refBottomSheetLocation, setRefBottomSheetLocation] = useState('');

    const [locationData, setLocationData] = useState([]);
    const _onOpenLocationBottomSheet = (type) => {
        setRefBottomSheetLocation(type);
        _refBottomSheetLocation.current.open();
    }



    
    const _onSelectLocation = (locationType,item) => {
        if(locationType == 'province'){
            setUserProfile({...userProfile,province:item.name,province_code:item.code});
            _refBottomSheetLocation.current.close();
        }

        if(locationType == 'district'){
            setUserProfile({...userProfile,district:item.name,district_code:item.code});
            _refBottomSheetLocation.current.close();
        }

        if(locationType == 'subdistrict'){
            setUserProfile({...userProfile,subdistrict:item.name,district_code:item.code});
            _refBottomSheetLocation.current.close();
        }
    }

    // When provine in userProfile change
    useEffect(() => {
        setUserProfile({
            ...userProfile,
            district_code:'',
            district:''
        })
    }, [userProfile.province]);

    //When district in userProfile change
    useEffect(() => {
        setUserProfile({
            ...userProfile,
            subdistrict:'',
            subdistrict_code:''
        })
    }, [userProfile.district])





    return (
        <>
            <ScrollView>

                <View style={{ display: 'flex', alignItems: 'center' }}>
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
                <View style={[
                    styles.inputGroup,

                ]}>
                    <Text
                        style={[
                            styles.inputLabel
                        ]}
                    >
                        Họ và Tên
                </Text>
                    <TextInput style={styles.input}
                        label="Tên"
                        value={userProfile.username}
                        onChangeText={text => setUserProfile({ ...userProfile, username: text })}
                    />
                </View>

                <View style={[
                    styles.inputGroup
                ]}>
                    <Text
                        style={[
                            styles.inputLabel
                        ]}
                    >
                        Email
                </Text>
                    <TextInput style={styles.input}
                        label="Email"
                        value={userProfile.email}
                        onChangeText={text => setUserProfile({ ...userProfile, email: text })}
                    />
                </View>

                <View style={[
                    styles.inputGroup
                ]}>
                    <Text
                        style={[
                            styles.inputLabel
                        ]}
                    >
                        Số điện thoại
                </Text>
                    <TextInput style={styles.input}
                        label="Số điện thoại"
                        value={userProfile.phoneNumber}
                        onChangeText={text => setUserProfile({ ...userProfile, phoneNumber: text })}
                    />

                </View>

                <View style={[
                    styles.inputGroup
                ]}>
                    <Text
                        style={[
                            styles.inputLabel
                        ]}
                    >
                        Chứng minh nhân dân / căn cước công dân
                </Text>
                    <TextInput style={styles.input}
                        label="Chứng minh nhân dân"
                        value={userProfile.idCard}
                        onChangeText={text => setUserProfile({ ...userProfile, idCard: text })}
                    />

                </View>

                <View
                    style={[
                        styles.inputGroup
                    ]}
                >
                    <Text
                        style={[
                            styles.inputLabel
                        ]}
                    >
                        Địa chỉ
                </Text>
                    <TextInput style={styles.input}
                        label="Chứng minh nhân dân"
                        value={userProfile.idCard}
                        onChangeText={text => setUserProfile({ ...userProfile, idCard: text })}
                    />

                </View>



                <OccupationSelection
                    itemSelected={occupationSelected}
                    setItemSelected={setOccupationSelected}
                    title={"Chọn lĩnh vực công việc"}
                />
                <View>
                    {
                        occupationSelected.map((e, index) =>
                            <View key={index.toString()}>
                                <Text>{e.attributes.name}</Text>
                            </View>
                        )
                    }
                </View>


                <View
                    style={[
                        styles.inputGroup
                    ]}
                >
                    <Text
                        style={[styles.inputLabel]}
                    >
                        Địa chỉ
                </Text>
                    <ItemSelection
                        containerStyle={styles.input}
                        label={ userProfile.province || `Chọn tỉnh / thành phố`}
                        labelStyle={styles.inputLabel}
                        onItemPress={() => _onOpenLocationBottomSheet('province')}
                    />
                    <ItemSelection
                        containerStyle={styles.input}
                        label={ userProfile.district ||  `Chọn quận / huyện`}
                        labelStyle={styles.inputLabel}
                        onItemPress={() => _onOpenLocationBottomSheet('district')}

                    />
                    <ItemSelection
                        containerStyle={styles.input}
                        label={ userProfile.subdistrict || `Chọn phường / xã`}
                        labelStyle={styles.inputLabel}
                        onItemPress={() => _onOpenLocationBottomSheet('subdistrict')}

                    />
                </View>


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
                <Portal>
                    <Dialog visible={dialogVisible} onDismiss={() => setDialogVisible(false)} style={{ flex: 1, padding: 0 }}>
                        <Dialog.ScrollArea style={{ paddingHorizontal: 0 }}>
                            <ScrollView contentContainerStyle={{ paddingHorizontal: 0 }}>
                                {
                                    isLoading ?
                                        <ActivityIndicator /> :
                                        dialogData.map((e, index) =>
                                            <SelectItem
                                                key={index.toString()}
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

            <SimpleBottomSheet
                refRBSheet={_refBottomSheetLocation}
                height={deviceHeight}
                closeOnDragDown={false}
                dragFromTopOnly={true}
            >
                <View
                    style={[
                        {
                            display:'flex',
                            flexDirection:'row',
                            marginVertical:8
                        }
                    ]}
                >
                    <IconButton
                        icon={CommonIcons.close}
                        size={34}
                        color={'black'}
                        onPress={()=>_refBottomSheetLocation.current.close()}
                    />
                </View>
                {
                    refBottomSheetLocation == 'province' &&
                        <RenderProvince 
                            setSelectedItem={(item)=>_onSelectLocation('province',item)}
                        />
                }

                {
                    refBottomSheetLocation == 'district' &&
                        <RenderDistrict
                            province_code={userProfile.province_code}
                            setSelectedItem = {(item) =>_onSelectLocation('district',item)}
                        />    
                }

                {
                    refBottomSheetLocation == 'subdistrict' &&
                        <RenderSubDistrict
                            district_code={userProfile.district_code}
                            setSelectedItem = {(item) => _onSelectLocation('subdistrict',item)}
                        />
                }



                
            </SimpleBottomSheet>
        </>

    )
}

export default CollaboratorProfileScreen
const deviceWidth = Dimensions.get('screen').width;
const deviceHeight = Dimensions.get('screen').height;

const styles = StyleSheet.create({
    input: {
        paddingHorizontal: 16,
        marginVertical: 4,
        paddingVertical: 4,
        height: 40,
        borderRadius: 8,
        fontWeight: '500',
        shadowColor: "#000",
        backgroundColor: 'white',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    inputGroup: {
        marginHorizontal: 12
    },
    inputLabel: {
        color: 'grey',
        fontSize: 14,
        fontWeight: '500'
    }
})
