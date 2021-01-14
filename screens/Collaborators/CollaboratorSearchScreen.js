import React, { useRef, useEffect, useState } from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Caption, Divider, Subheading } from 'react-native-paper';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleBottomSheet from '../../components/BottomSheet/SimpleBottomSheet';
import FilterBar from '../../components/Filter/FilterBar';
import { RenderDistrict, RenderProvince, RenderSubDistrict } from '../../components/Render/RenderSelection';
import CommonColors from '../../constants/CommonColors';
import CommonIcons from '../../constants/CommonIcons';
import { Translate } from '../../locales';
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
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',

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
    const _refSimpleBottomSheet = useRef();



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
        } else {
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
            title: "Tìm Kiếm Công Việc"
        })
    }, []);



    const [filterData, setFilterData] = useState({
        province: '',
        district: '',
        subdistrict: ''
    });

    const [selectedProvince, setSelecedProvince] = useState();
    const _onSelectProvince = (province) => {
        setFilterData({
            ...filterData,
            province: province
        });

        _refSimpleBottomSheet.current.close();
    }

    const [selectedDistrict, setSelectedDistrict] = useState();
    const _onSelectDistrict = (district) => {
        setFilterData({
            ...filterData,
            district: district
        });

        _refSimpleBottomSheet.current.close();
    }

    const [selectedSubDistrict, setSelectedSubDistrict] = useState();
    const _onSelectSubDistrict = (subdistrict) => {
        setFilterData({
            ...filterData,
            subdistrict: subdistrict
        });

        _refSimpleBottomSheet.current.close();
    }

    const [filterType, setFilterType] = useState();
    const _onOpenSimpleBottomSheet = (type) => {
        setFilterType(type);

        _refSimpleBottomSheet.current.open();
    }


    useEffect(() => {
        setFilterData({
            ...filterData,
            district:''
        })
    }, [filterData.province]);


    useEffect(() => {
        setFilterData({
            ...filterData,
            subdistrict:''
        })
    }, [filterData.district])

    return (
        <>
            <View style={styles.inputSearch}>
                <MaterialCommunityIcon
                    name={CommonIcons.search}
                    size={28}
                />
                <TextInput style={[styles.input, { marginLeft: 12, width: '100%', height: '100%' }]}
                    ref={_refSearchInput}
                    placeholder={Translate.search}
                    onChangeText={_onSearchJob}
                    value={searchQuery}

                />
            </View>
            {/* <FilterBar
                searchDistrict={districtSearch}
                setSearchDistrict={setDistrictSearch}
            /> */}

            <View>
                <ScrollView
                    horizontal={true}
                    style={{
                        marginVertical: 6
                    }}

                    showsHorizontalScrollIndicator={false}
                >
                    <TouchableOpacity
                        style={[
                            styles.chipFilter
                        ]}

                        onPress={() => _onOpenSimpleBottomSheet('province')}
                    >
                        <Text
                            style={{
                                color: 'white',
                                fontWeight: '600'
                            }}
                        >
                            {filterData.province ? filterData.province?.name : 'Tỉnh/thành phố'}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            styles.chipFilter
                        ]}

                        onPress={() => _onOpenSimpleBottomSheet('district')}
                    >
                        <Text
                            style={{
                                color: 'white',
                                fontWeight: '600'
                            }}
                        >
                            {filterData.district ? filterData.district?.name : 'Quận/huyện'}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            styles.chipFilter
                        ]}

                        onPress={() => _onOpenSimpleBottomSheet('subdistrict')}
                    >
                        <Text
                            style={{
                                color: 'white',
                                fontWeight: '600'
                            }}
                        >
                            {filterData.subdistrict ? filterData.subdistrict?.name : 'Phường/Xã'}
                        </Text>
                    </TouchableOpacity>

                </ScrollView>
            </View>

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



            {/* BottomSheet */}
            <SimpleBottomSheet
                refRBSheet={_refSimpleBottomSheet}
                height={420}
                dragFromTopOnly={true}
                closeOnPressMask={true}

            >

                {
                    filterType == 'province' &&
                    <RenderProvince
                        setSelectedItem={(e) => _onSelectProvince(e)}
                    />
                }

                {
                    filterType == 'district' &&
                    <RenderDistrict
                        province_code={filterData.province?.code}
                        setSelectedItem={(e) => _onSelectDistrict(e)}
                    />
                }

                {
                    filterType == 'subdistrict' &&
                    <RenderSubDistrict
                        district_code={filterData.district?.code}
                        setSelectedItem={(e) => _onSelectSubDistrict(e)}


                    />
                }
            </SimpleBottomSheet>
        </>
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

    },
    chipFilter: {
        margin: 8,
        backgroundColor: 'rgba(234, 151, 56, 0.85)',
        padding: 4,
        paddingHorizontal: 18,
        borderRadius: 12,
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
