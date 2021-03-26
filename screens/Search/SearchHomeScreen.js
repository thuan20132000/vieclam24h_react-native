import React, { useRef, useEffect, useState } from 'react'
import { StyleSheet, Text, View, TextInput, ScrollView, ActivityIndicator, Alert, TouchableOpacity, Image } from 'react-native'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import CardCandidateItemBase from '../../components/Card/CardCandidateItem'
import CommonIcons from '../../constants/CommonIcons'
import { _searchCandidate } from '../../utils/serverApi'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native';

import messaging from '@react-native-firebase/messaging';

import Voice from '@react-native-voice/voice';
import ModalRecording from '../../components/Modal/ModalRecording'
import CommonColors from '../../constants/CommonColors'



const SearchHomeScreen = (props) => {
    const _refSearchInput = useRef();
    const [searchQuery, setSearchQuery] = useState('');
    const onChangeSearch = query => setSearchQuery(query);
    const { userInformation } = useSelector(state => state.authentication);

    useEffect(() => {
        _refSearchInput.current.focus();
    }, [])

    const [searchData, setSearchData] = useState([]);

    const [districtSearch, setDistrictSearch] = useState('');

    const navigation = useNavigation();
    const [recordingModal, setRecordingModal] = useState(false);

    // Search debounce
    const typingTimeoutRef = useRef(null);
    const _onSearchJob = async (text) => {

        let value = text.toLowerCase();
        setSearchQuery(text);
        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        }
        typingTimeoutRef.current = setTimeout(() => {
            _onGetDataSearch(value);
        }, 600);

    }

    const [isLoading, setIsLoading] = useState(false);
    const _onGetDataSearch = async (value) => {
        setIsLoading(true);
        let searchRes = await _searchCandidate(userInformation.id, value);
        console.warn(searchRes);
        if (searchRes.status && searchRes.data) {
            setSearchData(searchRes.data?.data);
        } else {
            setSearchData([]);
        }
        setIsLoading(false);
    }



    const _onNavigateToCandidateDetail = (candidate) => {
        // console.warn(candidate);
        // return;
        props.navigation.navigate('CandidateDetail', {
            candidate: candidate
        });
    }


    useEffect(() => {

        messaging().getToken().then((token) => console.warn(token));

        messaging().onNotificationOpenedApp(remoteMsg => {
            navigation.navigate('Notification')
        });


    }, []);



    // Voice
    const [isRecording, setIsRecording] = useState(false);
    const _onSpeechStart = (e) => {
        console.log('On speech start ', e)

    }

    const _onSpeechEnd = async (e) => {
        console.log('On Speech End ', e);
        setTimeout(() => {
            setIsRecording(false);
        }, 1200);

    }

    const _onSpeechResult = (e) => {
        console.log('On speech results:  ', e);
        setSearchQuery(e.value[0]);
        setTimeout(() => {
            setIsRecording(false);
            _onSearchJob(e.value[0]);
        }, 1200);
    }




    useEffect(() => {
        Voice.onSpeechStart = _onSpeechStart.bind(this);
        Voice.onSpeechEnd = _onSpeechEnd.bind(this);
        Voice.onSpeechResults = _onSpeechResult.bind(this);
    }, []);




    const _onSpeechRecord = () => {
        try {
            setIsRecording(true);
            Voice.start('vi-VN');


        } catch (error) {
            console.log("ERROR : ", error);
        }
    }




    return (
        <>
            <View>

                <View style={[styles.searchContainer, { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }]}>
                    <View style={styles.inputSearch}>
                        <MaterialCommunityIcon
                            name={CommonIcons.search}
                            size={28}
                        />
                        <TextInput style={[styles.input, { marginLeft: 12, width: '68%', height: '100%' }]}
                            ref={_refSearchInput}
                            placeholder="Tìm kiếm..."
                            onChangeText={_onSearchJob}
                            value={searchQuery}

                        />
                        {
                            searchQuery.length > 0 &&
                            <MaterialCommunityIcon
                                name={CommonIcons.close}
                                size={22}
                                color={'black'}
                                onPress={() => setSearchQuery('')}

                                style={{
                                    // backgroundColor: 'red',
                                    width: 20,
                                    height: 20,
                                    right: -40
                                }}
                            />

                        }
                    </View>
                    <MaterialCommunityIcon
                        name={CommonIcons.microphone}
                        size={22}
                        color={isRecording ? 'red' : 'grey'}
                        onPress={_onSpeechRecord}

                        style={{
                            // backgroundColor: 'red',
                            width: 20,
                            height: 20,
                            marginHorizontal: 6
                        }}
                    />

                </View>

                {/* Search Results */}
                <ScrollView>
                    {
                        isLoading &&
                        <ActivityIndicator
                            size={'large'}
                            color={'coral'}
                        />
                    }
                    {
                        searchData &&
                        searchData.map((e, index) =>
                            <CardCandidateItemBase
                                key={index.toString()}
                                onDetailPress={() => _onNavigateToCandidateDetail(e)}
                                address={`${e.candidate_info?.location?.district} - ${e.candidate_info?.location?.province}`}
                                descriptions={e?.candidate_info?.descriptions}
                                review_average={e?.candidate_info?.review_overall?.review_level_avg}
                                review_number={e?.candidate_info?.review_overall?.review_count}
                                name={e?.username}
                                profile_image={e?.profile_image}
                            />

                        )
                    }
                </ScrollView>


                {
                    searchData.length <= 0 &&
                    <View style={[
                        styles.group,
                        {
                            borderWidth: 1,
                            borderColor: 'coral',
                            height: 100,
                            margin: 4,
                            padding: 6,
                            backgroundColor: CommonColors.secondary,
                            marginTop: 32
                        }
                    ]} >

                        <Text style={{ color: 'grey', fontWeight: '700' }}>Nên viết tiếng Việt có dấu.</Text>

                        <Text style={{ color: 'grey' }}>
                            Ví dụ: Thợ sửa nhôm kính, giao hàng, giúp việc,...
                        </Text>

                    </View>

                }


            </View>

            <ModalRecording
                isVisible={isRecording}
                transparent={true}


            >

                <Image
                    source={require(`../../utils/gift/recording.gif`)}
                    style={{
                        width: 180,
                        height: 180,
                    }}
                />



            </ModalRecording>

        </>
    )
}

export default SearchHomeScreen

const styles = StyleSheet.create({
    inputSearch: {
        display: 'flex',
        flexDirection: 'row',
        height: 38,
        alignItems: 'center',
        paddingLeft: 12,
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        borderRadius: 8,
        width: '90%',
        alignSelf: 'center',
        marginVertical: 8

    },
    searchContainer: {
        backgroundColor: 'coral',
        paddingVertical: 22
    },
    group: {
        marginVertical: 6,
        marginHorizontal: 4
    },
})
