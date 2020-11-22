import React, { useState } from 'react'
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-crop-picker';



const deviceWidth = Dimensions.get('screen').width;
const deviceHeight = Dimensions.get('screen').height;

const ImageItem = ({ imageItem, onRemove }) => {


    const _onRemoveItem = () => {
        onRemove(imageItem);
    }

    return (
        <TouchableOpacity style={[styles.imageItemWrap]}
            onLongPress={_onRemoveItem}
        >
            <Image
                style={styles.imageItem}
                source={{
                    uri: imageItem.sourceURL
                }}
            />
        </TouchableOpacity>
    )


}

const MultipleImagePicker = ({ imagesSelect = [], setImageSelect }) => {

    const [imageArray, setImageArray] = useState([]);

    const _onPickImage = async () => {
        ImagePicker.openPicker({
            multiple: true,
            mediaType: 'photo'
        }).then(imageRes => {
            setImageSelect(imageRes);
        });
    }

    const _onRemove = (image) => {

        let newImageArr = imagesSelect.filter(e => e.creationDate != image.creationDate);
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
        height:50,
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
