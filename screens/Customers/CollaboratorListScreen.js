import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'
import CollaboratorCard from '../../components/Card/CollaboratorCard'
import FilterBar from '../../components/Filter/FilterBar'
import { getCollaboratorByCategory } from '../../utils/serverApi'

const CollaboratorListScreen = (props) => {
    const [isLoading, setIsLoading] = useState(false);

    const [collaborators, setCollaborators] = useState([]);

    const { category } = props.route.params;

    useEffect(() => {
        _onGetCollaboratorByCategory();

        props.navigation.setOptions({
            title: `Ứng Viên ${category.name} `,
            headerTitleStyle: {
                fontSize: 14
            },
        })


        props.navigation.dangerouslyGetParent().setOptions({
            tabBarVisible: false
        });

        return () => {
            props.navigation.dangerouslyGetParent().setOptions({
                tabBarVisible: true
            });

        }



    }, []);



    const [postnumber, setPostnumber] = useState(0);
    const [perpage, setPerpage] = useState(8);

    const _onGetCollaboratorByCategory = async () => {
        setIsLoading(true);
        let dataRes = await getCollaboratorByCategory(category.id, perpage, postnumber);

        if (dataRes.data.data.length > 0) {
            setCollaborators(dataRes.data.data);
        }
        setIsLoading(false);
    }


    const _onLoadMore = async () => {
        setIsLoading(true);

        let postnumberIndex = postnumber + perpage;
        setPostnumber(postnumberIndex);
        let dataRes = await getCollaboratorByCategory(category.id, perpage, postnumberIndex);

        if (dataRes.data?.data?.length > 0) {
            setTimeout(() => {
                setCollaborators([...collaborators, ...dataRes.data.data]);
                setIsLoading(false);

            }, 1200);
        }else{
            setIsLoading(false);

        }

    }

    return (
        <View style={{
            display: 'flex',
            flex: 1, paddingTop: 10
        }}>
            {
                collaborators.length > 0 &&
                <FlatList style={{ flex: 1, zIndex: -1 }}
                    showsVerticalScrollIndicator={true}
                    data={collaborators}
                    renderItem={({ item, index }) => (
                        <CollaboratorCard
                            item={item}
                            navigation={props.navigation}
                        />
                    )}
                    keyExtractor={(item, index) => index.toString()}
                    ListFooterComponent={
                        <ActivityIndicator
                            size={'small'}
                            color={'red'}   
                            animating={isLoading ?true:false} 
                        />
                    }
                    onEndReachedThreshold={0.2}
                    onEndReached={_onLoadMore}
                />
            }
        </View>
    )
}

export default CollaboratorListScreen

const styles = StyleSheet.create({})
