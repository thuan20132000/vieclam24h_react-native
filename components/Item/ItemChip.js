import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { IconButton } from 'react-native-paper'
import CommonColors from '../../constants/CommonColors'
import CommonIcons from '../../constants/CommonIcons'

const ItemChip = ({
    label,
    labelStyle,
    close = true,
    containerStyle,
    onClose
}) => {
    return (
        <View
            style={[
                styles.container,
                containerStyle

            ]}
        >

            <Text style={[labelStyle]}>{label}</Text>
            {
                close &&

                <IconButton
                    icon={CommonIcons.close}
                    color={CommonColors.primary}
                    size={20}
                    onPress={onClose}
                />
            }
        </View>
    )
}

export default ItemChip

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        paddingLeft: 12,
        flexDirection: 'row',
        alignItems: 'center',
        width: 'auto',
        height: 30,
        borderRadius: 18,
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        margin: 6
    }
})
