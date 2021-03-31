import React, { useState } from 'react'
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import CommonImages from '../constants/CommonImages'
import messaging from '@react-native-firebase/messaging';
import { useSelector } from 'react-redux';

import { _getUserNotifications } from '../utils/serverApi'
import { getDaysBetweenTwoDates } from '../utils/helper';

const NotificationItem = ({
    title,
    subtitle,
    time,
    avatar
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
    // React.useEffect(() => {
    //     // console.warn('fafas');
    //     // messaging().onNotificationOpenedApp(remoteMsg => {
    //     //     setNotificationData([...notificationData, remoteMsg.notification]);
    //     // });

    //     messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    //         setNotificationData([...notificationData, remoteMessage.notification]);

    //     } )

    // }, []);




    React.useEffect(() => {

        if (notification_data) {
            console.warn(notification_data);
            if (notification_data?.item) {
                setNotificationData([...notification_data, item]);
            }
        }
    }, []);



    React.useEffect(() => {
        _getUserNotifications(userInformation?.id).then((e) => {
            console.warn(e);
            if (e.status) {
                setUserNotification(e.data);
            }
        });
    }, []);

    return (
        <ScrollView
            style={{
                display: 'flex',
                flex: 1
            }}
        >
            {
                userNotification.length > 0 &&
                userNotification.map((e, index) =>
                    <NotificationItem
                        key={index.toString()}
                        title={`${e.title}`}
                        subtitle={`${e.content}`}
                        time={getDaysBetweenTwoDates(e.created_at)}
                    
                    />

                )
            }


        </ScrollView>
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
