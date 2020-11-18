import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity,Image } from 'react-native'
import { IconButton } from 'react-native-paper'

const MenuItem = ({ index, item,navigation }) => {

    return (
        <TouchableOpacity key={index}
            style={styles.menuItem}
            onPress={()=>navigation.navigate('JobList')}
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
