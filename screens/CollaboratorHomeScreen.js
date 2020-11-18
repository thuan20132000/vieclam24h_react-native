import React, { useState,useEffect } from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { Subheading, Button } from 'react-native-paper'
import HomeContent from '../components/Body/HomeContent'
import CardHorizontal from '../components/Card/CardHorizontal'
import FilterMenu from '../components/Filter/FilterMenu'
import HomeMenu from '../components/Menu/HomeMenu'
import MenuItem from '../components/Menu/MenuItem'
import HomeSearch from '../components/Search/HomeSearch'
import CommonIcons from '../constants/CommonIcons'
import SearchButton from '../components/Search/SearchButton'

import {getCategory,getJobs} from '../utils/serverApi';

const CollaboratorHomeScreen = (props) => {

    const menuItems = Array(6).fill({});
    const [categories,setCategories] = useState([]);
    const [jobs,setJobs] = useState([]);
    const [isLoading,setIsLoading] = useState(false);

    const {
        navigation
    } = props;


    const _onSearchPress = () => {
        navigation.navigate('Search');
    }

    const _getCategory = async () => {
        setIsLoading(true);
        let data = await getCategory();
        if(data.data.length > 0){
            setCategories(data.data);
        }
        setIsLoading(false);

    }

    const _getJobs = async () => {
        setIsLoading(true);
        let data = await getJobs();
        if(data.data.length > 0 ){
            setJobs(data.data);
        }
        setIsLoading(false);
    }
    const _navigateToJobDetail = async (job_id) => {
        props.navigation.navigate('JobDetail',{job_id:job_id})
    }

    useEffect(() => {
        _getCategory();
        _getJobs();
    }, []);

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
        >
            <SearchButton
                onPress={_onSearchPress}
            />
            {/* Menu */}


            <View style={styles.menuContainer}>
                {   categories &&
                    categories.map((e, index) => <MenuItem index={index} item={e} {...props} />)
                }
            </View>

            {/* End Menu */}

            {/* Job List */}
            <View style={styles.vericleListContainer}>
                <Subheading style={{ paddingHorizontal: 12 }}>Việc làm dành cho bạn</Subheading>

                {
                    jobs &&
                    jobs.map((e, index) => 
                    <CardHorizontal 
                        index={index} 
                        item={e} 
                        {...props}  
                        key={index.toString()}
                        onPress={_navigateToJobDetail}
                    />)
                }
            </View>

        </ScrollView>
    )
}

export default CollaboratorHomeScreen

const styles = StyleSheet.create({
    menuContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        margin: 12,
        padding: 6,
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
    vericleListContainer: {
        marginTop: 22,

    }
})
