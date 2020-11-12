import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import HomeContent from '../components/Body/HomeContent'
import HomeMenu from '../components/Menu/HomeMenu'
import HomeSearch from '../components/Search/HomeSearch'

const HomeScreen = () => {
    return (
        <ScrollView>
            <HomeSearch/>
            <HomeMenu/>
            <HomeContent/>
        </ScrollView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({})
