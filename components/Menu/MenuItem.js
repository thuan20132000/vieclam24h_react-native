import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity,Image } from 'react-native'
import { IconButton } from 'react-native-paper'
import CommonImages from '../../constants/CommonImages'

const MenuItem = ({ 
    onItemPress,
    containerStyle,
    labelStyle,
    label,
    image }) => {


    // const _onNavigateToJobList = () => {
    //     navigation.navigate('JobList',{category_id:item.id});
    // }


    return (
        <TouchableOpacity
            style={[styles.menuItem,containerStyle]}
            onPress={onItemPress}
        >
            <Image
                style={{width:40,height:40}}
                source={{
                    uri: image || CommonImages.notFound,
                }}
            />

            <Text style={[styles.label,labelStyle]}
                numberOfLines={2}
            >
                {label}
            </Text>
        </TouchableOpacity>
    )
}

export default MenuItem

const styles = StyleSheet.create({
    menuItem: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin:6
    },
    label:{
        fontSize:16
    }
})
