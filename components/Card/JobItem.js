import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Avatar, Button, Card, Title, Chip, IconButton } from 'react-native-paper';
import CommonColors from '../../constants/CommonColors';
import CommonIcons from '../../constants/CommonIcons';


const JobItem = ({job}) => {

    console.warn(job);

    return (
        <Card style={styles.cardContainer}>
            <Card.Content>
                <Title>{job.relationships?.job?.name}</Title>
                <Card.Title title={job.relationships?.author?.name} subtitle={job.relationships?.author.phonenumber} 
                    left={()=>
                        <Avatar.Image
                            source={{
                                uri:job.relationships?.author?.profile_image
                            }}
                            size={44}
                        />
                    } 
                />

            </Card.Content>
            <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                <Chip style={{ width: 120, margin: 12, alignItems: 'center', alignContent: 'center' }}>
                    {
                        job.attributes.status==2?"Đang chờ":(job.attributes.status==3?"Chấp nhận":"Từ chối")
                    }
                </Chip>
                <IconButton
                    icon={CommonIcons.chatMessage}
                    color={CommonColors.primary}
                    size={28}
                    onPress={() => console.log('Pressed')}
                />
            </View>
        </Card>
    )
}

export default JobItem

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: 'white',
        marginVertical: 4,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    }
})
