import React, { useEffect } from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import { Avatar, Button, Card, Title, Paragraph, Caption } from 'react-native-paper';
import CommonImages from '../../constants/CommonImages';

import {formatCash} from '../../utils/helper';




const CardHorizontal = ({ index, item, onPress }) => {

    return (
        <View style={styles.cardContainer}>

            {
               
                <Card.Cover style={styles.cardImage}
                    source={{ uri: item?.attributes?.images[0]?.image_url || CommonImages.notFound }}
                /> 
           
            }
            <Card.Content style={styles.cardContent}>
                <Title style={{ fontSize: 16 }}>{item?.attributes.name}</Title>
                <Paragraph>{item?.attributes.description}</Paragraph>
                <Card.Actions>
                    <Button
                        onPress={() => onPress(item?.id)}
                    >
                        Chi Tiết
                    </Button>
                </Card.Actions>
                <Caption>{formatCash(item?.attributes.suggestion_price)}</Caption>
            </Card.Content>
        </View>

    )
}

export default CardHorizontal

const styles = StyleSheet.create({
    cardContainer: {
        marginHorizontal: 12,
        marginBottom: 8,
        display: 'flex',
        flexDirection: 'row',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        backgroundColor: 'white'


    },
    cardImage: {
        height: Dimensions.get('screen').height / 6,
        width: '30%',
    },
    cardContent: {
        width: '70%'
    }
})
