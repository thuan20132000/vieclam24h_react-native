import React from 'react'
import { StyleSheet, Text, View,Image } from 'react-native'

const LoadingSimple = () => {
    return (
        <View
            style={{
                width:200,
                height:50
            }}
        >
            <Image 
                source={
                    require('../../assets/images/loading2.gif')
                }
                style={{
                    width:'100%',
                    height:'100%'
                }}
            />
        </View>
    )
}

export default LoadingSimple

const styles = StyleSheet.create({})
