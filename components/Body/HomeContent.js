import React, { useRef } from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import Carousel from 'react-native-snap-carousel';



const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

const CardItem = (props) => {
    return (
        <Card style={{width:deviceWidth/2,margin:12,height:deviceHeight/4}}>
            <Card.Title title="Card Title" subtitle="Card Subtitle" left={LeftContent} />
            <Card.Content>
                <Title>Card title</Title>
                <Paragraph>Card content</Paragraph>
            </Card.Content>
            <Card.Cover source={{ uri: 'https://picsum.photos/700' }} style={{overflow:'hidden'}} />
        </Card>
    )
}

const HomeContent = () => {
    const refRectangleProductItem = useRef();

    const PRODUCTS = Array(10).fill({});

    return (
        <ScrollView
            horizontal={true}
        >
            {
                PRODUCTS.map((e,index) => <CardItem/>)
            }
        </ScrollView>
    )
}

export default HomeContent

const deviceWidth = Dimensions.get('screen').width;
const deviceHeight = Dimensions.get('screen').height;

const styles = StyleSheet.create({})
