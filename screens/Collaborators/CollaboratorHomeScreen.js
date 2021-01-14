import React, { useState, useEffect, useLayoutEffect } from 'react'
import { StyleSheet, Text, View, TextInput, Image, RefreshControl } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { Subheading, Button } from 'react-native-paper'
import CardHorizontal from '../../components/Card/CardHorizontal'
import MenuItem from '../../components/Menu/MenuItem'
import SearchButton from '../../components/Search/SearchButton'

import { getCategory, getJobs } from '../../utils/serverApi';
import CommonColors from '../../constants/CommonColors'

import { useSelector } from 'react-redux';
import MultipleLanguage from '../../components/Dialog/MultipleLanguage'

import { Translate } from '../../locales/index';

const CollaboratorHomeScreen = (props) => {

    const menuItems = Array(6).fill({});
    const [categories, setCategories] = useState([]);
    const [jobs, setJobs] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [refreshing, setRefreshing] = React.useState(false);

    const { userInformation } = useSelector(state => state.authentication);
    const {
        navigation
    } = props;


    const language = useSelector(state => state.language);

    const _onSearchPress = () => {
        navigation.navigate('Search');
    }

    const _getCategory = async () => {
        setIsLoading(true);
        let data = await getCategory();
        if (data.data.length > 0) {
            setCategories(data.data);
        }
        setIsLoading(false);
    }

    const _getJobs = async () => {
        setIsLoading(true);
        setRefreshing(true);
        let data = await getJobs('', 8);
        if (data.data.length > 0) {
            setJobs(data.data);
        } else {
            setJobs([]);
        }
        setIsLoading(false);
        setRefreshing(false);
    }
    const _navigateToJobDetail = async (job_id) => {
        props.navigation.navigate('JobDetail', { job_id: job_id })
    }


    const _navigateToJobList = async (item) => {
        props.navigation.navigate('JobList', { category: item });
    }

    useLayoutEffect(() => {
        _getCategory();
        _getJobs();


        props.navigation.setOptions({
            headerShown: true,
            header: () => (
                <View
                    style={[
                        {
                            display: 'flex',
                            flexDirection: 'row',
                            width: '100%',
                            justifyContent: 'center'
                        }
                    ]}
                >
                    <View style={{ width: '80%', marginTop: 10, height: 70, display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', padding: 0 }}>
                        <Image
                            style={{ width: 80, height: 40 }}
                            source={{
                                uri: 'https://graphicsmount.com/wp-content/uploads/edd/2017/08/Job-Search-Logo-1-1180x843.jpg',
                            }}
                        />

                        <Text style={{ textAlign: 'center', fontSize: 18, fontWeight: '500', marginHorizontal: 22 }}>Viec Lam 24H</Text>
                    </View>
                    <TouchableOpacity
                        style={{
                            marginTop: 10, height: 70, display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', padding: 0
                        }}
                        onPress={() => setMultipleLanguageSelection(true)}
                    >

                        {
                            language.current_language == 'vi' ?
                            <Image
                                source={
                                    require('../../assets/images/vn_flag.png')
                                }
                                style={{
                                    width: 40,
                                    height: 20
                                }}
                            />:
                            <Image
                                source={
                                    require('../../assets/images/en_flag.png')
                                }
                                style={{
                                    width: 40,
                                    height: 20
                                }}
                            />
                        }



                    </TouchableOpacity>
                </View>
            ),

        })


    }, [language.current_language]);

    const [multipleLanguageSelection, setMultipleLanguageSelection] = useState(false);

    const onRefresh = React.useCallback(() => {
        _getCategory();
        _getJobs();



    }, []);


    return (
        <>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollView}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }

            >
                <SearchButton
                    onPress={_onSearchPress}
                    placeholderText={Translate.search}
                />
                {/* Menu */}


                <View style={styles.menuContainer}>
                    {categories &&
                        categories.map((e, index) =>
                            <MenuItem
                                image={e.image}
                                label={e.name}
                                {...props}
                                onItemPress={() => _navigateToJobList(e)}
                                key={index.toString()}
                                labelStyle={{
                                    fontSize: 11,
                                    fontWeight: '500',

                                }}
                                containerStyle={{
                                    width: 80
                                }}
                            />)
                    }
                </View>

                {/* End Menu */}

                {/* Job List */}
                <View style={styles.vericleListContainer}>
                    <Subheading style={{ paddingHorizontal: 12 }}>{Translate.new_jobs}</Subheading>

                    {
                        jobs &&
                        jobs.map((e, index) =>
                            <CardHorizontal
                                index={index}
                                item={e}
                                {...props}
                                key={index.toString()}
                                onPress={_navigateToJobDetail}
                            />
                        )
                    }
                </View>

            </ScrollView>

            <MultipleLanguage
                visible={multipleLanguageSelection}
                setVisible={setMultipleLanguageSelection}
            />
        </>
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
