import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import CommonIcons from '../../constants/CommonIcons'
import CommonImages from '../../constants/CommonImages'
import ButtonIcon from '../Button/ButtonIcon'
import RowInformation from '../Row/RowInformation'
import { Button } from 'react-native-paper';
import CommonColors from '../../constants/CommonColors'

const CardUserContact = ({
    chilrden,
    onItemPress,
    username,
    address,
    image_url,
    phonenumber,
    gender,
    onPhonePress,
    onChatPress,
    contactDisplay = true,
    containerStyle
}) => {
    return (
        <View
            style={[
                styles.container,
                containerStyle
            ]}
        >
            <TouchableOpacity
                style={
                    {
                        display: 'flex',
                        flexDirection: 'row'
                    }
                }
                onPress={onItemPress}
            >

                <View
                    style={{
                        display: 'flex',
                        flexDirection: 'row',

                    }}
                >
                    <Image
                        source={{
                            uri: image_url || CommonImages.avatar
                        }}
                        style={{
                            width: 80,
                            height: 80,
                            borderRadius: 40
                        }}
                    />
                </View>
                <View
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                    }}
                >
                    <RowInformation
                        value={username}
                        iconName={CommonIcons.account}
                    />
                    {
                        phonenumber &&
                        <RowInformation
                            value={phonenumber}
                            iconName={CommonIcons.phone}
                            valueStyle={{
                                fontSize: 12
                            }}
                        />
                    }
                    {
                        address &&
                        <RowInformation
                            value={address}
                            iconName={CommonIcons.mapCheck}
                            valueStyle={{
                                fontSize: 12
                            }}
                        />
                    }
                    {
                        gender &&
                        <RowInformation
                            value={gender}
                            iconName={CommonIcons.person}
                            valueStyle={{
                                fontSize: 12
                            }}
                        />
                    }
                </View>
            </TouchableOpacity>

            {
                contactDisplay &&
                <View
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-around',
                        marginVertical: 12
                    }}
                >
                    <Button
                        icon={CommonIcons.phone}
                        mode="outlined"
                        onPress={onPhonePress}
                        color={'coral'}


                    >
                        Liên hệ
                </Button>
                    <Button
                        icon={CommonIcons.messages}
                        mode="outlined"
                        onPress={onChatPress}
                        color={'coral'}
                    >
                        Nhắn tin
                </Button>

                </View>
            }

            {
                chilrden
            }
        </View>
    )
}

export default CardUserContact

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        margin: 8,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.7,
        shadowRadius: 6.68,

        elevation: 4,
        borderRadius: 8,
        padding: 6
    }
})
