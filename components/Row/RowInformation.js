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
    children
}) => {
    return (
        <View style={[
            {
                display:'flex',
                flexDirection:'row',
                alignItems:'center',
                marginVertical:4,
            },
            containerStyle

        ]}>
            <MaterialCommunityIcon
                name={iconName || CommonIcons.chatMessage}
                size={iconSize || 18}
                color={iconColor || CommonColors.btnSubmit}
                style={{
                    marginHorizontal:6
                }}
            />
            <Text
                style={
                    [
                        {
                            fontSize: 14,
                            color:'grey',
                            marginHorizontal:6

                        },
                        labelStyle
                    ]
                }
            >
                {label}
            </Text>
            <Text
                style={[
                    {
                        color:'black',
                        fontSize:14,
                        fontWeight:'700',
                    },
                    valueStyle
                ]}
            >
                {value}
            </Text>
            {children}
        </View>
    )
}

export default RowInformation

const styles = StyleSheet.create({})
