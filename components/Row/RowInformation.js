import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

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
    iconStyle,
    rightIcon,
    rightIconStyle,
    rightIconSize,
    onItemPress
}) => {
    return (
        <Pressable style={[
            {
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 4,
                alignContent: 'center',

            },
            containerStyle

        ]}

        onPress={onItemPress}
        >
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
            {
                rightIcon &&
                <MaterialCommunityIcon
                    name={rightIcon || CommonIcons.chatMessage}
                    size={rightIconSize || 18}
                    color={iconColor || CommonColors.btnSubmit}
                    style={[
                        {
                            marginHorizontal: 6,
                            width: '10%'
                        },
                        rightIconStyle
                    ]}

                />

            }

            {children}
        </Pressable>
    )
}

export default RowInformation

const styles = StyleSheet.create({})
