import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import CommonColors from '../../constants/CommonColors'
import CommonIcons from '../../constants/CommonIcons'

const RowInformation = ({
    iconName,
    iconSize,
    iconColor,
    label,
    labelStyle,
    value,
    valueStyle,
    containerStyle,
    children,
    iconStyle
}) => {
    return (
        <View style={[
            {
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 4,
                alignContent: 'center',

            },
            containerStyle

        ]}>
            {
                iconName &&
                <MaterialCommunityIcon
                    name={iconName || CommonIcons.chatMessage}
                    size={iconSize || 18}
                    color={iconColor || CommonColors.btnSubmit}
                    style={[
                        {
                            marginHorizontal: 6,
                            width: '10%'
                        },
                        iconStyle
                    ]}

                />

            }
            <View
                style={{
                    width: '90%',
                    display: 'flex',
                    flexDirection: 'row'
                }}
            >
                {
                    label &&
                    <Text
                        style={
                            [
                                {
                                    fontSize: 14,
                                    color: 'grey',
                                    marginHorizontal: 6,

                                },
                                labelStyle
                            ]
                        }
                        numberOfLines={3}
                    >
                        {label}
                    </Text>

                }
                <Text
                    style={[
                        {
                            color: 'black',
                            fontSize: 14,
                            fontWeight: '700',
                            overflow: 'hidden',
                            width: 240
                        },
                        valueStyle
                    ]}
                >
                    {value}
                </Text>
            </View>

            {children}
        </View>
    )
}

export default RowInformation

const styles = StyleSheet.create({})
