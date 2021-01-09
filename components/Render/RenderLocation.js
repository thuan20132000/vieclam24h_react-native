import React, { useEffect } from 'react'
import { Alert, StyleSheet, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import ItemSelection from '../Item/ItemSelection';


import { getProvince, getDistrict, getSubdistrict } from '../../utils/locationApi';
import { useState } from 'react/cjs/react.development';
import LoadingSimple from '../Loading/LoadingSimple';
import { ActivityIndicator } from 'react-native-paper';


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
        const fetchData = async () => {

            const dataRes = await getDistrict(province_code);
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
        const fetchData = async () => {

            const dataRes = await getSubdistrict(district_code);
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
})
