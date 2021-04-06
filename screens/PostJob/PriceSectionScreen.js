import React, { useRef, useState, useEffect } from 'react'
import { StyleSheet, Text, View, ScrollView, TextInput, Alert,Keyboard } from 'react-native'
import CommonColors from '../../constants/CommonColors';
import { formatCash } from '../../utils/helper';
import BottomNavigation from './components/BottomNavigation'
import { useSelector, useDispatch } from 'react-redux';
import * as jobActions from '../../store/actions/jobActions';

const PriceSectionScreen = (props) => {

    const dispatch = useDispatch();
    const _refPriceInput = useRef();
    const { jobInformation } = useSelector(state => state.job);


    const typingTimeoutRef = useRef(null);

    const [price, setPrice] = useState(0);

    useEffect(() => {
        setPrice(jobInformation.budget);

        _refPriceInput.current.focus();

      

    }, []);

    const _onEnterPrice = async (price) => {
        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        }
        typingTimeoutRef.current = setTimeout(() => {
            setPrice(price);
        }, 100);
    }


    const _onPriceValidation = () => {

        if (!price || isNaN(price)) {
            return false;
        }
        return true;

    }

    const _onNextSection = () => {
        Keyboard.dismiss();
        let valid_res = _onPriceValidation();
        if (!valid_res) {

            Alert.alert("Thông báo", "Vui lòng nhập giá hợp lệ.");
            return;
        }

        let data = {
            budget: price

        }

        dispatch(jobActions.updateJob(data));

        props.navigation.navigate('ReviewSection')
    }


    const [temptPrice, setTemptPrice] = useState('');
    const _onPriceChange = (text) => {

        let convert_to_number = text.replace(/,/g, '');
        let formated_price = formatCash(convert_to_number);
        setTemptPrice(formated_price);
        setPrice(convert_to_number);

    }

    return (
        <View
            style={[styles.container]}
        >
            <ScrollView>
                <View style={[styles.group]}>

                    <Text style={[styles.textLabel]}>Ngân sách đưa ra (<Text style={{ color: 'red' }}>*</Text>)</Text>
                    <TextInput
                        ref={_refPriceInput}
                        style={[styles.textinput, { justifyContent: 'flex-start', display: 'flex', flexDirection: 'column' }]}
                        placeholder={'Nhập giá'}
                        textAlignVertical={'center'}
                        keyboardType={'numeric'}
                        value={temptPrice}
                        onChangeText={(text) => _onPriceChange(text)}

                    />
                    <Text style={{
                        color: 'red',
                        fontSize: 18,
                        margin: 8
                    }}>
                        {formatCash(price || jobInformation.budget)} vnđ
                    </Text>
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
                    <Text style={{ color: 'grey' }}>Ví dụ: 300,000 thay vì 300 (3 triệu rưỡi)</Text>

                    <Text style={{ color: 'grey', fontWeight: '700' }}>Điền giá đầy đủ các con số 0.</Text>
                </View>
            </ScrollView>
            <BottomNavigation
                onNextPress={_onNextSection}
                nextTitle={'Tiếp tục'}
            />
        </View>
    )
}

export default PriceSectionScreen

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        backgroundColor: 'white',


    },
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
