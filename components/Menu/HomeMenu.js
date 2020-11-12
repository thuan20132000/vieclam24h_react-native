import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { IconButton, Colors } from 'react-native-paper';

const HomeMenu = () => {

    const menuItems = Array(6).fill({});


    return (
        <View style={styles.container}>
            {
                menuItems.map((e, index) => (
                    <TouchableOpacity key={index.toString()}
                        style={styles.menuItem}
                    >
                        <IconButton
                            icon="camera"
                            color={'coral'}
                            size={30}
                            onPress={() => console.log('Pressed')}
                        />
                        <Text style={{fontSize:12}}>Sửa chửa dân dụng</Text>
                    </TouchableOpacity>
                ))
            }


        </View>
    )
}

export default HomeMenu

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        margin: 12,
        padding:6,
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,

    },
    menuItem: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    }
})
