import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View,ScrollView } from 'react-native'
import CommonColors from '../../constants/CommonColors'
import BottomNavigation from './components/BottomNavigation'

import { useSelector } from 'react-redux'
import { getFields } from '../../utils/serverApi'
import RowSelection from './components/RowSelection'

const FieldSectionScreen = (props) => {

    const { data } = props.route?.params;

    const navigateNext = (section) => {
        props.navigation.navigate(section)
    }


    const access_token = useSelector(state => state.authentication.access_token)

    const [fields, setFields] = useState([]);
    const getFieldList = async () => {

        let fields = await getFields(data.category?.id, access_token);
        if (fields.status) {
            setFields(fields.data);
        }

    }

    useEffect(() => {
        getFieldList()

        props.navigation.setOptions({
            title: 'Lựa chọn danh mục'
        })

        return () => {

        }
    }, []);


    const _onSelectionPress = async (e) => {


        props.navigation.navigate('LocationSection',{
            field:e,
            data:{
                ...data,
                field:e
            }
        })
    }

    return (
        <View
            style={{
                display: 'flex',
                flex: 1,
                backgroundColor: 'white',
                justifyContent: 'space-between'
            }}
        >
            <ScrollView>

                {
                    fields.length > 0 &&
                    fields.map((e, index) =>
                        <RowSelection
                            key={index.toString()}
                            label={e.name}
                            itemPress={() => _onSelectionPress(e)}
                        />
                    )

                }

            </ScrollView>

            <BottomNavigation
                onBackPress={() => props.navigation.navigate('CategorySection')}
                
            />
        </View>
    )
}

export default FieldSectionScreen

const styles = StyleSheet.create({})
