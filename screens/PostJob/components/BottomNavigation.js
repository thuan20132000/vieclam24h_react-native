import React from 'react'
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import CommonColors from '../../../constants/CommonColors'

const BottomNavigation = ({
    onNextPress,
    onBackPress,
    disableNext=false,
    disableBack=false
}) => {
    return (
        <View
            style={
                [
                    {
                        backgroundColor: CommonColors.secondary,
                        padding: 12
                    },
                    styles.row
                ]
            }
        >
            <TouchableOpacity
                onPress={onBackPress}
                disabled={disableBack}
            >
                <Text>Trở lại</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={onNextPress}
                disabled={disableNext}
            >
                <Text>Tiếp tục</Text>
            </TouchableOpacity>
        </View>
    )
}

export default BottomNavigation

const styles = StyleSheet.create({
    row:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-around'
    }
})
