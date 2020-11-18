import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Avatar, Button, Divider, List, Subheading, Title } from 'react-native-paper'
import { useDispatch } from 'react-redux'
import CommonColors from '../constants/CommonColors'
import CommonIcons from '../constants/CommonIcons'

import * as userActions from '../store/actions/authenticationActions';

const AccountScreen = (props) => {
    const {
        navigation
    } = props;

    const dispatch = useDispatch();

    const [isLoading,setIsLoading] = useState(false);

    const _logout = async () => {
        setIsLoading(true);
        await dispatch(userActions.logout());
        setIsLoading(false);
    }


    return (
        <ScrollView>
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
                onPress={() => navigation.navigate('CollaboratorProfile')}
            />
            <List.Item
                title="Thông Tin Thanh Toán"
                left={props => <List.Icon {...props} icon={CommonIcons.historyJob} />}
                onPress={() => console.warn('ds')}
            />
            <List.Item
                title="Lịch Sử Ứng Tuyển"
                left={props => <List.Icon {...props} icon={CommonIcons.historyJob} />}
                onPress={() => console.warn('ds')}
            />
            <List.Item
                title="Thông Báo"
                left={props => <List.Icon {...props} icon={CommonIcons.historyJob} />}
                onPress={() => console.warn('ds')}
            />
            <List.Item
                title="Trợ Giúp"
                left={props => <List.Icon {...props} icon={CommonIcons.historyJob} />}
                onPress={() => console.warn('ds')}
            />
            <List.Item
                title="Đổi Mật Khẩu"
                left={props => <List.Icon {...props} icon={CommonIcons.historyJob} />}
                onPress={() => console.warn('ds')}
            />
            <List.Item
                title="Đã Lưu"
                left={props => <List.Icon {...props} icon={CommonIcons.historyJob} />}
                onPress={() => console.warn('ds')}
            />
            <View style={styles.buttonLogoutWrap}>
                <Button  style={styles.buttonLogout}
                    mode="contained" 
                    color={CommonColors.primary}
                    onPress={_logout}
                >
                    Đăng Xuất
                </Button>

            </View>
        </ScrollView>
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
    buttonLogoutWrap:{
        marginVertical:16,
    },
    buttonLogout:{
        width:220,
        alignSelf:'center'
    }


})
