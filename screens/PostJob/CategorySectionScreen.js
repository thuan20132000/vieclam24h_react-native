import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native'
import CommonColors from '../../constants/CommonColors'
import { getCategory } from '../../utils/serverApi'
import BottomNavigation from './components/BottomNavigation'
import RowSelection from './components/RowSelection'
import { useSelector,useDispatch } from 'react-redux'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'

import * as jobActions from '../../store/actions/jobActions';
import CommonIcons from '../../constants/CommonIcons'

const CategorySectionScreen = (props) => {

    const dispatch = useDispatch();
  

    const access_token = useSelector(state => state.authentication.access_token)

    const [categories, setCategories] = useState([]);
    const getCategoryList = async () => {

        let categories = await getCategory(access_token);
        if (categories.status) {
            setCategories(categories.data);
        }

    }

    useEffect(() => {
        getCategoryList()

        props.navigation.setOptions({
            title: 'Lựa chọn danh mục',
            headerLeft:()=>
                <MaterialCommunityIcon 
                    name={CommonIcons.arrowLeft} 
                    size={24} 
                    onPress={()=>props.navigation.goBack()} 
                />
        })

        return () => {

        }
    }, []);


    const _onSelectionPress = async (e) => {

        let data = {
            category:e
        }

        dispatch(jobActions.updateJob(data))


        props.navigation.navigate('FieldSection',{
            data:{
                category:e
            },
        })


    }


    const navigateNext = (section) => {
        props.navigation.navigate(section)
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
                    categories.length > 0 &&
                        categories.map((e,index) => 
                            <RowSelection key={index.toString()}
                                label={e.name} 
                                itemPress={()=>_onSelectionPress(e)}
                            />
                        )
                        
                }
            
            </ScrollView>

            <BottomNavigation
                onNextPress={() => navigateNext('FieldSection')}
                onBackPress={() => props.navigation.goBack()}
                disableNext={true}
                
            />
        </View>
    )
}

export default CategorySectionScreen

const styles = StyleSheet.create({
    row: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around'
    }
})
