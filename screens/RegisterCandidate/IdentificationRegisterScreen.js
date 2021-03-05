import React, { useState } from 'react'
import { Alert, Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import ButtonIcon from '../../components/Button/ButtonIcon';
import CommonImages from '../../constants/CommonImages';
import BottomNavigation from './components/BottomNavigation';
import ImagePicker from 'react-native-image-crop-picker';

const IdentificationRegisterScreen = (props) => {


    React.useLayoutEffect(() => {
        props.navigation.setOptions({
            title: 'Định danh thông tin',

        });
    }, []);


    const [identificationInformation, setIdentificationInformation] = useState({
        image_font: '',
        image_back: '',
        image_portrait: ''
    });


    const _onPickImage = async (type) => {

        let imagePick = await ImagePicker.openPicker({
            multiple:false,
            mediaType:'photo',
            compressImageQuality:0.6
        });        
        switch (type) {
            case 'font':
                setIdentificationInformation({
                    ...identificationInformation,
                    image_font:imagePick.path
                });    

                return;
            case 'back':
                setIdentificationInformation({
                    ...identificationInformation,
                    image_back:imagePick.path
                });
                return;
            case 'portrait':
                setIdentificationInformation({
                    ...identificationInformation,
                    image_portrait:imagePick.path
                });
                return;
        }

    }


    const _onValidateIdentification = () => {

        if(
            !identificationInformation.image_font || 
            !identificationInformation.image_back || 
            !identificationInformation.image_portrait
        )
        {
            return false;
        }
        return true;

    }

    const _onNextSection = () => {

        let isValid = _onValidateIdentification();
        
        if(!isValid){
            Alert.alert("Thông báo","Thông tin chưa hợp lệ!");
            return;
        }

        props.navigation.navigate('PhonenNumberRegister')
    }


    return (
        <View style={[styles.container]}>
            <ScrollView>

                <View style={[styles.group]}>

                    <Text style={[{ fontSize: 18, fontWeight: '700' }]}>Ảnh CMND/CCCD</Text>
                    <Text style={[{ fontSize: 14, fontWeight: '500', fontStyle: 'italic', color: 'grey' }]}>
                        Dùng máy ảnh sau để chụp đủ cả viền của CMND.CCCD để đảm bảo thông tin của bạn là chính xác.
                </Text>

                </View>
                <View>
                    <View style={[styles.row, { alignItems: 'center', justifyContent: 'center', marginHorizontal: 22 }]}>
                        <Image
                            source={{
                                uri: identificationInformation.image_font || CommonImages.notFound
                            }}
                            style={{
                                width: deviceWidth / 2,
                                height: 120,
                                margin: 14,
                                borderWidth: 1,
                                borderColor: 'blue'
                            }}
                            resizeMode={'cover'}

                        />
                        <ButtonIcon
                            title="Chụp mặt trước"
                            containerStyle={{
                                width: 100
                            }}
                            onPress={()=>_onPickImage('font')}
                        />
                    </View>

                    <View style={[styles.row, { alignItems: 'center', justifyContent: 'center', marginHorizontal: 22 }]}>
                        <Image
                            source={{
                                uri: identificationInformation.image_back || CommonImages.notFound
                            }}
                            style={{
                                width: deviceWidth / 2,
                                height: 120,
                                margin: 14,
                                borderWidth: 1,
                                borderColor: 'blue'
                            }}
                            resizeMode={'cover'}

                        />
                        <ButtonIcon
                            title="Chụp mặt sau"
                            containerStyle={{
                                width: 100
                            }}
                            onPress={()=>_onPickImage('back')}

                        />
                    </View>

                    <View style={[styles.row, { alignItems: 'center', justifyContent: 'center', marginHorizontal: 22 }]}>
                        <Image
                            source={{
                                uri: identificationInformation.image_portrait || CommonImages.notFound
                            }}
                            style={{
                                width: deviceWidth / 2,
                                height: 220,
                                margin: 14,
                                borderWidth: 1,
                                borderColor: 'blue'
                            }}
                            resizeMode={'contain'}
                        />
                        <ButtonIcon
                            title="Ảnh chân dung"
                            containerStyle={{
                                width: 100
                            }}
                            onPress={()=>_onPickImage('portrait')}
                            
                        />
                    </View>
                </View>
            </ScrollView>


            <BottomNavigation
                nextTitle={'Tiếp tục'}
                onNextPress={_onNextSection}
            />

        </View>
    )
}

export default IdentificationRegisterScreen

const deviceWidth = Dimensions.get('screen').width;
const deviceHeight = Dimensions.get('screen').height;

const styles = StyleSheet.create({
    row: {
        display: 'flex',
        flexDirection: 'row'
    },
    group: {
        display: 'flex',
        margin: 12
    },
    container: {
        display: 'flex',
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'space-between'
    }
})
