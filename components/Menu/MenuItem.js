import React from 'react'
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import { IconButton } from 'react-native-paper'

const MenuItem = ({index}) => {
    return (
        <TouchableOpacity key={index}
            style={styles.menuItem}
        >
            <IconButton
                icon="camera"
                color={'coral'}
                size={30}
                onPress={() => console.log('Pressed')}
            />
            <Text style={{ fontSize: 12 }}>Danh Mục Mo</Text>
        </TouchableOpacity>
    )
}

export default MenuItem

const styles = StyleSheet.create({
    menuItem: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    }
})
