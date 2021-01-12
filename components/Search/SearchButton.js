import React from 'react'
import { StyleSheet, Text, View,TextInput } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import CommonIcons from '../../constants/CommonIcons';

const SearchButton = ({
    onPress,
    placeholderText
}) => {
    
    return (
        <TouchableOpacity style={{
            height: 36,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            margin: 6,
            paddingLeft: 12,
            backgroundColor: 'white',
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,

            elevation: 5,

        }}
            onPress={onPress}
        >
            <MaterialCommunityIcon
                name={CommonIcons.search}
                size={28}
            />
            <TextInput
                style={{ height: 40, borderColor: 'gray', width:'100%' }}
                placeholder={placeholderText}
                onFocus={onPress}

            />


        </TouchableOpacity>
    )
}

export default SearchButton

const styles = StyleSheet.create({})
