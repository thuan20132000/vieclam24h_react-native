import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';



const CardItem = (props) => {

    const {
        image_url,
    } = props;

    return (
        <>
            <Card>
                <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
            </Card>
        </>

    )
}

export default CardItem

const styles = StyleSheet.create({})
