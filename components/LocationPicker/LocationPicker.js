import React,{useState,useEffect} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { Dialog, Portal, TextInput, Menu, Button, Divider, Title, Drawer, ActivityIndicator } from 'react-native-paper';
import CommonColors from '../../constants/CommonColors';

import { getProvince, getDistrict, getSubdistrict } from '../../utils/locationApi';



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
const LocationPicker = () => {


    const [isLoading, setIsLoading] = useState(false);

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
        <View>
            <Text></Text>

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
        </View>
    )
}

export default LocationPicker

const styles = StyleSheet.create({})
