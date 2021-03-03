import React from 'react'
import { StyleSheet, Text, View,ScrollView } from 'react-native'
import BottomNavigation from './components/BottomNavigation'

const PriceSectionScreen = (props) => {
    return (
        <View
            style={[styles.container]}
        >
            <Text>Select Price</Text>
            <ScrollView>

            </ScrollView>
            <BottomNavigation
                onBackPress={()=>props.navigation.goBack()}
                // onNextPress={()=>props.navigation.navigate('')}
            />
        </View>
    )
}

export default PriceSectionScreen

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        backgroundColor: 'white',


    }
})
