import React from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import { Avatar, Button, Card, Title, Paragraph, Caption, Chip, IconButton } from 'react-native-paper';
import CommonImages from '../../constants/CommonImages';
import CommonColors from '../../constants/CommonColors'
import CommonIcons from '../../constants/CommonIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';




const CollaboratorCard = ({ item,navigation }) => {
    return (
        <TouchableOpacity style={[styles.cardContainer,{zIndex:-1}]}
            onPress={()=>navigation.navigate('CollaboratorDetail',{collaborator_id:item.id})}
        >
       


            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <Title style={{ fontSize: 16, marginHorizontal: 6 }}>{item?.attributes.name}</Title>

                <Avatar.Image size={24} source={{
                    uri: CommonImages.notFound
                }} />
            </View>
            <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                {
                    item?.relationships?.occupations.map((e) => (
                        <Chip style={{
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
        padding: 6


    },
    cardImage: {
        height: Dimensions.get('screen').height / 6,
        width: '30%',
    },
    cardContent: {
        width: '70%'
    }
})
