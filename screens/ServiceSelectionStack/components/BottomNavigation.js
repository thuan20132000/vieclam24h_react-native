import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import CommonColors from '../../../constants/CommonColors'

const BottomNavigation = ({
    onNextPress,
    onBackPress,
    disableNext = false,
    disableBack = false,
    nextTitle,
    backTitle,
    nextButtonStyle,
    childrenTop
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
            {childrenTop}
            {
                backTitle &&
                <TouchableOpacity
                    onPress={onBackPress}
                    disabled={disableBack}
                    style={[styles.button]}
                >
                    <Text style={[styles.buttonText]}>{backTitle}</Text>
                </TouchableOpacity>
            }

            {
                nextTitle &&
                <TouchableOpacity
                    onPress={onNextPress}
                    disabled={disableNext}
                    style={[styles.button,nextButtonStyle]}
                >
                    <Text style={[styles.buttonText]}>{nextTitle}</Text>
                </TouchableOpacity>

            }

        </View>
    )
}

export default BottomNavigation

const styles = StyleSheet.create({
    row: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    button: {
        backgroundColor: 'coral',
        padding: 6,
        paddingHorizontal: 22,
        borderRadius: 6
    },
    buttonText: {
        fontSize: 18,
        fontWeight: '700',
        color: 'white'
    }
})
