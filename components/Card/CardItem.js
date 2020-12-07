import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';



const CardItem = ({image_url}) => {

  

    return (
        <>
            <Card>
                <Card.Cover source={{ uri: image_url || 'https://picsum.photos/700' }} />
            </Card>
        </>

    )
}

export default CardItem

const styles = StyleSheet.create({})
