import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const ErrorrSection = ({
    message
}) => {
    return (
        <View>
            <Text>{message}</Text>
        </View>
    )
}

export default ErrorrSection

const styles = StyleSheet.create({})
