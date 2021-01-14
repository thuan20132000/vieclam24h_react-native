import React, { useState, useEffect, useRef } from 'react'
import { RefreshControl, StyleSheet, Text, View } from 'react-native'
import { FlatList, ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { ActivityIndicator } from 'react-native-paper';
import SimpleBottomSheet from '../components/BottomSheet/SimpleBottomSheet';
import CardHorizontal from '../components/Card/CardHorizontal';
import FilterBar from '../components/Filter/FilterBar';
import { RenderDistrict, RenderProvince, RenderSubDistrict } from '../components/Render/RenderSelection';

import { getJobs } from '../utils/serverApi';


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
    let { category } = props.route.params;

    const _getJobs = async () => {
        setIsLoading(true);

        let data = await getJobs(category.id, perPage, postnumber);
        if (data.data.length > 0) {
            setJobs(data.data);
        }
        setIsLoading(false);
    }

    const _navigateToJobDetail = async (job_id) => {
        props.navigation.navigate('JobDetail', { job_id: job_id })
    }


    const [selectedId, setSelectedId] = useState(null);

    let timeoutEvent;
    const _loadMoreJobs = async () => {
        setIsLoading(true);
        let postnumberIndex = postnumber + perPage;
        setPostnumber(postnumberIndex);
        let dataRes = await getJobs(category.id, perPage, postnumberIndex);
        if (dataRes.data?.length > 0) {
            timeoutEvent = setTimeout(() => {
                setJobs([...jobs, ...dataRes.data]);
                setIsLoading(false);

            }, 600);
        } else {
            setIsLoading(false);
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
    }, [filterData.district])


    return (
        <>
            <View>

            </View>

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
                        onPress={_navigateToJobDetail}
                    />
                )}
                keyExtractor={(item, index) => index.toString()}
                extraData={selectedId}
                onEndReachedThreshold={0.5}
                onEndReached={_loadMoreJobs}
                ListFooterComponent={
                    <ActivityIndicator
                        animating={isLoading}
                    />
                }
            />



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

export default JobListScreen

const styles = StyleSheet.create({})
