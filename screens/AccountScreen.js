import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Avatar, Button, Caption, Divider, List, Subheading, Title, IconButton } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'
import CommonColors from '../constants/CommonColors'
import CommonIcons from '../constants/CommonIcons'
import CommonImages from '../constants/CommonImages'

import * as userActions from '../store/actions/authenticationActions';

const AccountScreen = (props) => {
    const {
        navigation
    } = props;
    const { userInformation } = useSelector(state => state.authentication);
    const [userRole, setUserRole] = useState();

    const [userAttributes, setUserAttributes] = useState();

    useEffect(() => {
        setUserAttributes(userInformation.attributes);
    }, [])

    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(false);

    const _logout = async () => {
        setIsLoading(true);
        dispatch(userActions.logout());
        setIsLoading(false);
    }


    useEffect(() => {
        let user_role = userInformation.role[0];
        setUserRole(user_role);
    }, []);


    const _onNavigateToStatistic = async () => {
        if(userRole.id == 3){
            navigation.navigate('CustomerStatistic');
        }else{
            navigation.navigate('CollaboratorStatistic');
        }
    }


    return (
        <ScrollView>
            <View style={styles.userCardContainer}>
                <Avatar.Image style={{ zIndex: -1, position: 'relative' }}
                    size={88}
                    source={{
                        uri: userInformation?.attributes?.profile_image || CommonImages.avatar
                    }}
                />
                <IconButton style={{ position: 'absolute', left: 0, bottom: -10 }}
                    icon={"camera"}
                    color={CommonColors.primary}
                    size={20}
                    onPress={() => console.log('Pressed')}
                />

                <View style={styles.userInfor}>
                    <Title>{userAttributes?.name}</Title>
                    <Subheading>{userAttributes?.address}</Subheading>
                    <Caption>{userAttributes?.idcard}</Caption>
                </View>
            </View>
            <Divider />
            <List.Item
                title="Hồ Sơ Cá Nhân"
                left={props => <List.Icon {...props} icon={CommonIcons.historyJob} />}
                onPress={() => navigation.navigate('CollaboratorProfile')}
            />
            <List.Item
                title="Thống Kê"
                left={props => <List.Icon {...props} icon={CommonIcons.historyJob} />}
                onPress={_onNavigateToStatistic}
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
                <Button style={styles.buttonLogout}
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
    buttonLogoutWrap: {
        marginVertical: 16,
    },
    buttonLogout: {
        width: 220,
        alignSelf: 'center'
    }


})
