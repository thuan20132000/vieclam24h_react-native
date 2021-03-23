import React, { useRef, useEffect, useState } from 'react'
import { StyleSheet, Text, View, TextInput, ScrollView, ActivityIndicator, Alert } from 'react-native'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import CardCandidateItemBase from '../../components/Card/CardCandidateItem'
import CommonIcons from '../../constants/CommonIcons'
import { _searchCandidate } from '../../utils/serverApi'
import {useSelector} from 'react-redux'

import messaging from '@react-native-firebase/messaging'

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

    const [isLoading,setIsLoading] = useState(false);
    const _onGetDataSearch = async (value) => {
        setIsLoading(true);
        let searchRes = await _searchCandidate(userInformation.id,value);
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
        props.navigation.navigate('CandidateDetail',{
            candidate:candidate
        });
    }



    // On Receive Notifications
    useEffect(async () => {
        try {
            
           let x = await messaging().getToken();
            console.warn(x);
        } catch (error) {
            console.warn(error);
        }

        const unsubscribe = messaging().onMessage(async remoteMessage => {
          Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
        });
    
        return unsubscribe;
      }, []);
    



    return (
        <View>

            <View style={[styles.searchContainer]}>
                <View style={styles.inputSearch}>
                    <MaterialCommunityIcon
                        name={CommonIcons.search}
                        size={28}
                    />
                    <TextInput style={[styles.input, { marginLeft: 12, width: '78%', height: '100%' }]}
                        ref={_refSearchInput}
                        placeholder="Tìm kiếm..."
                        onChangeText={_onSearchJob}
                        value={searchQuery}

                    />
                    <MaterialCommunityIcon
                        name={CommonIcons.microphone}
                        size={22}
                        color={'grey'}
                        onPress={() => console.warn('sas')}
                    />
                </View>

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
                    searchData.map((e,index) =>
                    <CardCandidateItemBase 
                        key={index.toString()}
                        onDetailPress={()=>_onNavigateToCandidateDetail(e)}
                        address={`${e.location?.district} - ${e.location?.province}`}
                        descriptions={e.descriptions}
                        review_average={e?.review_overall?.review_level_avg}
                        review_number={e?.review_overall?.review_count}
                        name={e?.candidate_info?.username}
                        profile_image={e?.images[2]}
                    />
                    
                    )
                }
            </ScrollView>

            <Text></Text>
        </View>
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
    }
})
