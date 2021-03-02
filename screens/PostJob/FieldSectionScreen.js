import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import CommonColors from '../../constants/CommonColors'
import BottomNavigation from './components/BottomNavigation'

const FieldSectionScreen = (props) => {
    return (
        <View
            style={{
                display:'flex',
                flex:1,
                backgroundColor:CommonColors.primary,
                justifyContent:'space-between'
            }}
        >
            <Text>Select Field</Text>

            <BottomNavigation
                onBackPress={()=>props.navigation.navigate('CategorySection')}
            />
        </View>
    )
}

export default FieldSectionScreen

const styles = StyleSheet.create({})
