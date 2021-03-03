import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import MultipleImagePicker from '../../components/ImagePicker/MultipleImagePicker'
import BottomNavigation from './components/BottomNavigation';

const PhotoSectionScreen = (props) => {

    const [photo, setPhoto] = useState([]);




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
                onBackPress={() => props.navigation.navigate('TitleSection')}
                onNextPress={() => props.navigation.navigate('TitleSection')}

            />
        </View>
    )
}

export default PhotoSectionScreen

const styles = StyleSheet.create({})
