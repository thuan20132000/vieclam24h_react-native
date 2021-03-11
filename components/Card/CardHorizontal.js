import React, { useEffect } from 'react'
import { Dimensions, ImageBackground, StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Avatar, Button, Card, Title, Paragraph, Caption } from 'react-native-paper';
import CommonImages from '../../constants/CommonImages';

import { formatCash, formatDateTime } from '../../utils/helper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CommonIcons from '../../constants/CommonIcons';
import CommonColors from '../../constants/CommonColors';

import server_url from '../../serverConfig';


const CardHorizontal = ({ index, item, onPress }) => {





    return (
        <TouchableOpacity style={styles.cardContainer}
            onPress={() => onPress(item?.id)}

        >


            <ImageBackground
                source={{
                    uri: (item.images && item.images[0]) ? `${server_url.url_absolute}/${item.images[0].image}` : CommonImages.notFound
                }}
                style={{
                    width: deviceWidth / 4
                }}
            >
            </ImageBackground>
            <Card.Content style={styles.cardContent}>
                <Text style={{ fontSize: 14, marginRight: 20 }}>
                    {item?.name}
                </Text>
                <Paragraph
                    numberOfLines={2}
                    style={{
                        fontSize: 12,
                        fontStyle: 'italic',
                        color: 'grey'
                    }}
                >
                    {item?.description}
                </Paragraph>

                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <MaterialCommunityIcons
                        name={CommonIcons.tagPrice}
                        size={16}
                        color={CommonColors.primary}
                    />
                    <Caption style={{ marginHorizontal: 6, color: 'red', fontWeight: '600' }}>
                        {formatCash(item?.suggestion_price || 0)} đ
                    </Caption>

                </View>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <MaterialCommunityIcons
                        name={CommonIcons.mapCheck}
                        size={16}
                        color={CommonColors.primary}
                    />
                    <Caption style={{ marginHorizontal: 6, fontWeight: '300' }}>
                        {item?.location?.district}
                    </Caption>

                </View>

                <Text style={{
                    marginHorizontal: 2,
                    fontWeight: '300',
                    bottom: 0,
                    position: 'relative',
                    fontSize: 12,
                    color: 'white',
                    backgroundColor: 'coral',
                    padding: 6,
                    maxWidth:120
                }}>
                    {item?.field?.name}
                </Text>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>

                    <Text style={{
                        marginHorizontal: 2,
                        fontWeight: '300',
                        bottom: 0,
                        position: 'relative',
                        fontSize: 12,
                        color: 'grey'
                    }}>
                        Đăng lúc : {formatDateTime(item?.created_at)}
                    </Text>



                </View>


                <View style={{
                    position: 'absolute',
                    right: 26,
                    backgroundColor: 'coral',
                    display: 'flex',
                    flexDirection: 'row',
                    padding: 4,
                    top: 2

                }}>
                    <MaterialCommunityIcons
                        name={CommonIcons.person}
                        size={16}
                        color={'white'}
                    />
                    <Text style={{ color: 'white',fontWeight:'700' }}>{item?.candidates?.length}</Text>
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
        borderRadius: 8,
        overflow: 'hidden',
        height: 140,


    },
    cardImage: {
        height: Dimensions.get('screen').height / 6,
        width: '30%',
    },
    cardContent: {
        width: '70%',
        padding: 6,
        justifyContent: 'space-around'
    }
})
