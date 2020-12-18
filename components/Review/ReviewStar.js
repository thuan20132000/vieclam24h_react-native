import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import CommonIcons from '../../constants/CommonIcons'



const ReviewStar = ({iconSize=24,iconColor='gold'}) => {
    return (
        <View>

            <MaterialCommunityIcons
                name={CommonIcons.star}
                size={iconSize}
                color={iconColor}
            />
            
        </View>
    )
}

export default ReviewStar

const styles = StyleSheet.create({})
