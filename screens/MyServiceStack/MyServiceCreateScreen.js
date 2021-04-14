import React, { useRef, useState, useEffect } from 'react'
import { Dimensions, Modal, StyleSheet, Text, View } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import SimpleBottomSheet from '../../components/BottomSheet/SimpleBottomSheet';
import ButtonSubmit from '../../components/Button/ButtonSubmit';
import RowSelection from '../../components/Row/RowSelection';
import CommonColors from '../../constants/CommonColors';
import { formatCash } from '../../utils/helper';
import { getFields } from '../../utils/serverApi';

const MyServiceCreateScreen = (props) => {
    const _refBottomSheetFields = useRef();
    const [fieldList, setFieldList] = useState([]);
    const [serviceInfo, setServiceInfo] = useState({
        field: '',
        name: '',
        price: ''
    });
    const [isConfiming, setIsConfirming] = useState(false);

    useEffect(() => {
        getFields()
            .then((res) => {
                if (res.status) {
                    setFieldList(res.data);
                }
            })
            .catch((err) => console.log('error: ', err))

    }, []);


    const _onSelectField = (field) => {
        setServiceInfo({ ...serviceInfo, field: field });
        _refBottomSheetFields.current.close();
    }

    const [temptPrice, setTemptPrice] = useState();
    const _onEnterPrice = (price) => {
        let price_convert_number = price.replace(/,/g, '');
        let price_format = formatCash(price_convert_number);
        setTemptPrice(price_format);
        setServiceInfo({ ...serviceInfo, price: price_convert_number });
    }




    const _onAddService = () => {
        setIsConfirming(true);
        setTimeout(() => {
            setIsConfirming(false);
            props.route.params.myService(serviceInfo);
            props.navigation.goBack();
        }, 2200);
    }

    return (
        <>
        
            <View
                style={{
                    display: 'flex',
                    flex: 1
                }}
            >
                <View
                    style={[styles.inputGroup]}
                >

                    <RowSelection
                        label={serviceInfo?.field?.name || 'Lĩnh vực'}
                        containerStyle={[
                            styles.input
                        ]}
                        labelStyle={{
                            color: 'black'
                        }}
                        itemPress={() => _refBottomSheetFields.current.open()}

                    />
                </View>
                <View
                    style={[styles.inputGroup]}
                >
                    <Text style={[styles.inputLabel]} >Tên dịch vụ</Text>
                    <TextInput
                        style={[
                            styles.input
                        ]}
                        value={serviceInfo.name}
                        onChangeText={(text) => setServiceInfo({ ...serviceInfo, name: text })}
                    />
                </View>

                <View
                    style={[styles.inputGroup]}
                >
                    <Text style={[styles.inputLabel]} >Giá dịch vụ</Text>
                    <TextInput
                        style={[
                            styles.input,
                            {
                                color: 'red'
                            }
                        ]}
                        keyboardType={'number-pad'}
                        onChangeText={(text) => _onEnterPrice(text)}
                        value={temptPrice}

                    />
                </View>

                <View
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <ButtonSubmit
                        label={'Thêm'}
                        onItemPress={_onAddService}
                        isLoading={isConfiming}
                    />
                </View>


                <SimpleBottomSheet
                    refRBSheet={_refBottomSheetFields}
                    height={deviceHeight}
                    closeOnPressMask={true}

                >
                    {
                        fieldList.length > 0 &&
                        fieldList.map((e, index) =>
                            <RowSelection
                                key={index.toString()}
                                label={e.name}
                                labelStyle={{ color: 'black' }}
                                itemPress={() => _onSelectField(e)}
                            />
                        )
                    }
                </SimpleBottomSheet>
            </View>
        </>
    )
}

export default MyServiceCreateScreen
const deviceWidth = Dimensions.get('screen').width;
const deviceHeight = Dimensions.get('screen').height;

const styles = StyleSheet.create({
    input: {
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: 6,
        margin: 4,
        borderRadius: 4,
        paddingLeft: 12,
        fontWeight: '700'

    },
    inputLabel: {
        marginHorizontal: 6,
        fontSize: 14,
        color: 'black',
        fontWeight: '700'
    },
    inputGroup: {
        marginVertical: 4
    }
})
