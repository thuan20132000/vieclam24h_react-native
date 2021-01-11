import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import CommonIcons from '../../constants/CommonIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { IconButton } from 'react-native-paper'


const ItemSelectionChecbox = ({
    label,
    labelStyle,
    rightIcon,
    rightIconColor,
    rightIconSize,
    containerStyle,
    onItemPress,
    isChecked = false
}) => {
    return (
        <View
            style={[
                styles.container,
                containerStyle,

            ]}
        >

            <Text
                style={[
                    styles.defaultLabel,
                    labelStyle
                ]}
            >
                {label || "Add Label"}
            </Text>

            {
                !isChecked ?

                    <IconButton
                        icon={CommonIcons.checkboxCircleBlank}
                        color={'coral'}
                        size={22}
                        onPress={onItemPress}
                    /> :
                    <IconButton
                        icon={CommonIcons.checkboxCircleMark}
                        color={'coral'}
                        size={26}
                        onPress={onItemPress}
                    />

            }


        </View>
    )
}

export default ItemSelectionChecbox

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
})
