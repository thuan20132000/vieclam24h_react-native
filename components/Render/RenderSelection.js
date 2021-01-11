import React, { useEffect, useState } from 'react'
import { Alert, Dimensions, StyleSheet, Text, View } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import ItemSelection from '../Item/ItemSelection';
import ItemSelectionChecbox from '../Item/ItemSelectionChecbox'

import { getProvince, getDistrict, getSubdistrict } from '../../utils/locationApi';
import LoadingSimple from '../Loading/LoadingSimple';
import { ActivityIndicator } from 'react-native-paper';
import { getOccupations } from '../../utils/serverApi';
import CommonIcons from '../../constants/CommonIcons';
import CommonColors from '../../constants/CommonColors';
import ItemChip from '../Item/ItemChip';



const styles = StyleSheet.create({
    selectionStyle: {
        paddingHorizontal: 8,
        paddingVertical: 14,
        borderBottomColor: 'grey',
        borderBottomWidth: 0.2,
    },
    selectionLabelStyle: {
        fontSize: 18,
        color: 'grey',
        fontWeight: '500'
    }
});

const deviceWidth = Dimensions.get('screen').width;
const deviceHeight = Dimensions.get('screen').height;


export const RenderProvince = ({
    setSelectedItem
}) => {

    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {

            const dataRes = await getProvince();
            if (dataRes.status) {
                setTimeout(() => {

                    setData(Object.values(dataRes.data));
                }, 800);

            }


        }
        fetchData();

    }, []);


    const selectItem = (e) => {
        if (typeof (setSelectedItem) != 'function') {
            return;
        }

        setSelectedItem(e);
    }


    if (data.length <= 0) {
        return (
            <View
                style={{
                    display: 'flex',
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignContent: 'center',

                }}
            >
                <LoadingSimple />

            </View>

        )
    }


    return (
        <ScrollView>
            {
                data.length > 0 &&
                data.map((e, index) =>
                    <ItemSelection
                        key={index.toString()}
                        label={e.name_with_type}
                        containerStyle={styles.selectionStyle}
                        labelStyle={styles.selectionLabelStyle}
                        onItemPress={() => selectItem(e)}
                    />
                )
            }
        </ScrollView>
    )
}


export const RenderDistrict = ({
    setSelectedItem,
    province_code
}) => {

    const [data, setData] = useState([]);

    useEffect(() => {
        let unmounted;

        const fetchData = async () => {

            const dataRes = await getDistrict(province_code);
            if (dataRes.status) {
                unmounted = setTimeout(() => {

                    setData(Object.values(dataRes.data));
                }, 800);

            }


        }
        fetchData();

        return () => {
            clearTimeout(unmounted)
        }

    }, []);


    const selectItem = (e) => {
        if (typeof (setSelectedItem) != 'function') {
            return;
        }

        setSelectedItem(e);
    }

    if (!province_code) {
        return (
            <View
                style={{
                    display: 'flex',
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignContent: 'center',

                }}
            >
                <LoadingSimple />
                <Text>Vui lòng chọn tỉnh thành</Text>
            </View>

        )
    }

    if (data.length <= 0) {
        return (
            <View
                style={{
                    display: 'flex',
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignContent: 'center',

                }}
            >
                <LoadingSimple />

            </View>

        )
    }


    return (
        <ScrollView>
            {
                data.length > 0 &&
                data.map((e, index) =>
                    <ItemSelection
                        key={index.toString()}
                        label={e.name_with_type}
                        containerStyle={styles.selectionStyle}
                        labelStyle={styles.selectionLabelStyle}
                        onItemPress={() => selectItem(e)}
                    />
                )
            }
        </ScrollView>
    )
}




/**
 * 
 * @param {*} param0 
 */
