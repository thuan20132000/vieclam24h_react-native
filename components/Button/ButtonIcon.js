import React from 'react'
import { StyleSheet, Text, View,TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import CommonIcons from '../../constants/CommonIcons';

const ButtonIcon = ({
    containerStyle,
    title,
    iconName,
    onPress
}) => {
    return (
        <TouchableOpacity
            style={[containerStyle,styles.container]}
            onPress={onPress}
        >

            <MaterialCommunityIcon
                name={ iconName || CommonIcons.cameraplus}
                size={24}
                color={'coral'}
            />
            <Text style={[styles.text]}>
                {title}
            </Text>
        </TouchableOpacity>
    )
}

export default ButtonIcon

const styles = StyleSheet.create({
    container:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    },
    text:{
        fontWeight:'500',
        fontSize:14,
        fontWeight:'bold'
    }
})
