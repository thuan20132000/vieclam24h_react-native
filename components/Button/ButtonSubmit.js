import React from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import CommonColors from '../../constants/CommonColors'

const ButtonSubmit = ({
    label,
    onItemPress,
    isLoading = false
}) => {
    return (
        <TouchableOpacity
            style={[
                styles.buttonContainer
            ]}
            disabled={isLoading}
            onPress={onItemPress}
        >
            {
                isLoading ?
                    <ActivityIndicator
                        color={'coral'}
                        size={'small'}
                    /> :
                    <Text
                        style={{
                            color: 'white',
                            fontWeight: '700',
                            textAlign: 'center',

                        }}
                    >
                        {label}
                    </Text>

            }
        </TouchableOpacity>
    )
}

export default ButtonSubmit

const styles = StyleSheet.create({
    buttonContainer: {
        padding: 12,
        backgroundColor: CommonColors.btnSubmit,
        borderRadius: 6,
        width: 120,
        marginVertical: 22
    }
})
