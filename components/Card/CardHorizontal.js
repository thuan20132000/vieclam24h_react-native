import React, { useEffect } from 'react'
import { Dimensions, ImageBackground, StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Avatar, Button, Card, Title, Paragraph, Caption } from 'react-native-paper';
import CommonImages from '../../constants/CommonImages';

import { formatCash } from '../../utils/helper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CommonIcons from '../../constants/CommonIcons';
import CommonColors from '../../constants/CommonColors';



const CardHorizontal = ({ index, item, onPress }) => {


    console.warn(item);
    return (
        <TouchableOpacity style={styles.cardContainer}
            onPress={() => onPress(item?.id)}

        >


            <ImageBackground
                source={{
                    uri: item?.attributes?.images[0]?.image_url || CommonImages.notFound
                }}
                style={{
                    width: deviceWidth / 3
                }}
            >
            </ImageBackground>
            <Card.Content style={styles.cardContent}>
                <Title style={{ fontSize: 16 }}>
                    {item?.attributes.name}
                </Title>
                <Paragraph
                    numberOfLines={2}
                    style={{
                        fontSize: 12,
                        fontStyle: 'italic',
                        color: 'grey'
                    }}
                >
                    {item?.attributes.description}
                </Paragraph>

                <View style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                    <MaterialCommunityIcons
                        name={CommonIcons.tagPrice}
                        size={16}
                        color={CommonColors.primary}
                    />
                    <Caption style={{marginHorizontal:6,color:'red',fontWeight:'600'}}>
                        {formatCash(item?.attributes?.suggestion_price)} đ
                    </Caption>

                </View>
                <View style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                    <MaterialCommunityIcons
                        name={CommonIcons.mapCheck}
                        size={16}
                        color={CommonColors.primary}
                    />
                    <Caption style={{marginHorizontal:6,fontWeight:'300'}}>
                        {item?.relationships.location.address}
                    </Caption>

                </View>

            </Card.Content>
        </TouchableOpacity>

    )
}
const deviceWidth = Dimensions.get('screen').width;
const deviceHeight = Dimensions.get('screen').height;

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
        backgroundColor: 'white',
        borderRadius: 22,
        overflow: 'hidden',
        height: 140,


    },
    cardImage: {
        height: Dimensions.get('screen').height / 6,
        width: '30%',
    },
    cardContent: {
        width: '70%',
        padding: 6
    }
})
