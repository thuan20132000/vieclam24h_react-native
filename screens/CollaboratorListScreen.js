import React,{useState,useEffect} from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'
import CollaboratorCard from '../components/Card/CollaboratorCard'
import FilterBar from '../components/Filter/FilterBar'
import { getCollaborator } from '../utils/serverApi'

const CollaboratorListScreen = (props) => {
    const [isLoading, setIsLoading] = useState(false);

    const [collaborators, setCollaborators] = useState([]);

    const {category_id} = props.route.params;

    const _getCollaborators = async () => {
        setIsLoading(true);
        let data = await getCollaborator(category_id);
        if (data.data.length > 0) {
            setCollaborators(data.data);
        }
        setIsLoading(false);
    }

    useEffect(() => {
        _getCollaborators();
    }, []);

    return (
        <View style={{display:'flex',flex:1}}>
            <FlatList style={{ flex: 1, zIndex: -1 }}
                showsVerticalScrollIndicator={false}
                data={collaborators}
                renderItem={({ item, index }) => (
                    <CollaboratorCard
                        item={item}
                        navigation={props.navigation}
                    />
                )}
                keyExtractor={(item) => item.id}
            // extraData={selectedId}
            // onEndReached={_loadMoreJobs}
            // ListFooterComponent={() => <FooterList />}
            />

        </View>
    )
}

export default CollaboratorListScreen

const styles = StyleSheet.create({})
