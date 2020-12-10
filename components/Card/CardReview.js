import React from 'react'
import { StyleSheet, Text, View, } from 'react-native'
import { Avatar } from 'react-native-paper'
import CommonColors from '../../constants/CommonColors'
import CommonImages from '../../constants/CommonImages'
import ReviewStar from '../Review/ReviewStar'

const CardReview = ({ review }) => {

    let rangeReview = Array(review.range).fill({});

    return (
        <View style={styles.container}

        >
            <View style={styles.avatar}>
                <Avatar.Image size={44} source={{ uri: review.author_image || CommonImages.avatar }} />
                <Text style={styles.textTitle}>{review.author_name}</Text>
            </View>
            {/* review body */}
            <View style={styles.triangle}></View>

            <View style={styles.body}>

                <View style={styles.message}>
                    <Text style={styles.messageText}>{review.review_content}</Text>
                </View>
                <View style={{ display: 'flex', flexDirection: 'row', marginLeft: 8 }}>
                    {
                        rangeReview.map((e, index) =>
                            <ReviewStar
                                key={index.toString()}
                            />

                        )
                    }

                </View>
            </View>
        </View>
    )
}

export default CardReview

const styles = StyleSheet.create({
    container: {
        padding: 8,
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
        backgroundColor: 'coral',
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
        borderBottomColor: 'coral'
    },
    message: {
        marginVertical: 4,
    },
    messageText: {
        color: 'white',
        fontSize: 16
    }


})
