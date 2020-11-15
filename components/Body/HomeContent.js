import React, { useRef } from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Avatar, Button, Card, Title, Paragraph, Subheading } from 'react-native-paper';
import Carousel from 'react-native-snap-carousel';



const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

const CardItem = (props) => {
    const { navigation } = props;

    const _navigateToDetail = () => {
        navigation.navigate('JobDetail');
    }

    return (
        <TouchableOpacity
            onPress={_navigateToDetail}
        >
            <Card style={{ width: deviceWidth / 3, margin: 8, height: deviceHeight / 4 }}>
                <Card.Content>
                    <Title>Card title</Title>
                    <Paragraph>Card content</Paragraph>
                </Card.Content>
                <Card.Cover
                    source={{ uri: 'https://picsum.photos/700' }}
                    style={{ overflow: 'hidden' }}
                />
            </Card>
        </TouchableOpacity>

    )
}

const HomeContent = (props) => {
    const refRectangleProductItem = useRef();

    const PRODUCTS = Array(10).fill({});

    return (
        <View>
            <Subheading style={{ paddingHorizontal: 12 }}>Ứng viên nổi bật</Subheading>

            <ScrollView
                horizontal={true}
            >
                {
                    PRODUCTS.map((e, index) => <CardItem {...props} />)
                }
            </ScrollView>
        </View>
    )
}

export default HomeContent

const deviceWidth = Dimensions.get('screen').width;
const deviceHeight = Dimensions.get('screen').height;

const styles = StyleSheet.create({})
