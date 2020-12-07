import React from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import { Avatar } from 'react-native-paper';
import CommonImages from '../../constants/CommonImages';


const CardJobConfirm = ({ item }) => {

    console.warn(item);

    return (
        <View style={styles.container}>
            <Text style={[styles.text, {
                fontSize: 18,
                fontWeight: '500',

            }]}>
                {item?.attributes?.name}
            </Text>
            <Text style={[styles.text, {
                fontSize: 14,
                fontStyle: 'italic',
                color: 'coral'
            }]}>
                {item?.relationships?.confirm?.confirmed_price}
            </Text>

            <View style={{ display: 'flex', flexDirection: 'row', margin: 12, alignItems: 'center' }}>
                <Avatar.Image size={64} source={{
                    uri: item?.relationships?.candidate?.profile_image || CommonImages.avatar
                }}
                />
                <View style={{display:'flex',flexDirection:'column'}}>
                    <Text style={[styles.text, {
                        marginHorizontal: 22
                    }]}>
                        {item?.relationships.candidate.name}
                    </Text>
                    <Text style={[styles.text, {
                        marginHorizontal: 22
                    }]}>
                        {item?.relationships.candidate.phonenumber}
                    </Text>
                    <Text style={[styles.text, {
                        marginHorizontal: 22
                    }]}>
                        {item?.relationships.candidate.email}
                    </Text>
                </View>

            </View>


        </View>
    )
}

export default CardJobConfirm

const deviceWidth = Dimensions.get('screen').width;
const deviceHeight = Dimensions.get('screen').height;


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        margin: 12,
        borderRadius: 12,
        padding: 8

    },
    text:{
        marginVertical:6
    }
})
