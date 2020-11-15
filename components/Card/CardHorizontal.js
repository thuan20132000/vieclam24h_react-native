import React from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';





const CardHorizontal = () => {
    return (
        <View style={styles.cardContainer}>
            <Card.Cover style={styles.cardImage}
                source={{ uri: 'https://picsum.photos/700' }}
            />
            <Card.Content style={styles.cardContent}>
                <Title>Card title</Title>
                <Paragraph>Card content</Paragraph>
                <Card.Actions>
                    <Button
                        onPress={()=>console.warn('fs')}
                    >
                        Chi Tiêt
                    </Button>
                </Card.Actions>
            </Card.Content>
        </View>

    )
}

export default CardHorizontal

const styles = StyleSheet.create({
    cardContainer: {
        marginHorizontal:12,
        marginBottom:8,
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
        backgroundColor:'white'


    },
    cardImage: {
        height: Dimensions.get('screen').height / 6,
        width: '30%',
    },
    cardContent: {
        width: '70%'
    }
})
