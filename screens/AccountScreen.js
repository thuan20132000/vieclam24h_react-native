import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Avatar, Divider, List, Subheading, Title } from 'react-native-paper'
import CommonIcons from '../constants/CommonIcons'

const AccountScreen = (props) => {
    const {
        navigation
    } = props;


    return (
        <View>
            <View style={styles.userCardContainer}>
                <Avatar.Image
                    size={88}
                    source={require('../assets/images/avatar1.jpg')}
                />
                <View style={styles.userInfor}>
                    <Title>Thuan</Title>
                    <Subheading>104 le van thinh</Subheading>
                </View>
            </View>
            <Divider />
            <List.Item
                title="Hồ Sơ Cá Nhân"
                left={props => <List.Icon {...props} icon={CommonIcons.historyJob} />}
                onPress={()=>navigation.navigate('CollaboratorProfile')}
            />
            <List.Item
                title="Lịch Sử Ứng Tuyển"
                left={props => <List.Icon {...props} icon={CommonIcons.historyJob} />}
                onPress={()=>console.warn('ds')}
            />
            <List.Item
                title="Cài Đặt"
                left={props => <List.Icon {...props} icon={CommonIcons.historyJob} />}
                onPress={()=>console.warn('ds')}
            />
        </View>
    )
}

export default AccountScreen

const styles = StyleSheet.create({
    userCardContainer: {
        display: 'flex',
        flexDirection: 'row',
        margin: 12
    },
    userInfor: {
        justifyContent: 'center',
        paddingLeft: 16
    },


})
