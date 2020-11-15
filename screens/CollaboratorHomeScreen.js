import React from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { Subheading, Button } from 'react-native-paper'
import HomeContent from '../components/Body/HomeContent'
import CardHorizontal from '../components/Card/CardHorizontal'
import FilterMenu from '../components/Filter/FilterMenu'
import HomeMenu from '../components/Menu/HomeMenu'
import MenuItem from '../components/Menu/MenuItem'
import HomeSearch from '../components/Search/HomeSearch'
import CommonIcons from '../constants/CommonIcons'
import SearchButton from '../components/Search/SearchButton'


const CollaboratorHomeScreen = (props) => {

    const menuItems = Array(6).fill({});

    const {
        navigation
    } = props;


    const _onSearchPress = () => {
        navigation.navigate('Search');
    }

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
        >
            <SearchButton
                onPress={_onSearchPress}
            />
            {/* Menu */}


            <View style={styles.menuContainer}>
                {
                    menuItems.map((e, index) => <MenuItem index={index} />)
                }
            </View>

            {/* End Menu */}
            <HomeContent {...props} />

            {/* Job List */}
            <View style={styles.vericleListContainer}>
                <Subheading style={{ paddingHorizontal: 12 }}>Việc làm vừa đăng</Subheading>

                {
                    menuItems.map((e, index) => <CardHorizontal />)
                }
            </View>

        </ScrollView>
    )
}

export default CollaboratorHomeScreen

const styles = StyleSheet.create({
    menuContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        margin: 12,
        padding: 6,
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,

    },
    vericleListContainer: {
        marginTop: 22,

    }
})
