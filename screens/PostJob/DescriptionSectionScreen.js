import React, { useState,useEffect } from 'react'
import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native'
import CommonColors from '../../constants/CommonColors'
import BottomNavigation from './components/BottomNavigation'
import DateTimePicker from '@react-native-community/datetimepicker';
import { formatDateString, formatTimeString } from '../../utils/helper';
import ItemSelectionChecbox from '../../components/Item/ItemSelectionChecbox';

import { useSelector, useDispatch } from 'react-redux';
import * as jobActions from '../../store/actions/jobActions';

const DescriptionSectionScreen = (props) => {

    const dispatch = useDispatch();
    const {jobInformation} = useSelector(state => state.job);



    const [dateSelected, setDateSelected] = useState(new Date());
    const [timeSelected, setTimeSelected] = useState(new Date());
    const [descriptions,setDescriptions] = useState('');

    const [mode, setMode] = useState('date');
    const [datetimepickerShow, setDatetimepickerShow] = useState(false);

    const onChange = (event, selectedDate) => {
        try {
            setDatetimepickerShow(false);

            const currentDate = selectedDate || dateSelected;
            let selectedTime = new Date(event.nativeEvent.timestamp || currentDate);
            if (mode == 'date') {
                setDateSelected(selectedTime);
            } else if (mode == 'time') {
                setTimeSelected(selectedTime);
            
            }

        } catch (error) {
            console.warn(error);
        }

    };

    const showMode = (currentMode) => {
        setDatetimepickerShow(true);
        // if (currentMode == 'date') {
        //     setDateSelected(new Date());
        // } else {
        //     setTimeSelected(new Date());
        // }
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };

    const [withTime, setWithTime] = useState(false);

    useEffect(() => {
        setDescriptions(jobInformation.descriptions);
    }, [])

    const _onDescriptionValidation = () => {

        if(!descriptions || descriptions.length < 10 || descriptions.length > 250 || descriptions.trim() == ""){
            return false;
        }
        return true;

    }

    const _onNextSection = () => {

        let valid_res = _onDescriptionValidation();

        if(!valid_res){
            Alert.alert("Thông báo","Vui lòng nhập mô tả hợp lệ!");
            return;
        }


        let data = {
            descriptions:descriptions
        }
        dispatch(jobActions.updateJob(data));
        props.navigation.navigate('PriceSection')
    }

    return (
        <View
            style={{
                display: 'flex',
                flex: 1,
                backgroundColor: 'white',

            }}
        >
            <ScrollView>

                <View style={[styles.group]}>
                    <View>
                        <ItemSelectionChecbox
                            isChecked={withTime}
                            label={'Thời gian bắt đầu'}
                            onItemPress={() => setWithTime(!withTime)}
                            labelStyle={[styles.textLabel]}
                        />
                    </View>
                    {
                        withTime &&
                        <View style={[styles.group, styles.row]}>
                            <TouchableOpacity
                                onPress={showTimepicker}
                                style={[styles.buttonpicker]}


                            >
                                <Text style={[{ textAlign: 'center', fontWeight: '700', fontSize: 18 }]} >
                                    {timeSelected && formatTimeString(timeSelected) || `Chọn giờ`}
                                </Text>
                                <Text style={[{textAlign:'center'}]}>Giờ</Text>

                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={showDatepicker}
                                style={[styles.buttonpicker]}
                            >
                                <Text style={[{ textAlign: 'center', fontWeight: '700', fontSize: 18 }]} > {formatDateString(dateSelected) || `Chọn ngày`} </Text>
                                <Text style={[{textAlign:'center'}]}>Ngày</Text>

                            </TouchableOpacity>
                        </View>
                    }

                    {/* Show datetime picker */}
                    {
                        datetimepickerShow &&
                        <DateTimePicker

                            testID="dateTimePicker"
                            value={dateSelected}
                            mode={mode}
                            is24Hour={true}
                            display="default"
                            onChange={onChange}
                        />

                    }


                </View>
                <View style={[styles.group]}>

                    <Text style={[styles.textLabel]}>Mô tả công việc (<Text style={{ color: 'red' }}>*</Text>)</Text>
                    <TextInput
                        style={[styles.textinput, { justifyContent: 'flex-start', display: 'flex', flexDirection: 'column' }]}
                        placeholder={'Mô tả công việc...'}
                        multiline
                        numberOfLines={6}
                        textAlignVertical={'top'}
                        onChangeText={(text) => setDescriptions(text)}
                        value={descriptions}
                    />

                </View>

                <View style={[
                    styles.group,
                    {
                        borderWidth: 1,
                        borderColor: 'blue',
                        height: 100,
                        margin: 4,
                        padding: 6,
                        backgroundColor: CommonColors.secondary
                    }
                ]} >
                    <Text style={{ color: 'grey' }}>
                        Ví dụ: Xe tay ga để lâu ngày đề máy không chạy, cần người đến nhà sửa chửa trong ngày. Sẽ hỗ trợ thêm chi phí.
                    </Text>

                    <Text style={{ color: 'grey', fontWeight: '700' }}>Nên viết tiếng Việt có dấu.</Text>
                    <Text style={{ color: 'grey', fontWeight: '700' }}>Không ít hơn 10 kí tự và lớn hơn 250 ký tự</Text>

                </View>
            </ScrollView>
            <BottomNavigation
                onNextPress={_onNextSection}
                nextTitle={'Tiếp tục'}
            />
        </View>
    )
}

export default DescriptionSectionScreen

const styles = StyleSheet.create({
    group: {
        marginVertical: 6,
        marginHorizontal: 4
    },
    textLabel: {
        fontSize: 16,
        fontWeight: '700',
        marginVertical: 4
    },
    textinput: {
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        paddingLeft: 8
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    buttonpicker: {
        width: 140,
        backgroundColor: 'white',
        padding: 12,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,

    }
})
