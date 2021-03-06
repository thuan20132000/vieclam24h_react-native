import React from 'react'
import { Dimensions, StyleSheet, Text, View, Image } from 'react-native'
import { Avatar, Button, Card, Title, Paragraph, Caption, Chip, IconButton } from 'react-native-paper';
import CommonImages from '../../constants/CommonImages';
import CommonColors from '../../constants/CommonColors'
import CommonIcons from '../../constants/CommonIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ReviewStar from '../Review/ReviewStar';
import TagSimple from '../Tag/TagSimple';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const CollaboratorCard = ({ item, navigation,containerStyle,avatarSize=64 }) => {


    let collaborators_review = item?.reviews;

    let average_review = 0;
    let review_people_number = 0;

    if (collaborators_review.length > 0) {
        // let xx = collaborators_review.reduce((initial,next) => initial.range + next.range,0);
        // console.warn(xx);
        let reviewTotal = 0;
        collaborators_review.forEach(element => {
            reviewTotal = reviewTotal + element.range;
            review_people_number++;
        });
        average_review = reviewTotal / review_people_number;
    }


    return (
        <TouchableOpacity style={[styles.cardContainer, { zIndex: -1 },containerStyle]}
            onPress={() => navigation.navigate('CollaboratorDetail', { collaborator_id: item.id })}
        >


            <View style={[styles.row,
            {
                position: 'absolute',
                zIndex: 999,
                right: 10,
                top: 0,
                backgroundColor: 'rgba(236, 121, 79, 0.7)',
                borderRadius: 18,
                
                
            }]}
            >
                <Text style={[styles.subtitle2, { marginHorizontal: 2,color:'white' }]}>{average_review}</Text>
                <ReviewStar
                    iconSize={16}
                    iconColor={'gold'}
                />
                <Text style={[styles.subtitle2,{color:'white'}]}> {review_people_number} đánh giá </Text>
            </View>

            <View style={[styles.row,{marginVertical:22}]}>
                <Avatar.Image size={avatarSize} source={{
                    uri: item.attributes?.profile_image || CommonImages.avatar
                }} />
                <View style={[styles.column, { marginHorizontal: 12 }]}>
                    <Text style={[styles.title4]}>
                        {item?.attributes.name}
                    </Text>
                    <View style={styles.row}>

                        <MaterialCommunityIcons
                            name={CommonIcons.mapMarker}
                            color={CommonColors.primary}
                            size={14}
                        />
                        <Text style={[styles.title4, { fontSize: 12, fontWeight: '400', fontStyle: "italic",color:'grey' }]}>
                            {item?.attributes.address}
                        </Text>
                    </View>


                </View>
            </View>

            <View style={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                marginVertical: 2
            }}
            >
                {
                    item?.relationships?.occupations?.map((e, index) => (
                        // <Chip
                        //     key={index.toString()}
                        //     style={{
                        //         margin: 2
                        //     }}
                        //     onPress={() => console.log('Pressed')}

                        // >
                        //     {e.name}
                        // </Chip>
                        <TagSimple
                            key={index.toString()}
                            containerStyle={{
                                borderRadius: 12,
                                marginHorizontal: 4,
                                padding: 4,
                                marginVertical: 2
                            }}
                            iconName={CommonIcons.tagPrice}
                            iconColor={'white'}
                            label={e.name}
                            textStyle={{
                                fontSize: 11,
                                fontStyle: 'italic',
                                color: 'white',
                                fontWeight:'500'
                            }}
                        />
                    ))
                }
            </View>

        </TouchableOpacity>

    )
}
export default CollaboratorCard

const styles = StyleSheet.create({
    cardContainer: {
        marginHorizontal: 12,
        marginBottom: 8,
        display: 'flex',
        flexDirection: 'column',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        backgroundColor: 'white',
        padding: 6,
        borderRadius: 22


    },
    cardImage: {
        height: Dimensions.get('screen').height / 6,
        width: '30%',
    },
    cardContent: {
        width: '70%'
    },
    gridWrap: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        margin: 4
    },
    column: {
        display: 'flex',
        flexDirection: 'column'
    },
    title4: {
        fontSize: 16,
        fontWeight: '500',

    },
    subtitle2: {
        fontStyle: 'italic',
        fontSize: 10,
        color: 'red',
        fontWeight: '600'
    }
})
