import React, { useState, useEffect, useRef } from 'react'
import { StyleSheet, Text, View, FlatList, Dimensions } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { ActivityIndicator } from 'react-native-paper'
import SimpleBottomSheet from '../../components/BottomSheet/SimpleBottomSheet'
import CollaboratorCard from '../../components/Card/CollaboratorCard'
import FilterBar from '../../components/Filter/FilterBar'
import LoadingSimple from '../../components/Loading/LoadingSimple'
import { RenderDistrict, RenderOccupations, RenderProvince, RenderSubDistrict } from '../../components/Render/RenderSelection'
import { getCollaboratorByCategory } from '../../utils/serverApi'
import SkeletonPlaceholder from "react-native-skeleton-placeholder";




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



const CollaboratorListScreen = (props) => {
    const [isLoading, setIsLoading] = useState(false);

    const [collaborators, setCollaborators] = useState([]);
    const _refSimpleBottomSheet = useRef();

    const { category } = props.route.params;

    useEffect(() => {
        _onGetCollaboratorByCategory();

        props.navigation.setOptions({
            title: `Ứng Viên ${category.name} `,
            headerTitleStyle: {
                fontSize: 14
            },
        })


        props.navigation.dangerouslyGetParent().setOptions({
            tabBarVisible: false
        });

        return () => {
            props.navigation.dangerouslyGetParent().setOptions({
                tabBarVisible: true
            });

        }



    }, []);



    const [postnumber, setPostnumber] = useState(0);
    const [perpage, setPerpage] = useState(8);

    const _onGetCollaboratorByCategory = async () => {
        setIsLoading(true);
        let dataRes = await getCollaboratorByCategory(category.id, perpage, postnumber);

        if (dataRes.data.data.length > 0) {
            setCollaborators(dataRes.data.data);
        }
        setIsLoading(false);
    }



    const [isLoadMore, setIsLoadmore] = useState(false);
    const _onLoadMore = async () => {
        setIsLoadmore(true);

        let postnumberIndex = postnumber + perpage;
        setPostnumber(postnumberIndex);
        let dataRes = await getCollaboratorByCategory(category.id, perpage, postnumberIndex);

        if (dataRes.data?.data?.length > 0) {
            setTimeout(() => {
                setCollaborators([...collaborators, ...dataRes.data.data]);
                setIsLoadmore(false);

            }, 1200);
        } else {
            setIsLoadmore(false);

        }

    }



    const [filterData, setFilterData] = useState({
        province: '',
        district: '',
        subdistrict: '',
        occupation: '',
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

    const [selectedOccupation, setSelectedOccupation] = useState();
    const _onSelectOccupation = (occupation) => {
        setFilterData({
            ...filterData,
            occupation: occupation
        });
        console.warn(occupation);

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





    // if (isLoading) {
    //     return (
    //         <ScrollView>
    //             {
    //                 Array(10).fill({}).map((e, index) =>

    //                     <SkeletonPlaceholder>
    //                         <View style={[
    //                             styles.cardContainer
    //                         ]}>
    //                             <View style={{ width: 60, height: 60, borderRadius: 50 }} />
    //                             <View style={{ marginLeft: 20 }}>
    //                                 <View style={{ width: 120, height: 20, borderRadius: 4 }} />
    //                                 <View
    //                                     style={{ marginTop: 6, width: 80, height: 20, borderRadius: 4 }}
    //                                 />
    //                             </View>
    //                         </View>
    //                     </SkeletonPlaceholder>
    //                 )
    //             }
    //         </ScrollView>
    //     )
    // }





    return (
        <>
            <View>
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}

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

                    <ButtonItem

                        onItemPress={() => _onOpenSimpleBottomSheet('occupation')}
                        label={filterData.occupation?.attributes?.name || `Lĩnh vực`}
                    />
                </ScrollView>
            </View>

            {
                isLoading &&
                <ScrollView>
                {
                    Array(10).fill({}).map((e, index) =>

                        <SkeletonPlaceholder>
                            <View style={[
                                styles.cardContainer
                            ]}>
                                <View style={{ width: 60, height: 60, borderRadius: 50 }} />
                                <View style={{ marginLeft: 20 }}>
                                    <View style={{ width: 120, height: 20, borderRadius: 4 }} />
                                    <View
                                        style={{ marginTop: 6, width: 80, height: 20, borderRadius: 4 }}
                                    />
                                </View>
                            </View>
                        </SkeletonPlaceholder>
                    )
                }
            </ScrollView>
            }
            <View style={{
                display: 'flex',
                flex: 1,
                paddingTop: 10
            }}>
                {
                    collaborators.length > 0 &&
                    <FlatList style={{ flex: 1, zIndex: -1 }}
                        showsVerticalScrollIndicator={true}
                        data={collaborators}
                        renderItem={({ item, index }) => (
                            <CollaboratorCard
                                item={item}
                                navigation={props.navigation}
                            />
                        )}
                        keyExtractor={(item, index) => index.toString()}
                        ListFooterComponent={
                            <ActivityIndicator
                                size={'small'}
                                color={'red'}
                                animating={isLoadMore ? true : false}
                            />
                        }
                        onEndReachedThreshold={0.2}
                        onEndReached={_onLoadMore}
                    />


                }
            </View>


            {/* BottomSheet */}
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

                {
                    filterType == 'occupation' &&
                    <RenderOccupations
                        onItemPress={(e) => _onSelectOccupation(e)}
                    />
                }


            </SimpleBottomSheet>
        </>
    )
}

const deviceWidth = Dimensions.get('screen').width;
const deviceHeight = Dimensions.get('screen').height;

export default CollaboratorListScreen

const styles = StyleSheet.create({

    cardContainer: {
        marginHorizontal: 12,
        marginBottom: 8,
        display: 'flex',
        flexDirection: 'column',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        backgroundColor: 'white',
        padding: 6,
        borderRadius: 22


    },
})
