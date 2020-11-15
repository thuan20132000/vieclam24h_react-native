import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Avatar, Button, Card, Title, Chip, IconButton } from 'react-native-paper';
import CommonColors from '../../constants/CommonColors';
import CommonIcons from '../../constants/CommonIcons';

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

const JobItem = () => {
    return (
        <Card style={styles.cardContainer}>
            <Card.Content>
                <Title>Sửa cửa sổ </Title>
                <Card.Title title="Nguyen Van Thinh" subtitle="104 Le Van Thinh" left={LeftContent} />

            </Card.Content>
            <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                <Chip style={{ width: 120, margin: 12, alignItems: 'center', alignContent: 'center' }}>
                    Đang chờ
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
