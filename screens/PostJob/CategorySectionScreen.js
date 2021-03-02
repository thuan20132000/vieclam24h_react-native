import React,{useEffect,useState} from 'react'
import { StyleSheet, Text, View,TouchableOpacity,ScrollView } from 'react-native'
import CommonColors from '../../constants/CommonColors'
import BottomNavigation from './components/BottomNavigation'
import RowSelection from './components/RowSelection'

const CategorySectionScreen = (props) => {


    const navigateNext = (section) => {
        props.navigation.navigate(section)
    }

    const [categories, setCategories] = useState()
    const getCategory = async () => {

        console.warn('category');

    }

    useEffect(() => {
        getCategory()
        
        props.navigation.setOptions({
            title:'Lựa chọn danh mục'
        })

        return () => {
            
        }
    }, [])


    return (
        <View
            style={{
                display:'flex',
                flex:1,
                backgroundColor:'white',
                justifyContent:'space-between'
            }}
        >
            <ScrollView>
                <RowSelection
                    label={'Điện - Điện tử - Điển lạnh'}
                />
                <RowSelection
                    label={'Y tế - Sức khoẻ'}
                />
                <RowSelection
                    label={'Tài xế - Giao nhận'}
                />
                <RowSelection
                    label={'Tài xế - Giao nhận'}
                />
                <RowSelection
                    label={'Tài xế - Giao nhận'}
                />
                <RowSelection
                    label={'Tài xế - Giao nhận'}
                />
                <RowSelection
                    label={'Tài xế - Giao nhận'}
                />
                <RowSelection
                    label={'Tài xế - Giao nhận'}
                />
            </ScrollView>
            
            <BottomNavigation
                onNextPress={()=>navigateNext('FieldSection')}
                onBackPress={()=>props.navigation.goBack()}
            />
        </View>
    )
}

export default CategorySectionScreen

const styles = StyleSheet.create({
    row:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-around'
    }
})
