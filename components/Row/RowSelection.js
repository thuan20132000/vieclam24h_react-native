import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import CommonIcons from '../../constants/CommonIcons'

const RowSelection = ({
    label,
    leftIconName,
    rightIconName = CommonIcons.arrowRightChevron,
    iconSize = 22,
    itemPress,
    containerStyle,
    labelStyle
}) => {
    return (
        <TouchableOpacity
            onPress={itemPress}

            style={[
                styles.row,
                {
                    padding: 12,
                    marginVertical: 1
                },
                containerStyle
            ]}
        >
            {
                leftIconName &&
                <MaterialCommunityIcon
                    name={leftIconName}
                    size={iconSize}
                    style={{
                        width: '10%'
                    }}
                />
            }
            <Text style={[
                {
                    width: '80%',
                    color: 'white',
                    fontSize: 18
                },
                labelStyle
            ]}
            >
                {label}
            </Text>
            <MaterialCommunityIcon
                name={rightIconName}
                size={iconSize}
                style={{
                    width: '10%'

                }}
            />
        </TouchableOpacity>
    )
}

export default RowSelection

const styles = StyleSheet.create({
    row: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})
