import React from 'react'
import { StyleSheet, Text, View, } from 'react-native'
import { Avatar } from 'react-native-paper'
import CommonColors from '../../constants/CommonColors'
import CommonImages from '../../constants/CommonImages'
import ReviewStar from '../Review/ReviewStar'

const CardReview = () => {
    return (
        <View style={styles.container}

        >
            <View style={styles.avatar}>
                <Avatar.Image size={44} source={{ uri: CommonImages.avatar }} />
                <Text style={styles.textTitle}>Nguyen Van Tai</Text>
            </View>
            {/* review body */}
            <View style={styles.triangle}></View>

            <View style={styles.body}>

                <View style={styles.message}>
                    <Text style={styles.messageText}>fsd sdfds dsd</Text>
                </View>
                <View style={{ display: 'flex', flexDirection: 'row',marginLeft:8 }}>
                    <ReviewStar />
                    <ReviewStar />
                    <ReviewStar />
                    <ReviewStar />
                </View>
            </View>
        </View>
    )
}

export default CardReview

const styles = StyleSheet.create({
    container: {
        padding: 8,
        backgroundColor: 'gainsboro',
        marginVertical: 4,
        borderRadius: 12

    },
    textTitle: {
        marginHorizontal: 12
    },
    avatar: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 20
    },
    body: {
        marginLeft: 50,
        // marginVertical: 8,
        backgroundColor: 'mintcream',
        padding: 12,
        borderRadius: 8,
        position: 'relative'
    },
    triangle: {
        position: 'relative',
        top: 10,
        left: 5,
        marginLeft: 50,
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderLeftWidth: 10,
        borderRightWidth: 20,
        borderBottomWidth: 30,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: 'mintcream'
    },
    message:{
        marginVertical:4,
    },
    messageText:{
        color:'grey',
        fontSize:16
    }


})
