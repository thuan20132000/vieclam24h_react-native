import React, { useState, useEffect, useRef } from 'react'
import { StyleSheet, Text, View, Image, RefreshControl, Dimensions } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { Subheading } from 'react-native-paper'
import { useSelector } from 'react-redux'
import HomeContent from '../../components/Body/HomeContent'
import CardHorizontal from '../../components/Card/CardHorizontal'
import CollaboratorCard from '../../components/Card/CollaboratorCard'
import MenuItem from '../../components/Menu/MenuItem'
import SearchButton from '../../components/Search/SearchButton'
import Carousel from 'react-native-snap-carousel';

import { getCategory, getCollaborator, getCollaboratorsByDistrict, getCollaboratorsTopRating } from '../../utils/serverApi';
import { Translate } from '../../locales'
import MultipleLanguage from '../../components/Dialog/MultipleLanguage'




const RenderHeader = ({
    language,
    setMultipleLanguageSelection
}) => {
    return (
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
                        /> :
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
    )
}


const CustomerHomeScreen = (props) => {

    const _onSearchPress = () => {
        props.navigation.navigate('Search');
    }
    const refCarousel = useRef('carousel');
    const language = useSelector(state => state.language);

    const { userInformation } = useSelector(state => state.authentication);
    const [isLoading, setIsLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [collaborators, setCollaborators] = useState([]);
    const [multipleLanguageSelection, setMultipleLanguageSelection] = useState(false);


    const [collaboratorsByDistrict, setCollaboratorsByDistrict] = useState([]);
    const [collaboratorsTopRating, setCollaboratorsTopRating] = useState([]);


    const _getCategory = async () => {
        setIsLoading(true);
        let data = await getCategory();
        if (data.data.length > 0) {
            setCategories(data.data);
        }
        setIsLoading(false);
    }
    const _navigateToCollaboratorList = (e) => {
        props.navigation.navigate('CollaboratorList', {
            category: e
        });
    }

    const _getCollaborators = async () => {
        setIsLoading(true);
        let dataRes = await getCollaborator();


        if (dataRes.data?.data?.length > 0) {
            setCollaborators(dataRes.data?.data);
        } else {
            setCollaborators([]);
        }
        setIsLoading(false);
    }

    const _onGetCollaboratorByTopRating = async () => {

        let dataRes = await getCollaboratorsTopRating();
        if (dataRes?.data.status == true) {
            setCollaboratorsTopRating(dataRes?.data.data);
        } else {
            setCollaboratorsTopRating([]);
        }
    }


    const _onGetCollaboratorsByDistrict = async () => {

        let dataRes = await getCollaboratorsByDistrict(userInformation.attributes?.district, 10, 0);
        if (dataRes?.data.data.length > 0) {
            setCollaboratorsByDistrict(dataRes?.data.data);
        } else {
            setCollaboratorsByDistrict([]);
        }
    }






    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        _getCategory();
        _getCollaborators();

    }, []);



    useEffect(() => {
        _getCategory();
        _getCollaborators();

        _onGetCollaboratorsByDistrict();
        _onGetCollaboratorByTopRating();


        props.navigation.setOptions({
            headerShown: true,
            header: ()  =><RenderHeader language={language} setMultipleLanguageSelection={setMultipleLanguageSelection} />,
        })
    }, [language]);




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
                    {
                        categories.map((e, index) =>
                            <MenuItem
                                index={index}

                                key={index.toString()}
                                navigation={props.navigation}
                                onItemPress={() => _navigateToCollaboratorList(e)}
                                label={e.name}
                                image={e.image}
                                labelStyle={{
                                    fontSize: 11,
                                    fontWeight: '500',

                                }}
                                containerStyle={{
                                    width: 80
                                }}

                            />
                        )
                    }
                </View>

                {/* End Menu */}

                <View style={[]}>
                    <Text style={[styles.textTitle]}>
                        Ứng viên được đánh giá cao
                </Text>

                    <Carousel
                        ref={refCarousel}
                        data={collaboratorsTopRating}
                        renderItem={({ item }) =>
                            <CollaboratorCard
                                item={item}
                                navigation={props.navigation}
                                avatarSize={64}
                                containerStyle={{
                                    minHeight: 180
                                }}
                            />
                        }
                        sliderWidth={deviceWidth}
                        itemWidth={deviceWidth}
                        layout={'tinder'}
                    />


                </View>


                {/* Job List */}
                <View style={styles.vericleListContainer}>
                    <Text style={[styles.textTitle]}>
                        Ứng viên cần việc làm gần bạn
                </Text>

                    {
                        collaboratorsByDistrict.map((e, index) =>
                            <CollaboratorCard
                                item={e}
                                key={index.toString()}
                                avatarSize={44}
                                navigation={props.navigation}
                            />
                        )
                    }
                </View>


            </ScrollView>


            {/* Multiple Language */}
            <MultipleLanguage
                visible={multipleLanguageSelection}
                setVisible={setMultipleLanguageSelection}
            />
        </>
    )
}

const deviceWidth = Dimensions.get('screen').width;
const deviceHeight = Dimensions.get('screen').height;

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
        marginTop: 12,

    },
    textTitle: {
        fontSize: 18,
        fontWeight: '500',
        marginHorizontal: 12,
        marginVertical: 12,
        color: "grey"
    },
    row: {
        display: 'flex',
        flexDirection: 'row',

    },
    column: {
        display: 'flex',
        flexDirection: 'column'
    }
})
