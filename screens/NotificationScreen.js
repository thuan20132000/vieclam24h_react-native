import React from 'react'
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import CommonImages from '../constants/CommonImages'



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



const NotificationScreen = () => {
    return (
        <ScrollView
            style={{
                display: 'flex',
                flex: 1
            }}
        >
            <NotificationItem
                title={`Thuantruong vừa chọn bạn cho công việc sửa ống nước`}
                subtitle={`Thời gian sau 7 giờ`}
                time={2}
            />
            <NotificationItem
                title={`Thuantruong vừa chọn bạn cho công việc sửa ống nước`}
                subtitle={`Thời gian sau 7 giờ`}
                time={2}
            />
            <NotificationItem
                title={`Thuantruong vừa chọn bạn cho công việc sửa ống nước`}
                subtitle={`Thời gian sau 7 giờ`}
                time={2}
            />
            <NotificationItem
                title={`Thuantruong vừa chọn bạn cho công việc sửa ống nước`}
                subtitle={`Thời gian sau 7 giờ`}
                time={2}
            />

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
