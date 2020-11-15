import React, { useRef, useEffect } from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Caption, Divider, Subheading } from 'react-native-paper';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import CommonColors from '../constants/CommonColors';
import CommonIcons from '../constants/CommonIcons';


const SearchItem = ({ }) => {
    return (
        <>
            <TouchableOpacity style={{
                backgroundColor: CommonColors.primary,
                margin: 2,
                alignItems:'flex-start',
                padding:8
            }}
            >
                <Text>Sửa điện</Text>
                <Caption>Danh Muc</Caption>
            </TouchableOpacity>
            <Divider/>
        </>
    )
}


const SearchScreen = () => {

    const _refSearchInput = useRef();
    const [searchQuery, setSearchQuery] = React.useState('');
    const onChangeSearch = query => setSearchQuery(query);
    useEffect(() => {
        _refSearchInput.current.focus();
    }, [])

    const searchData = Array(12).fill({});
    return (
        <View>
            <View style={styles.inputSearch}>
                <MaterialCommunityIcon
                    name={CommonIcons.search}
                    size={28}
                />
                <TextInput style={[styles.input, { marginLeft: 12, width: '100%', height: '100%' }]}
                    ref={_refSearchInput}
                    placeholder="Tìm kiếm công việc..."
                    onChangeText={onChangeSearch}
                    value={searchQuery}

                />
            </View>
            <ScrollView>
                {
                    searchData.map((e, index) => <SearchItem />)
                }
            </ScrollView>


        </View>
    )
}

export default SearchScreen

const styles = StyleSheet.create({
    inputSearch: {
        display: 'flex',
        flexDirection: 'row',
        height: 38,
        alignItems: 'center',
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

    }
})