export const RenderSubDistrict = ({
    setSelectedItem,
    district_code
}) => {

    if (!district_code) {
        return (
            <View
                style={{
                    display: 'flex',
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignContent: 'center',

                }}
            >
                <LoadingSimple />
                <Text>Vui lòng chọn quận huyện</Text>
            </View>

        )
    }


    const [data, setData] = useState([]);

    useEffect(() => {
        let unmounted;

        const fetchData = async () => {

            const dataRes = await getSubdistrict(district_code);
            if (dataRes.status) {
                unmounted = setTimeout(() => {
                    setData(Object.values(dataRes.data));
                }, 800);

            }


        }
        fetchData();

        return () => {
            clearTimeout(unmounted);
        }

    }, []);


    const selectItem = (e) => {
        if (typeof (setSelectedItem) != 'function') {
            return;
        }

        setSelectedItem(e);
    }



    if (data.length <= 0) {
        return (
            <View
                style={{
                    display: 'flex',
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignContent: 'center',

                }}
            >
                <LoadingSimple />

            </View>

        )
    }


    return (
        <ScrollView>
            {
                data.length > 0 &&
                data.map((e, index) =>
                    <ItemSelection
                        key={index.toString()}
                        label={e.name_with_type}
                        containerStyle={styles.selectionStyle}
                        labelStyle={styles.selectionLabelStyle}
                        onItemPress={() => selectItem(e)}
                    />
                )
            }
        </ScrollView>
    )
}




/**
 * 
 */
export const RenderOccupationSelection = ({
    setSelectedItems,
}) => {


    const [data, setData] = useState([]);

    useEffect(() => {
        let unmounted;

        const fetchData = async () => {

            const dataRes = await getOccupations();
            if (dataRes.status) {
                unmounted = setTimeout(() => {
                    setData(Object.values(dataRes.data));
                }, 800);

            }


        }
        fetchData();

        return () => {
            clearTimeout(unmounted);
        }

    }, []);


    const selectItem = (e) => {
        if (typeof (setSelectedItems) != 'function') {
            return;
        }

        setSelectedItems(e);
    }

    const [occupationSelected, setOccupationSelected] = useState([]);

    const isOccupationSelectedDuplicate = (occupation) => {
        let findIndex = occupationSelected.findIndex(e => e.id == occupation.id);
        if (findIndex == -1) {
            return false;
        } else {
            return true;
        }

    }

    const _onAddOccupation = (occupation) => {

        let isDuplicate = isOccupationSelectedDuplicate(occupation);

        if (isDuplicate) {
            Alert.alert("", "Lĩnh vực đã tồn tại")
            return;
        } else {
            if (occupationSelected.length <= 2) {
                setOccupationSelected([occupation, ...occupationSelected]);
                if (typeof (setSelectedItems) != 'function') {
                    return;
                }else{
                   setSelectedItems(occupation);
                }
            } else {
                Alert.alert("", "Chỉ được phép chọn 3 lĩnh vực hoạt động");
            }
        }
    }

    const _onRemoveOccupation = (occupation) => {
        let selectedFields = occupationSelected.filter(e => e.id != occupation.id);
        setOccupationSelected(selectedFields);

    }



    if (data.length <= 0) {
        return (
            <View
                style={{
                    display: 'flex',
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignContent: 'center',

                }}
            >
                <LoadingSimple />

            </View>

        )
    }





    return (
        <>
            <View
                style={{
                    display: 'flex',
                    flexDirection: 'row'
                }}
            >
               
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                >
                    {
                        occupationSelected.length > 0 &&
                        occupationSelected.map((e, index) =>
                            <ItemChip
                                key={index.toString()}
                                label={e?.attributes?.name}
                                onClose={() => _onRemoveOccupation(e)}

                            />

                        )
                    }
                </ScrollView>
            </View>

            <ScrollView
                horizontal={false}
            >
                {
                    data.length > 0 &&
                    data.map((e, index) =>
                        <ItemSelection
                            key={index.toString()}
                            label={e.attributes?.name}
                            containerStyle={[styles.selectionStyle, {
                                paddingRight: 22
                            }]}
                            labelStyle={styles.selectionLabelStyle}
                            onItemPress={() => _onAddOccupation(e)}
                            rightIcon={CommonIcons.plusThick}
                            rightIconColor={CommonColors.primary}
                        />
                    )
                }
            </ScrollView>
        </>
    )
}



