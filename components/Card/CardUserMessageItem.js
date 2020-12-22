import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import CommonImages from '../../constants/CommonImages'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import CommonIcons from '../../constants/CommonIcons';
import CommonColors from '../../constants/CommonColors';
import { formatCash, formatDateTime } from '../../utils/helper';
import { getUserDetail } from '../../utils/serverApi';

import { useSelector } from 'react-redux';

const CardUserMessageItem = ({ title, subTitle, datetime, imageUrl, customStyle, onItemPress, socketResponseData, item }) => {


    // console.warn(item.conversation_id);

    const { userInformation } = useSelector(state => state.authentication);

    const [messageRealtime, setMessageRealtime] = useState('');

    const [userImage, setUserImage] = useState('');

    const [connectionUser,setConnectionUser] = useState({
        userImage:'',
        userName:''
    });

    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        setMessageRealtime(socketResponseData);
    }, [socketResponseData]);

    const fetchUserDetail = async (user_connection) => {
        setIsLoading(true);
        let userDetail = await getUserDetail(user_connection);
        setConnectionUser({
            userImage:userDetail?.data?.attributes?.profile_image,
            userName:userDetail?.data?.attributes?.name
        })

        setIsLoading(false);
    }


    useEffect(() => {

        let user_connection;
        if (userInformation.id != item.from) {
            //  console.warn(item.from);
            user_connection = item.from;
        } else {
            user_connection = item.to;
        }


        fetchUserDetail(user_connection);

    }, [])

    return (
        <TouchableOpacity style={[styles.cardContainer, customStyle]}
            onPress={onItemPress}
        >
            {
                !isLoading &&
                <Image
                    style={{
                        width: 60,
                        height: 60,
                        flex: 1,
                        borderRadius: 30
                    }}
                    source={{
                        uri: connectionUser.userImage || CommonImages.avatar
                    }}
                />
            }

            <View style={[styles.cardBody]}>
                <Text style={[styles.textTitle,]}>
                    {connectionUser.userName || "Anoniyous"}
                </Text>
                <Text
                    style={[styles.textSubTitle, { fontWeight: '600' }]}
                    numberOfLines={2}
                >
                    {messageRealtime?.message || subTitle}
                </Text>
                <Text style={[styles.textDate]}>
                    {datetime || socketResponseData.date && formatDateTime(new Date(socketResponseData.date))}
                </Text>
            </View>
            <View style={[styles.status]}>
                <MaterialCommunityIcons
                    name={CommonIcons.arrowRight}
                    size={18}
                    color={CommonColors.primary}
                />
            </View>
        </TouchableOpacity>
    )
}

export default CardUserMessageItem

const styles = StyleSheet.create({
    cardContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    cardBody: {
        display: 'flex',
        flexDirection: 'column',
        marginHorizontal: 14,
        flex: 6
    },
    textTitle: {
        color: 'black',
        fontSize: 16
    },
    textSubTitle: {
        color: 'grey',
        fontSize: 14,

    },
    textDate: {
        fontSize: 12,
        color: 'grey',
        fontStyle: 'italic'
    },
    status: {
        flex: 1,
        marginHorizontal: 4,
        alignItems: 'center'
    }
})
