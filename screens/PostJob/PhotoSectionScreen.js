import React, { useState, useEffect } from 'react'
import { Alert, StyleSheet, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import MultipleImagePicker from '../../components/ImagePicker/MultipleImagePicker'
import BottomNavigation from './components/BottomNavigation';
import { useSelector, useDispatch } from 'react-redux';
import * as jobActions from '../../store/actions/jobActions';


const PhotoSectionScreen = (props) => {

    const dispatch = useDispatch();
    const [photo, setPhoto] = useState([]);

    const { data } = props.route.params;
    const { jobInformation } = useSelector(state => state.job);


    useEffect(() => {
        setPhoto(jobInformation?.photos);
        
    }, [])


    const _onPhotoValidation = () => {
        if (photo.length <= 0 || photo.length > 5 || !photo) {
            return false;
        }

        return true;
    }



    const _onNextSection = () => {

       
        let valid_res = _onPhotoValidation();
        if(!valid_res){
            Alert.alert("Thông báo", "Chọn hình ảnh chưa hợp lệ, vui lòng chọn lại hình ảnh.");
            return;
        }

        let data = {
            photos: photo,
        }
        dispatch(jobActions.updateJob(data));


        props.navigation.navigate('TitleSection', {
            data: {
                ...data,
                photo: photo
            }
        })
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
                <MultipleImagePicker
                    setImageSelect={setPhoto}
                    imagesSelect={photo}
                />

            </ScrollView>

            <BottomNavigation
                onNextPress={_onNextSection}
                nextTitle={'Tiếp tục'}

            />
        </View>
    )
}

export default PhotoSectionScreen

const styles = StyleSheet.create({})
