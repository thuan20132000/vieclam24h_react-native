import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'
import CollaboratorCard from '../../components/Card/CollaboratorCard'
import FilterBar from '../../components/Filter/FilterBar'
import {  getCollaboratorByCategory } from '../../utils/serverApi'

const CollaboratorListScreen = (props) => {
    const [isLoading, setIsLoading] = useState(false);

    const [collaborators, setCollaborators] = useState([]);

    const { category } = props.route.params;

    const _onGetCollaboratorByCategory = async () => {
        setIsLoading(true);
        let dataRes = await getCollaboratorByCategory(category.id);
        if (dataRes.data.data.length > 0) {
            setCollaborators(dataRes.data.data);
        }
        setIsLoading(false);
    }

    useEffect(() => {
        _onGetCollaboratorByCategory();

        props.navigation.setOptions({
            title: `Ứng Viên ${category.name} `,
            headerTitleStyle: {
                fontSize: 14
            },
        })

    }, []);

    return (
        <View style={{
            display: 'flex', 
            flex: 1, paddingTop: 10
        }}>
            <FlatList style={{ flex: 1, zIndex: -1 }}
                showsVerticalScrollIndicator={false}
                data={collaborators}
                renderItem={({ item, index }) => (
                    <CollaboratorCard
                        item={item}
                        navigation={props.navigation}
                    />
                )}
                keyExtractor={(item, index) => index.toString()}
            // extraData={selectedId}
            // onEndReached={_loadMoreJobs}
            // ListFooterComponent={() => <FooterList />}
            />

        </View>
    )
}

export default CollaboratorListScreen

const styles = StyleSheet.create({})
