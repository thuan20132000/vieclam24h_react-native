import React, { useRef, useState,useEffect, useMemo } from 'react'
import { StyleSheet, Text, View, TextInput, Alert } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import SimpleBottomSheet from '../../components/BottomSheet/SimpleBottomSheet'
import { RenderDistrict, RenderProvince, RenderSubDistrict } from '../../components/Render/RenderSelection'
import CommonColors from '../../constants/CommonColors'
import BottomNavigation from './components/BottomNavigation'
import RowSelection from './components/RowSelection'
import {useSelector,useDispatch} from 'react-redux';
import * as jobActions from '../../store/actions/jobActions';

const LocationSectionScreen = (props) => {

    const dispatch = useDispatch();

    const {jobInformation} = useSelector(state => state.job);



    const _refBottomSheet = useRef();
    const [location, setLocation] = useState({
        province: '',
        province_code: '',
        district: '',
        district_code: '',
        subdistrict: '',
        subdistrict_code: '',
        address:'',
    });


    const [validationErrors,setValidationErrors] = useState([]);

    useEffect(() => {
        setLocation(jobInformation.location);
    }, [])


    const [selectedType, setSelectedType] = useState('');
    const _onOpenBottomSheet = (type) => {
        setSelectedType(type);
        _refBottomSheet.current.open();
    }


    const _onSelectProvince = (e) => {
        setLocation({
            ...location,
            province: e.name_with_type,
            province_code: e.code,
            district:'',
            district_code:'',
            subdistrict:'',
            subdistrict_code:''
        });
        _refBottomSheet.current.close();
    }

    const _onSelectDistrict = (e) => {
        setLocation({
            ...location,
            district: e.name_with_type,
            district_code: e.code,
            subdistrict:'',
            subdistrict_code:''
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


    const _onChangeAddress = (e) => {
        setLocation({
            ...location,
            address:e
        })
    }  


    const [isValidated,setIsvalidated] = useState(false);
    const _onLocationValidation = async () => {
        
        if(!location.province || !location.district || !location.subdistrict){
            setIsvalidated(false);
            return false;
        }
        return true;


    }

    const _onNextSection = async () => {
        
        
        let valid_res = await _onLocationValidation();
        
        if(!valid_res){
            Alert.alert("Thông báo","Chọn khu vực còn thiếu, Vui lòng chọn lại.");
            return;
        }


        let data = {
            location:location
        }
        dispatch(jobActions.updateJob(data));

        props.navigation.navigate('PhotoSection',{
            data:{
                ...data,
                location:location
            }
        })
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
                            onChangeText={(text) => _onChangeAddress(text) }
                            value={location.address}
                        />
                    </View>

                </ScrollView>
                <BottomNavigation
                    onNextPress={_onNextSection}
                    nextTitle={'Tiếp tục'}
                />
            </View>
            <SimpleBottomSheet
                refRBSheet={_refBottomSheet}
                height={800}
                containerStyle={{
                    borderTopRightRadius:26,
                    borderTopLeftRadius:26,
                }}

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
