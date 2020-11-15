import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { IconButton } from 'react-native-paper'
import CommonIcons from '../../constants/CommonIcons'

const FilterMenu = ({}) => {

    
    return (
        <View style={styles.container}>
            <IconButton
                icon={CommonIcons.filter}
                color={'gray'}
                size={28}
                onPress={() => console.log('Pressed')}
            />

        </View>
    )
}

export default FilterMenu

const styles = StyleSheet.create({
    container: {
        height: 50, 
        backgroundColor: 'white', 
        borderWidth: 1,
        marginHorizontal:12,
        marginTop:8,
        

    }
})
