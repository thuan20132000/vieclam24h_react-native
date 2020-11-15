import React, { useState,useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { Dialog, Portal, Text, TextInput, Menu, Button, Divider, Title, Drawer, ActivityIndicator } from 'react-native-paper';
import CommonColors from '../constants/CommonColors';


import { getProvince, getDistrict, getSubdistrict } from './../utils/locationApi';


const SelectItem = ({ setDialogVisible, item,setLocationSelected,locationSelected,selectLocationType }) => {
    const [visible, setVisible] = React.useState(false);

    const openMenu = () => setVisible(true);

    const closeMenu = () => setVisible(false);

    const _onSelectItem = async () => {
        if(selectLocationType == 'province'){
            setLocationSelected({...locationSelected,province:item.name_with_type,province_code:item.code});
            setDialogVisible(false)
        }
        if(selectLocationType == 'district'){
            setLocationSelected({...locationSelected,district:item.name_with_type,district_code:item.code});
            setDialogVisible(false)
        }
        if(selectLocationType == 'subdistrict'){
            setLocationSelected({...locationSelected,subdistrict:item.name_with_type,subdistrict_code:item.code});
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


    const [isLoading, setIsLoading] = useState(false);
    const [userProfile, setUserProfile] = useState({
        username: '',
        email: '',
        phoneNumber: '',
        idCard: '',
        province: '',
        district: '',
        subdistrict: '',
        address: ''
    });


    const [dialogVisible, setDialogVisible] = useState(false);
    const [dialogData, setDialogData] = useState([]);
    const [locationSelected,setLocationSelected] = useState({
        province:'',
        province_code:'',
        district:'',
        district_code:'',
        subdistrict:'',
        subdistrict_code:'',
    });
    const [selectLocationType,setSelectLocationType] = useState('province');
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
            if(locationSelected.province_code){
                let locationRes = await getDistrict(locationSelected.province_code);
                setDialogData(Object.values(locationRes.data));
                setDialogVisible(true);
            }
          
        }
        if(type == 'subdistrict'){
            setSelectLocationType(type);
            if(locationSelected.district_code){
                let locationRes = await getSubdistrict(locationSelected.district_code);
                setDialogData(Object.values(locationRes.data));
                setDialogVisible(true);
            }
        }
        setIsLoading(false);

    }

    useEffect(() => {
        setLocationSelected({...locationSelected,district:'',district_code:''})
    }, [locationSelected.province]);

    useEffect(() => {
        setLocationSelected({...locationSelected,subdistrict:'',subdistrict_code:''})
    }, [locationSelected.district])

    return (
        <ScrollView>
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
            <TextInput style={styles.input}
                label="Tên"
                value={userProfile.username}
                onChangeText={text => setUserProfile({ ...userProfile, username: text })}
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
                label={locationSelected.district || "Chọn Phường / Xã"}
                onPress={() => _openDialogLocation('subdistrict')}

            />
         
            <Portal>
                <Dialog visible={dialogVisible} onDismiss={() => setDialogVisible(false)} style={{ flex: 1, padding: 0 }}>
                    <Dialog.ScrollArea style={{ paddingHorizontal: 0 }}>
                        <ScrollView contentContainerStyle={{ paddingHorizontal: 0 }}>
                            {
                                isLoading ?
                                <ActivityIndicator/> :
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
        margin: 12
    }
})
