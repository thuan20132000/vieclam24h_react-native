import React, { useState, useEffect, useRef } from 'react'
import { Alert, Dimensions, KeyboardAvoidingView, Platform, StyleSheet, TextInput, View } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Dialog, Portal, Text, Menu, Button, Divider, Title, Drawer, ActivityIndicator, Avatar, IconButton } from 'react-native-paper';
import CommonColors from '../../constants/CommonColors';
import { useSelector } from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';

import { updateUser } from '../../utils/serverApi';
import CommonImages from '../../constants/CommonImages';
import storage from '@react-native-firebase/storage';

import { generateCode } from '../../utils/helper';

import { useDispatch } from 'react-redux';
import * as userActions from '../../store/actions/authenticationActions';
import OccupationSelection from '../../components/Selection/OccupationSelection';
import ItemSelection from '../../components/Item/ItemSelection';
import SimpleBottomSheet from '../../components/BottomSheet/SimpleBottomSheet';
import { RenderDistrict, RenderOccupationSelection, RenderProvince, RenderSubDistrict } from '../../components/Render/RenderSelection';
import CommonIcons from '../../constants/CommonIcons';
import ItemChip from '../../components/Item/ItemChip';






const CollaboratorProfileScreen = (props) => {

    const { userInformation } = useSelector(state => state.authentication);

    const _refBottomSheetLocation = useRef();

    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [profileImage, setProfileImage] = useState('');
    const [userProfile, setUserProfile] = useState({
        id: userInformation.id,
        username: userInformation.attributes?.name,
        email: userInformation?.attributes?.email,
        phoneNumber: userInformation?.attributes?.phonenumber,
        idCard: userInformation?.attributes?.idcard,
        province_code: userInformation?.attributes?.province_code,
        province: userInformation?.attributes?.province,
        district_code: userInformation?.attributes?.district_code,
        district: userInformation?.attributes?.district,
        subdistrict_code: userInformation?.attributes?.subdistrict_code,
        subdistrict: userInformation?.attributes?.subdistrict,
        address: userInformation?.attributes?.address,
        profile_image: userInformation?.attributes?.profile_image,
    });



    const [userOccupations, setUserOccupations] = useState([]);
    const [newUserOccupations, setNewUserOccupations] = useState([]);

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
                console.log(error)
            )
        } catch (error) {
            console.log('ERRPR: ', error);
        }


    }


    useEffect(() => {
        if (userInformation.relationships?.occupations) {
            setUserOccupations(userInformation.relationships.occupations)

        }

        props.navigation.setOptions({
            title: "Thông Tin Cá Nhân"
        });

    }, []);


    const [occupationSelected, setOccupationSelected] = useState([]);

    const [refBottomSheetType, setRefBottomSheetType] = useState('');

    const _onOpenLocationBottomSheet = (type) => {
        setRefBottomSheetType(type);
        _refBottomSheetLocation.current.open();
    }




    const _onSelectLocation = (locationType, item) => {
        if (locationType == 'province') {
            setUserProfile({ ...userProfile, province: item.name, province_code: item.code });
            _refBottomSheetLocation.current.close();
        }

        if (locationType == 'district') {
            setUserProfile({ ...userProfile, district: item.name, district_code: item.code });
            _refBottomSheetLocation.current.close();
        }

        if (locationType == 'subdistrict') {
            console.warn(item);
            setUserProfile({ ...userProfile, subdistrict: item.name, subdistrict_code: item.code });
            _refBottomSheetLocation.current.close();
        }
    }


    const [tempSelectedOccupations, setTempSelectedOccupations] = useState([]);

    const _onConfirmSelectOccupation = () => {
        setUserOccupations(tempSelectedOccupations);
        setTempSelectedOccupations([]);
        _refBottomSheetLocation.current.close();
    }

    // When provine in userProfile change
    useEffect(() => {
        setUserProfile({
            ...userProfile,
            district_code: '',
            district: ''
        })
    }, [userProfile.province]);

    //When district in userProfile change
    useEffect(() => {

        setUserProfile({
            ...userProfile,
            subdistrict: '',
            subdistrict_code: ''
        })
    }, [userProfile.district_code])









    return (
        <>
            <KeyboardAvoidingView
                style={{
                    flex: 1
                }}
                enabled={true}
                behavior={'padding'}
                keyboardVerticalOffset={64}
            >
                <ScrollView
                    keyboardShouldPersistTaps={'handled'}
                >



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
                            label={userProfile.province || `Chọn tỉnh / thành phố`}
                            labelStyle={styles.inputLabel}
                            onItemPress={() => _onOpenLocationBottomSheet('province')}
                        />
                        <ItemSelection
                            containerStyle={styles.input}
                            label={userProfile.district || `Chọn quận / huyện`}
                            labelStyle={styles.inputLabel}
                            onItemPress={() => _onOpenLocationBottomSheet('district')}

                        />
                        <ItemSelection
                            containerStyle={styles.input}
                            label={userProfile.subdistrict || `Chọn phường / xã`}
                            labelStyle={styles.inputLabel}
                            onItemPress={() => _onOpenLocationBottomSheet('subdistrict')}

                        />
                    </View>

                    <View
                        style={[
                            styles.inputGroup
                        ]}
                    >
                        <TextInput style={styles.input}
                            label="Địa chỉ"
                            value={userProfile.address}
                            placeholder={`Nhập tên đường`}
                            multiline={true}
                            onChangeText={text => setUserProfile({ ...userProfile, address: text })}
                        />
                    </View>


                    {/* if user is collaborator then show select occupations */}
                    {
                        userInformation.role[0].id == 2 &&
                        <View
                            style={[
                                styles.inputGroup
                            ]}
                        >
                            <Text style={[
                                styles.inputLabel
                            ]}>
                                Lĩnh vực hoạt động
                        </Text>
                            <TouchableOpacity
                                style={[styles.input, {
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignContent: 'center',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    height:30,
                                    // alignSelf:'center',

                                }]}

                                onPress={() => _onOpenLocationBottomSheet('occupations')}
                            >
                                <Text
                                    style={[
                                        {
                                            fontSize: 14,
                                            fontWeight: '400'
                                        }
                                    ]}
                                >
                                    Thêm
                            </Text>
                            </TouchableOpacity>
                            <View>
                                {

                                    userOccupations.map((e, index) =>
                                        <ItemChip
                                            key={index.toString()}
                                            label={e.name || e.attributes?.name}
                                            close={false}
                                        />
                                    )
                                }


                            </View>

                        </View>
                    }





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
                </ScrollView>
            </KeyboardAvoidingView>
            <SimpleBottomSheet
                refRBSheet={_refBottomSheetLocation}
                height={deviceHeight}
                closeOnDragDown={false}
                dragFromTopOnly={true}


            >
                <View
                    style={[
                        {
                            display: 'flex',
                            flexDirection: 'row',
                            marginVertical: 8,
                            position: 'relative',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }
                    ]}
                >
                    <IconButton
                        icon={CommonIcons.close}
                        size={34}
                        color={'black'}
                        onPress={() => _refBottomSheetLocation.current.close()}

                    />
                    <TouchableOpacity
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginHorizontal: 18
                        }}
                        onPress={_onConfirmSelectOccupation}
                    >
                        <Text style={{
                            fontSize: 18,
                            fontWeight: '600',
                            color: 'blue'
                        }}>
                            Xong
                        </Text>
                    </TouchableOpacity>


                </View>
                {
                    refBottomSheetType == 'province' &&
                    <RenderProvince
                        setSelectedItem={(item) => _onSelectLocation('province', item)}
                    />
                }

                {
                    refBottomSheetType == 'district' &&
                    <RenderDistrict
                        province_code={userProfile.province_code}
                        setSelectedItem={(item) => _onSelectLocation('district', item)}
                    />
                }

                {
                    refBottomSheetType == 'subdistrict' &&
                    <RenderSubDistrict
                        district_code={userProfile.district_code}
                        setSelectedItem={(item) => _onSelectLocation('subdistrict', item)}
                    />
                }

                {
                    refBottomSheetType == 'occupations' &&
                    <RenderOccupationSelection
                        setSelectedItems={(e) => setTempSelectedOccupations([...tempSelectedOccupations, e])}
                    />

                }




            </SimpleBottomSheet>
        </ >

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
        fontSize: 12,
        fontWeight: '500',
        marginTop: 8

    }
})
