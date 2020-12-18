import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View,Image } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Subheading } from 'react-native-paper'
import HomeContent from '../../components/Body/HomeContent'
import CardHorizontal from '../../components/Card/CardHorizontal'
import CollaboratorCard from '../../components/Card/CollaboratorCard'
import MenuItem from '../../components/Menu/MenuItem'
import SearchButton from '../../components/Search/SearchButton'

import { getCategory, getCollaborator } from '../../utils/serverApi';

const CustomerHomeScreen = (props) => {

    const _onSearchPress = () => {
        props.navigation.navigate('Search');
    }

    const [isLoading, setIsLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [collaborators, setCollaborators] = useState([]);

    const _getCategory = async () => {
        setIsLoading(true);
        let data = await getCategory();
        if (data.data.length > 0) {
            setCategories(data.data);
        }
        setIsLoading(false);
    }

    const _getCollaborators = async () => {
        setIsLoading(true);
        let data = await getCollaborator();
        if (data.data.length > 0) {
            setCollaborators(data.data);
        }
        setIsLoading(false);
    }



    const _navigateToCollaboratorList = (e) => {
        props.navigation.navigate('CollaboratorList',{
            category:e
        });
    }




    useEffect(() => {
        _getCategory();
        _getCollaborators();


        props.navigation.setOptions({
            headerShown: true,
            header: () => (
                <View style={{ width: '100%', marginTop: 10, height: 70, display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', padding: 0 }}>
                    <Image
                        style={{ width: 80, height: 40 }}
                        source={{
                            uri: 'https://graphicsmount.com/wp-content/uploads/edd/2017/08/Job-Search-Logo-1-1180x843.jpg',
                        }}
                    />

                    <Text style={{ textAlign: 'center', fontSize: 18, fontWeight: '500', marginHorizontal: 22 }}>Viec Lam 24H</Text>
                </View>
            )
        })
    }, [])

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
                    categories.map((e, index) =>
                        <MenuItem
                            index={index}
                            item={e}
                            key={index.toString()}
                            navigation={props.navigation}
                            onItemPress={()=>_navigateToCollaboratorList(e)}
                        />
                    )
                }
            </View>

            {/* End Menu */}


            {/* Job List */}
            <View style={styles.vericleListContainer}>
                <Subheading style={{ paddingHorizontal: 12 }}>Ứng viên được đánh giá cao</Subheading>

                {
                    collaborators.map((e, index) =>
                        <CollaboratorCard
                            item={e}
                            key={index.toString()}
                            navigation={props.navigation}
                        />
                    )
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
