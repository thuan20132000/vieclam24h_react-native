import React, { useState } from 'react'
import { StyleSheet, Text, View, Image, Dimensions, FlatList, TouchableHighlight, ActivityIndicator } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import CommonImages from '../../constants/CommonImages'
import messaging from '@react-native-firebase/messaging';
import { useSelector } from 'react-redux';

import { _getUserNotifications } from '../../utils/serverApi'
import { getDaysBetweenTwoDates } from '../../utils/helper';

const NotificationItem = ({
    title,
    subtitle,
    time,
    avatar,
    onItemPress
}) => {
    return (
        <TouchableOpacity
            style={[
                styles.row,
                {
                    marginHorizontal: 6,
                    flexWrap: 'wrap',
                    backgroundColor: 'white',
                    borderBottomWidth: 0.2,
                    borderBottomColor: 'grey'
                }
            ]}
            onPress={onItemPress}
        >
            <Image
                style={{
                    width: 60,
                    height: 60,
                    borderRadius: 30
                }}
                source={{
                    uri: avatar || CommonImages.avatar
                }}
            />

            <View
                style={[
                    styles.col,
                    {
                        width: '80%',
                        padding: 6
                    }
                ]}
            >
                <Text
                    style={[styles.title, { color: '#6495ed', fontSize: 16 }]}
                    numberOfLines={2}

                >
                    {title}
                </Text>
                <Text
                    style={[styles.subTitle]}
                    numberOfLines={3}
                >
                    {subtitle}
                </Text>
                <Text
                    style={[styles.subTime, { textAlign: 'left' }]}
                >
                    {time}
                </Text>
            </View>
        </TouchableOpacity>
    )
}



const NotificationScreen = (props) => {

    const { userInformation } = useSelector(state => state.authentication);
    const notification_data = props.route.params;
    const [notificationData, setNotificationData] = useState([]);
    const [userNotification, setUserNotification] = useState([]);
    React.useEffect(() => {
        // console.warn('fafas');
        // messaging().onNotificationOpenedApp(remoteMsg => {
        //     setNotificationData([...notificationData, remoteMsg.notification]);
        // });

        // messaging().setBackgroundMessageHandler(async (remoteMessage) => {
        //     console.warn('remote notification: ',remoteMessage);
        //     setNotificationData([...notificationData, remoteMessage.notification]);

        // })
        messaging().onNotificationOpenedApp(remoteMsg => {
            // props.navigation.navigate('Notification');
            setUserNotification([remoteMsg, ...userNotification])

        });

        const unsubscribe = messaging().onMessage(async remoteMessage => {
            console.log('tm: ', remoteMessage);
            setUserNotification([remoteMessage, ...userNotification])
        });

        return unsubscribe;

    }, []);
   


    const [nextPageLink, setNextPageLink] = useState('');

    React.useEffect(() => {
        _getUserNotifications(userInformation?.id).then((e) => {
            if (e.status) {
                setUserNotification(e.data?.data);
                setNextPageLink(e.data?.next);
            }
        });
    }, []);

    const [isRefreshing, setIsRefreshing] = useState(false);
    const _onRefreshNewNotification = async () => {
        setIsRefreshing(true);
        setTimeout(() => {
            _getUserNotifications(userInformation?.id).then((e) => {
                if (e.status) {
                    setUserNotification(e.data?.data);
                    setNextPageLink(e.data?.next);
                }
            });
            setIsRefreshing(false)
        }, 1600);


    }

    const [isFetchOld, setIsFetchOld] = useState(false);
    const _onFetchOldNotification = async () => {
        setIsFetchOld(true);
        setTimeout(() => {

            if (nextPageLink) {
                fetch(nextPageLink)
                    .then(data => data.json())
                    .then((data) => {
                        setNextPageLink(data.next);
                        setUserNotification([...userNotification, ...data.data]);
                    })
                    .catch((error) => console.log('error', error))
                setIsFetchOld(false);

            } else {
                setIsFetchOld(false);
            }

        }, 1200);
    }




    const _onNotificationPress = async (notification) => {
        if(!notification){
            return;
        }
        if(notification?.jobcandidate?.id){
            props.navigation.navigate('JobCandidateTracking',{
                jobcandidate:notification?.jobcandidate
            });
            return;
        }
        if(notification?.job?.id){
            props.navigation.navigate('JobDetail',{
                job_id:notification?.job?.id
            });
            return;
        }

    }

    return (

        <FlatList
            ItemSeparatorComponent={
                Platform.OS !== 'android' &&
                (({ highlighted }) => (
                    <View
                        style={[
                            style.separator,
                            highlighted && { marginLeft: 0 }
                        ]}
                    />
                ))
            }
            data={userNotification}
            renderItem={({ item, index, separators }) => (

                <NotificationItem
                    title={`${item.title || item.notification?.title}`}
                    subtitle={`${item?.content || item.notification?.body}`}
                    time={getDaysBetweenTwoDates(item.sentTime || item.created_at)}
                    onItemPress={()=>_onNotificationPress(item)}

                />
            )}
            keyExtractor={(item, index) => index.toString()}

            onEndReachedThreshold={0.1}
            onEndReached={_onFetchOldNotification}
            refreshing={isRefreshing}
            onRefresh={_onRefreshNewNotification}
            ListFooterComponent={
                <ActivityIndicator
                    animating={isFetchOld}
                    color={'coral'}
                    size={'large'}
                />
            }
        />
    )
}

const deviceWidth = Dimensions.get('screen').width;
const deviceHeight = Dimensions.get('screen').height;

export default NotificationScreen

const styles = StyleSheet.create({
    row: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
    },
    col: {
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'center'
    },
    subTitle: {
        marginVertical: 6
    },
    subTime: {
        color: 'grey',
        fontSize: 14
    }

})
