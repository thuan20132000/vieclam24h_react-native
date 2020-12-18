import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import CommonColors from '../../constants/CommonColors'

const TagSimple = (
    {containerStyle,
    textStyle,
    iconColor = 'red',
    iconSize = 16,
    iconName,
    label='label'}
) => {
    return (
        <View style={[styles.container,containerStyle]}>
            {
                iconName &&
                <MaterialCommunityIcons
                    name={iconName}
                    size={iconSize}
                    color={iconColor}
                />
            }

            <Text style={[styles.p3,textStyle]}>
               {label}
            </Text>
        </View>
    )
}

export default TagSimple

const styles = StyleSheet.create({
    p3: {
        fontSize: 13,
        marginHorizontal: 4,
    },
    container: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor:CommonColors.primary
    }
})
