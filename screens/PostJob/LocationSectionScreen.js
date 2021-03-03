import React, { useRef, useState } from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import SimpleBottomSheet from '../../components/BottomSheet/SimpleBottomSheet'
import { RenderDistrict, RenderProvince, RenderSubDistrict } from '../../components/Render/RenderSelection'
import CommonColors from '../../constants/CommonColors'
import BottomNavigation from './components/BottomNavigation'
import RowSelection from './components/RowSelection'

const LocationSectionScreen = (props) => {

    const _refBottomSheet = useRef();
    const [location, setLocation] = useState({
        province: '',
        province_code: '',
        district: '',
        district_code: '',
        subdistrict: '',
        subdistrict_code: ''
    });


    const [selectedType, setSelectedType] = useState('');
    const _onOpenBottomSheet = (type) => {
        setSelectedType(type);
        _refBottomSheet.current.open();
    }


    const _onSelectProvince = (e) => {
        setLocation({
            ...location,
            province: e.name_with_type,
            province_code: e.code
        });
        _refBottomSheet.current.close();
    }

    const _onSelectDistrict = (e) => {
        setLocation({
            ...location,
            district: e.name_with_type,
            district_code: e.code
        });
        _refBottomSheet.current.close();
    }

    const _onSelectSubdistrict = (e) => {
        setLocation({
            ...location,
            subdistrict: e.name_with_type,
            subdistrict_code: e.code
        });
        _refBottomSheet.current.close();
    }

    return (
        <>
            <View
                style={{
                    display: 'flex',
                    flex: 1,
                    backgroundColor: 'white',
                    justifyContent: 'space-between'

                }}
            >
                <ScrollView>

                    <View style={[styles.group]}>
                        <Text>Chọn tỉnh thành (<Text style={{ color: 'red' }}>*</Text>)</Text>
                        <RowSelection
                            label={location.province || 'Chọn Tỉnh Thành'}
                            itemPress={() => _onOpenBottomSheet('PROVINCE')}
                        />
                    </View>

                    <View style={[styles.group]}>
                        <Text>Chọn quận huyện (<Text style={{ color: 'red' }}>*</Text>)</Text>
                        <RowSelection
                            label={location.district || 'Chọn quận huyện'}
                            itemPress={() => _onOpenBottomSheet('DISTRICT')}

                        />
                    </View>


                    <View style={[styles.group]}>
                        <Text>Chọn phường xã (<Text style={{ color: 'red' }}>*</Text>)</Text>
                        <RowSelection
                            label={location.subdistrict || 'Chọn phường xã'}
                            itemPress={() => _onOpenBottomSheet('SUBDISTRICT')}

                        />
                    </View>

                    <View style={[styles.group]}>
                        <Text>Số nhà và tên đường</Text>
                        <TextInput
                            style={[styles.textinput]}
                            placeholder={'Số nhà và tên đường'}
                        />
                    </View>

                </ScrollView>
                <BottomNavigation
                    onBackPress={() => props.navigation.navigate('CategorySection')}
                    onNextPress={() => props.navigation.navigate('PhotoSection')}

                />
            </View>
            <SimpleBottomSheet
                refRBSheet={_refBottomSheet}
                height={400}
            >
                {
                    selectedType == 'PROVINCE'
                    &&
                    <RenderProvince
                        setSelectedItem={(e) => _onSelectProvince(e)}
                    />
                }

                {
                    selectedType == 'DISTRICT'
                    &&
                    <RenderDistrict
                        province_code={location.province_code}
                        setSelectedItem={(e) => _onSelectDistrict(e)}
                    />
                }

                {
                    selectedType == 'SUBDISTRICT'
                    &&
                    <RenderSubDistrict
                        district_code={location.district_code}
                        setSelectedItem={(e) => _onSelectSubdistrict(e)}
                    />
                }
            </SimpleBottomSheet>
        </>
    )
}

export default LocationSectionScreen

const styles = StyleSheet.create({
    group: {
        marginVertical: 6
    },
    textinput: {
        backgroundColor: CommonColors.primary,
        paddingLeft:12
    }
})
