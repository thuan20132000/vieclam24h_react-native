import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import CommonIcons from '../../constants/CommonIcons'



const ReviewStar = () => {
    return (
        <View>

            <MaterialCommunityIcons
                name={CommonIcons.star}
                size={24}
                color={'gold'}
            />
            
        </View>
    )
}

export default ReviewStar

const styles = StyleSheet.create({})
