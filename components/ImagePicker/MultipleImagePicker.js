import React, { useState } from 'react'
import { StyleSheet, Text, View, Image, Dimensions,TouchableOpacity } from 'react-native'
import ImagePicker from 'react-native-image-crop-picker';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import CommonColors from '../../constants/CommonColors';
import CommonIcons from '../../constants/CommonIcons';


const deviceWidth = Dimensions.get('screen').width;
const deviceHeight = Dimensions.get('screen').height;

const ImageItem = ({ imageItem, onRemove }) => {


    const _onRemoveItem = () => {
        onRemove(imageItem);
    }

    return (
        <View style={[styles.imageItemWrap]}
        >
            <MaterialCommunityIcon
                name={CommonIcons.close}
                size={14}
                color={'white'}
                style={{
                    position:"absolute",
                    zIndex:999,
                    right:-6,
                    top:-6,
                    borderRadius:15,
                    backgroundColor:'coral'

                }}

                onPress={_onRemoveItem}
            />
            <Image
                style={styles.imageItem}
                source={{
                    uri: imageItem.path
                }}
            />
        </View>
    )


}

const MultipleImagePicker = ({ imagesSelect = [], setImageSelect }) => {

    const [imageArray, setImageArray] = useState([]);

    const _onPickImage = async () => {
        ImagePicker.openPicker({
            multiple: true,
            mediaType: 'photo',
            compressImageQuality:0.5
            
        }).then(imageRes => {
            setImageSelect(imageRes);
        });
    }

    const _onRemove = (image) => {

        let newImageArr = imagesSelect.filter(e => e.path != image.path);
        setImageSelect(newImageArr);
    }

    return (
        <View style={styles.imagesWrap}>
            {
                imagesSelect.map((e,index) =>
                    <ImageItem key={index.toString()}
                        imageItem={e}
                        onRemove={_onRemove}
                    />
                )
            }
            <TouchableOpacity style={styles.buttomPicker}
                onPress={(_onPickImage)}
            >
                <MaterialCommunityIcon
                    name={CommonIcons.cameraplus}
                    size={32}
                    color={CommonColors.primary}
                />
                <Text>Thêm hình ảnh</Text>
            </TouchableOpacity>
        </View>




    )
}

export default MultipleImagePicker

const styles = StyleSheet.create({
    imagesWrap: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems:'center',
        margin: 6,
        padding: 8
    },
    imageItemWrap: {
        padding: 2,
        margin: 2

    },
    imageItem: {
        width: deviceWidth / 4,
        height: 100,
    },
    buttomPicker:{
        padding: 12, 
        backgroundColor: 'white' ,
        width:120,
        height:80,
        alignItems:'center',
        justifyContent:'center',
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
