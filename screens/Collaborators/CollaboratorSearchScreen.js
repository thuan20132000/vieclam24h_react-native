import React, { useRef, useEffect, useState } from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Caption, Divider, Subheading } from 'react-native-paper';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FilterBar from '../../components/Filter/FilterBar';
import CommonColors from '../../constants/CommonColors';
import CommonIcons from '../../constants/CommonIcons';
import { formatCash } from '../../utils/helper';
import { searchJobs } from '../../utils/serverApi';



const SearchItem = ({ title, occupation, onPressItem, item }) => {

    return (
        <>
            <TouchableOpacity style={{
                backgroundColor: CommonColors.accent,
                margin: 2,
                alignItems: 'center',
                padding: 8,
                display:'flex',
                flexDirection:'row',
                justifyContent:'space-between',
            
            }}
                onPress={onPressItem}
            >
                <View>
                    <Text style={{
                        color: 'black',
                        fontSize: 18,
                        fontWeight: '600'
                    }}>
                        {item?.attributes.name}
                    </Text>
                    <Text style={{
                        color: 'red'
                    }}>
                        Giá đưa ra: {formatCash(item?.attributes.suggestion_price || 0)} vnđ
                </Text>
                    <View style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <MaterialCommunityIcon
                            name={CommonIcons.mapMarker}
                            size={22}
                            color={CommonColors.btnSubmit}
                        />
                        <Text style={{
                            color: 'grey',
                            fontSize: 14,
                            marginLeft: 12
                        }}>
                            {item?.relationships?.location?.address}
                        </Text>
                    </View>
                </View>
                <MaterialCommunityIcon
                    name={CommonIcons.arrowRight}
                    size={24}
                    color={CommonColors.btnSubmit}
                />

            </TouchableOpacity>
        </>
    )
}

const CollaboratorSearchScreen = (props) => {

    const _refSearchInput = useRef();
    const [searchQuery, setSearchQuery] = React.useState('');
    const onChangeSearch = query => setSearchQuery(query);
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


    const _onGetDataSearch = async (value) => {
        let searchRes = await searchJobs(value, districtSearch);
        if (searchRes.status) {
            setSearchData(searchRes.data);
        }else{
            setSearchData([]);
        }
    }

    const _onNavigateToDetail = (item) => {
        props.navigation.navigate('JobDetail', { job_id: item.id });
    }


    useEffect(() => {
        _onGetDataSearch(searchQuery)
    }, [districtSearch])



    useEffect(() => {
        props.navigation.setOptions({
            title:"Tìm Kiếm Công Việc"
        })
    }, []);

    return (
        <View>
            <View style={styles.inputSearch}>
                <MaterialCommunityIcon
                    name={CommonIcons.search}
                    size={28}
                />
                <TextInput style={[styles.input, { marginLeft: 12, width: '100%', height: '100%' }]}
                    ref={_refSearchInput}
                    placeholder="Tìm kiếm công việc..."
                    onChangeText={_onSearchJob}
                    value={searchQuery}

                />
            </View>
            <FilterBar
                searchDistrict={districtSearch}
                setSearchDistrict={setDistrictSearch}
            />

            <ScrollView style={{ zIndex: -1 }}

            >
                {
                    searchData.length > 0 &&
                    searchData.map((e, index) =>
                        <SearchItem key={index.toString()}
                            item={e}
                            title={e.attributes.name}
                            occupation={e.occupation_name}
                            onPressItem={() => _onNavigateToDetail(e)}

                        />
                    )
                }
            </ScrollView>


        </View>
    )
}

export default CollaboratorSearchScreen

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

    }
})
