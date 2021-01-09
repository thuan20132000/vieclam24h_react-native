import React, { useState, useEffect, useLayoutEffect } from 'react'
import { Dimensions, StatusBar, StyleSheet, Text, View } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { Avatar, Button, Caption, Divider, List, Subheading, Title, IconButton } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'
import CommonColors from '../constants/CommonColors'
import CommonIcons from '../constants/CommonIcons'
import CommonImages from '../constants/CommonImages'

import * as userActions from '../store/actions/authenticationActions';

import ReactNativeParallaxHeader from 'react-native-parallax-header';



const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const IS_IPHONE_X = SCREEN_HEIGHT === 812 || SCREEN_HEIGHT === 896;
const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 44 : 20) : 0;
const HEADER_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 88 : 74) : 74;
const NAV_BAR_HEIGHT = HEADER_HEIGHT - STATUS_BAR_HEIGHT;



const RenderNavbar = ({
    userInformation,
    userAttributes
}) => (
    <View style={[styles.userCardContainer, {
        paddingVertical: 30
    }]}>


        <View style={styles.userInfor}>
            <Title>{userAttributes?.name}</Title>
            <Subheading>{userAttributes?.address}</Subheading>
            <Caption>{userAttributes?.idcard}</Caption>
        </View>
    </View>
);

const RenderContent = () => {


    return (
        <View style={styles.body}>
            {Array.from(Array(30).keys()).map((i) => (
                <View
                    key={i}
                    style={{ padding: 15, alignItems: 'center', justifyContent: 'center' }}>
                    <Text>Item {i + 1}</Text>
                </View>
            ))}
        </View>
    );
};

const RenderTitle = ({
    userInformation,
    userAttributes
}) => {
    return (
        <View style={[
            styles.body,
            {
                display: 'flex',
                flexDirection: 'row',
                alignContent: 'center',
                alignItems: 'center',
                justifyContent: 'space-around',
                width: deviceWidth
            }
        ]}>
            <Avatar.Image style={{ zIndex: -1, position: 'relative' }}
                size={54}
                source={{
                    uri: userInformation?.attributes?.profile_image || CommonImages.avatar
                }}
            />
            <Text style={{ color: 'white', fontSize: 25 }}>
                {userAttributes?.name}
            </Text>
        </View>
    );
};




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
        if (userRole.id == 3) {
            navigation.navigate('CustomerStatistic');
        } else {
            navigation.navigate('CollaboratorStatistic');
        }
    }

    useLayoutEffect(() => {

        props.navigation.setOptions({
            headerShown: false
        })
        return () => {

        };
    }, [])

    return (
        <>
            <StatusBar barStyle="dark-content" />
            <ReactNativeParallaxHeader
                headerMinHeight={HEADER_HEIGHT}
                headerMaxHeight={150}
                extraScrollHeight={20}
                navbarColor="coral"
                titleStyle={styles.titleStyle}
                title={<RenderTitle userInformation={userInformation} userAttributes={userAttributes} />}
                backgroundImage={{
                    uri: 'https://eskipaper.com/images/orange-wallpaper-8.jpg'
                }}
                backgroundImageScale={1.2}
                renderNavBar={() =>
                    <RenderNavbar

                    />
                }

                containerStyle={styles.container}
                contentContainerStyle={styles.contentContainer}
                innerContainerStyle={styles.container}
                scrollViewProps={{
                    onScrollBeginDrag: () => console.log('onScrollBeginDrag'),
                    onScrollEndDrag: () => console.log('onScrollEndDrag'),
                }}
                renderContent={() =>
                    <>
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

                    </>
                }
            />
        </>

    )
}
const deviceWidth = Dimensions.get('screen').width;
const deviceHeight = Dimensions.get('screen').height;

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
