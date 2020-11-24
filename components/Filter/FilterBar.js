import React, { useState,useEffect } from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'


import {getDistrict} from '../../utils/locationApi';


const FilterBar = ({searchDistrict,setSearchDistrict}) => {

    const [districts, setDistricts] = useState([{
        label:'all',value:'all'
    }]);

    const _onGetDistrict = async (province_code) => {
        let dataRes = await getDistrict(province_code);
        let b = [];
        let a = await Object.values(dataRes.data);
        for (const x of a) {
            b.push(
                {
                    label:x.name_with_type,
                    value:x.code
                }
            )
        }
        setDistricts(b);
    }

    useEffect(() => {
        _onGetDistrict(48);
    }, [])
    


    return (
        <View style={styles.barWrap}>

            <DropDownPicker style={styles.selectWrap}
                items={districts}
                defaultValue={'all'}
                containerStyle={{ height: 40 }}
                itemStyle={{
                    justifyContent: 'flex-start'
                }}
                dropDownStyle={{ backgroundColor: '#fafafa' }}
                onChangeItem={(item) => setSearchDistrict(item.value)}
            />

            <DropDownPicker style={styles.selectWrap}
                items={[
                    { label: 'Giá', value: 'price' },
                    { label: 'UK', value: 'uk' },
                    { label: 'France', value: 'france' },
                ]}
                defaultValue={'price'}
                containerStyle={{ height: 40 }}
                itemStyle={{
                    justifyContent: 'flex-start'
                }}
                dropDownStyle={{ backgroundColor: '#fafafa' }}
                onChangeItem={(item) => console.warn(item.value)}
            />


        </View>
    )
}

const deviceWidth = Dimensions.get('screen').width;
const deviceHeight = Dimensions.get('screen').height;

export default FilterBar


const styles = StyleSheet.create({
    barWrap: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    selectWrap:{
        backgroundColor: '#fafafa', 
        zIndex: 999, 
        width: deviceWidth/2,
        marginHorizontal:12
    }
})
