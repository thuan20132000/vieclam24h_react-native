import React, { useState, useEffect, useRef } from 'react'
import { RefreshControl, StyleSheet, Text, View, FlatList, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native'
import SimpleBottomSheet from '../components/BottomSheet/SimpleBottomSheet';
import CardHorizontal from '../components/Card/CardHorizontal';
import FilterBar from '../components/Filter/FilterBar';
import { RenderDistrict, RenderProvince, RenderSubDistrict } from '../components/Render/RenderSelection';

import { getJobs, getJobsByCategory } from '../utils/serverApi';


const ButtonItem = ({
    label,
    onItemPress,
    containerStyle,
    labelStyle
}) => {
    return (
        <TouchableOpacity
            onPress={onItemPress}
            style={[
                containerStyle,
                {
                    backgroundColor: 'coral',
                    borderRadius: 12,
                    margin: 6,
                    paddingHorizontal: 12,
                    paddingVertical: 8
                }
            ]}
        >
            <Text
                style={[
                    labelStyle,
                    {
                        fontSize: 12,
                        fontWeight: '600',
                        color: 'white'
                    }
                ]}
            >
                {label || "Press"}
            </Text>
        </TouchableOpacity>
    )
}


const JobListScreen = (props) => {

    const _refSimpleBottomSheet = useRef();

    const [jobs, setJobs] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [perPage, setPerPage] = useState(6);
    const [postnumber, setPostnumber] = useState(0);
    const [nextPage, setNextPage] = useState(null);
    const [isLoadMore, setIsLoadMore] = useState(false);
    let { category } = props.route.params;

    const _getJobs = async () => {
        setIsLoading(true);

        let data = await getJobsByCategory(category.slug);
        if (data.data.length > 0) {
            setJobs(data.data);
            setNextPage(data.next);
        }
        setIsLoading(false);
    }

    const _navigateToJobDetail = async (job) => {
        if (!job) {
            return;
        }
        props.navigation.navigate('JobDetail', { job_id: job?.id })
    }


    const [selectedId, setSelectedId] = useState(null);

    let timeoutEvent;
    const _loadMoreJobs = async () => {
        setIsLoadMore(true);


        if (nextPage) {
            let dataFetch = await fetch(nextPage);
            if (!dataFetch.ok) {
                return;
            }
            let dataRes = await dataFetch.json();

            if (dataRes.data?.length > 0) {
                timeoutEvent = setTimeout(() => {
                    setJobs([...jobs, ...dataRes.data]);
                    setNextPage(dataRes.next);
                    setIsLoadMore(false);


                }, 300);
            }
        }else{
            setIsLoadMore(false);
        }

    }

    useEffect(() => {
        _getJobs();
        props.navigation.dangerouslyGetParent().setOptions({
            tabBarVisible: false
        });

        props.navigation.setOptions({
            title: `${category.name}`
        })

        return () => {
            props.navigation.dangerouslyGetParent().setOptions({
                tabBarVisible: true
            });
            clearTimeout(timeoutEvent);
        }
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
            district: ''
        })
    }, [filterData.province]);


    useEffect(() => {
        setFilterData({
            ...filterData,
            subdistrict: ''
        })
    }, [filterData.district]);



    if (isLoading) {
        return (
            <View
                style={{
                    display: 'flex',
                    flex: 1,
                    backgroundColor: 'white',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <ActivityIndicator
                    size={'large'}
                    color={'coral'}

                />
            </View>
        )
    }


    return (
        <>


            {/* Filter */}
            <View

            >
                <ScrollView

                    horizontal={true}

                    style={[
                        {
                            backgroundColor: "white"
                        }
                    ]}
                >
                    <ButtonItem

                        onItemPress={() => _onOpenSimpleBottomSheet('province')}
                        label={filterData.province?.name || `Tỉnh/thành phố`}

                    />
                    <ButtonItem

                        onItemPress={() => _onOpenSimpleBottomSheet('district')}
                        label={filterData.district?.name || `Quận/huyện`}

                    />
                    <ButtonItem

                        onItemPress={() => _onOpenSimpleBottomSheet('subdistrict')}
                        label={filterData.subdistrict?.name || `Phường/xã`}

                    />

                </ScrollView>
            </View>


            {/* List */}
            <FlatList style={{ flex: 1, zIndex: -1 }}
                showsVerticalScrollIndicator={false}

                data={jobs}
                renderItem={({ item, index }) => (
                    <CardHorizontal
                        {...props}
                        item={item}
                        key={index.toString()}
                        index={index}
                        onPress={() => _navigateToJobDetail(item)}
                    />
                )}
                keyExtractor={(item, index) => index.toString()}
                extraData={selectedId}
                onEndReachedThreshold={0.6}
                onEndReached={_loadMoreJobs}
                ListFooterComponent={
                    <ActivityIndicator
                        animating={isLoadMore}
                        color={'coral'}
                        size={'large'}
                    />
                }
            />



            {/* BottomSheet */}
            <SimpleBottomSheet
                refRBSheet={_refSimpleBottomSheet}
                height={800}
                dragFromTopOnly={true}
                closeOnPressMask={true}
                containerStyle={{
                    borderTopRightRadius: 22,
                    borderTopLeftRadius: 22
                }}

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

export default JobListScreen

const styles = StyleSheet.create({})
