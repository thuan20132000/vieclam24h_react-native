import React from 'react'
import { Dimensions, StyleSheet, Text, View, Image } from 'react-native'
import { Avatar, Button, Card, Title, Paragraph, Caption, Chip, IconButton } from 'react-native-paper';
import CommonImages from '../../constants/CommonImages';
import CommonColors from '../../constants/CommonColors'
import CommonIcons from '../../constants/CommonIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ReviewStar from '../Review/ReviewStar';




const CollaboratorCard = ({ item, navigation }) => {


    let collaborators_review = item?.reviews;
    
    let average_review = 0;
    let review_people_number = 0;
    
    if(collaborators_review.length > 0){
        // let xx = collaborators_review.reduce((initial,next) => initial.range + next.range,0);
        // console.warn(xx);
        let reviewTotal = 0 ;
        collaborators_review.forEach(element => {
            reviewTotal = reviewTotal +  element.range;
            review_people_number++;
        });
        average_review = reviewTotal / review_people_number;
    }


    return (
        <TouchableOpacity style={[styles.cardContainer, { zIndex: -1 }]}
            onPress={() => navigation.navigate('CollaboratorDetail', { collaborator_id: item.id })}
        >   


            <View style={[styles.row,
                {
                    position:'absolute',
                    zIndex:999,
                    right:10,
                    top:0,
                    backgroundColor:'#ffa07a',
                    padding:4,
                    borderRadius:18
                }]}
            >
                <Text style={[styles.subtitle2,{marginHorizontal:2}]}>{average_review}</Text> 
                <ReviewStar
                    iconSize={16}
                    iconColor={'gold'}
                />
                <Text style={[styles.subtitle2]}> {review_people_number} đánh giá </Text>
            </View>

            <View style={[styles.row]}>
                <Avatar.Image size={64} source={{
                    uri: item.attributes?.profile_image || CommonImages.avatar
                }} />
                <View style={[styles.column,{marginHorizontal:12}]}>
                    <Text style={[styles.title4]}>
                        {item?.attributes.name}
                    </Text>
                    <Text style={[styles.title4,{fontSize:12,fontWeight:'400',fontStyle:"italic"}]}>
                        {item?.attributes.address}
                    </Text>

                </View>
            </View>

            <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', marginVertical: 6 }}>
                {
                    item?.relationships?.occupations.map((e, index) => (
                        <Chip
                            key={index.toString()}
                            style={{
                                margin: 2
                            }}
                            onPress={() => console.log('Pressed')}
                        >
                            {e.name}
                        </Chip>
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
        margin: 12


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
    column:{
        display:'flex',
        flexDirection:'column'
    },
    title4:{
        fontSize:16,
        fontWeight:'500',

    },
    subtitle2:{
        fontStyle:'italic',
        fontSize:10,
        color:'red',
        fontWeight:'600'
    }
})
