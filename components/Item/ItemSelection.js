import React from 'react'
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import CommonIcons from '../../constants/CommonIcons'

const ItemSelection = ({
    label,
    labelStyle,
    rightIcon,
    rightIconColor,
    rightIconSize,
    containerStyle,
    onItemPress

}) => {
    return (
        <TouchableOpacity
            style={[
                styles.container,
                containerStyle
            ]}
            onPress={onItemPress}
        >
            
            <Text
                style={[
                    styles.defaultLabel,
                    labelStyle
                ]}
            >
                {label || "Add Label"}
            </Text>
            
            <MaterialCommunityIcons
                name={rightIcon || CommonIcons.arrowRightChevron}
                color={rightIconColor || 'black'}
                size={rightIconSize || 24}
            />


        </TouchableOpacity>
    )
}

export default ItemSelection

const styles = StyleSheet.create({
    container:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    },
    defaultLabel:{

    }
})
