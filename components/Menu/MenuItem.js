import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity,Image } from 'react-native'
import { IconButton } from 'react-native-paper'

const MenuItem = ({ index, item,navigation }) => {


    const _onNavigateToJobList = () => {
        navigation.navigate('JobList',{category_id:item.id});
    }

    return (
        <TouchableOpacity key={index}
            style={styles.menuItem}
            onPress={_onNavigateToJobList}
        >
            <Image
                style={{width:60,height:60}}
                source={{
                    uri: item.image,
                }}
            />

            <Text style={{ fontSize: 11 }}>{item.name}</Text>
        </TouchableOpacity>
    )
}

export default MenuItem

const styles = StyleSheet.create({
    menuItem: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin:8
    }
})
