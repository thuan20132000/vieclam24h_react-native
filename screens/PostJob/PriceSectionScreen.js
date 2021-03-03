import React, { useRef, useState } from 'react'
import { StyleSheet, Text, View, ScrollView, TextInput } from 'react-native'
import CommonColors from '../../constants/CommonColors';
import { formatCash } from '../../utils/helper';
import BottomNavigation from './components/BottomNavigation'

const PriceSectionScreen = (props) => {

    const { data } = props.route?.params;


    const typingTimeoutRef = useRef(null);

    const [price, setPrice] = useState(0);
    const _onEnterPrice = async (price) => {
        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        }
        typingTimeoutRef.current = setTimeout(() => {
            setPrice(price);
        }, 100);
    }


    const _onNextSection = () => {
        console.warn(price);

        props.navigation.navigate('ReviewSection',{
            data:{
                ...data,
                price:price
            }
        })
    }



    return (
        <View
            style={[styles.container]}
        >
            <ScrollView>
                <View style={[styles.group]}>

                    <Text style={[styles.textLabel]}>Ngân sách đưa ra (<Text style={{ color: 'red' }}>*</Text>)</Text>
                    <TextInput
                        style={[styles.textinput, { justifyContent: 'flex-start', display: 'flex', flexDirection: 'column' }]}
                        placeholder={'0'}
                        textAlignVertical={'center'}
                        keyboardType={'number-pad'}
                        enablesReturnKeyAutomatically={true}

                        onChangeText={(text) => _onEnterPrice(text)}
                    />
                    <Text style={{
                        color: 'red',
                        fontSize: 18,
                        margin: 8
                    }}>
                        {formatCash(price)} vnđ
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
                onBackPress={() => props.navigation.goBack()}
                onNextPress={_onNextSection}
                backTitle={'Trở lại'}
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
