import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Subheading } from 'react-native-paper'
import HomeContent from '../components/Body/HomeContent'
import CardHorizontal from '../components/Card/CardHorizontal'
import MenuItem from '../components/Menu/MenuItem'
import SearchButton from '../components/Search/SearchButton'

const CustomerHomeScreen = (props) => {

    const _onSearchPress = () => {

    }

    const menuItems = Array(6).fill({});

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
            

            {/* Job List */}
            <View style={styles.vericleListContainer}>
                <Subheading style={{ paddingHorizontal: 12 }}>Ứng viên được đánh giá cao</Subheading>

                {
                    menuItems.map((e, index) => <CardHorizontal />)
                }
            </View>

        </ScrollView>
    )
}

export default CustomerHomeScreen

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
