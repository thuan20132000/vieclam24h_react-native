import React, { useState } from 'react'
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import CommonImages from '../constants/CommonImages'
import messaging from '@react-native-firebase/messaging';



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
                    {time} giờ trước
                </Text>
            </View>
        </TouchableOpacity>
    )
}



const NotificationScreen = (props) => {


    const notification_data = props.route.params;
    const [notificationData, setNotificationData] = useState([
        {
            id: 1,
            title: "C1 vua them mot cong viec ",
            body: "C1 vua them mot cong viec",
            sendTime: 2
        },
        {
            id: 2,
            title: "C1 vua them mot cong viec ",
            body: "C2 vua them mot cong viec",
            sendTime: 5
        },
        {
            id: 3,
            title: "C1 vua them mot cong viec ",
            body: "C3 vua them mot cong viec",
            sendTime: 2
        }
    ]);

    // React.useEffect(() => {
    //     console.warn('fafas');
    //     messaging().onNotificationOpenedApp(remoteMsg => {
    //         setNotificationData([...notificationData, remoteMsg.notification]);
    //     });
    // }, [])

    React.useEffect(() => {

        if (notification_data) {
            console.warn(notification_data);
            if (notification_data?.item) {
                setNotificationData([...notification_data, item]);
            }
        }
    }, [])

    return (
        <ScrollView
            style={{
                display: 'flex',
                flex: 1
            }}
        >
            {
                notificationData.map((e, index) =>
                    <NotificationItem
                        key={index.toString()}
                        title={`${e.title}`}
                        subtitle={`${e.body}`}
                        time={2}
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
