import React, { useState, useEffect } from 'react'
import { Alert, StyleSheet, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Avatar, Chip, IconButton } from 'react-native-paper'
import CardReview from '../components/Card/CardReview'
import ReviewStar from '../components/Review/ReviewStar'
import CommonIcons from '../constants/CommonIcons'
import CommonImages from '../constants/CommonImages'


import { getCollaboratorDetail } from '../utils/serverApi';

const CollaboratorDetailScreen = (props) => {


    const occupationsArr = Array(5).fill({});
    const [isFavorite, setIsFavorite] = useState(false);
    const { collaborator_id } = props.route?.params;
    const [collaborator, setCollaborator] = useState();
    const [collaboratorOccupations, setCollaboratorOccupations] = useState([]);

    const _onAddToFavoritesList = async () => {

    }

    const _getCollaboratorDetail = async () => {
        let collaboratorData = await getCollaboratorDetail(collaborator_id);
        if (!collaboratorData.status) {
            Alert.alert("Alert", "Somwthing went wrong");
            props.navigation.goBack();
            return;
        }
        console.warn(collaboratorData.data);
        setCollaborator(collaboratorData.data);
        setCollaboratorOccupations(collaboratorData.data?.relationships.occupations);

    }

    useEffect(() => {
        _getCollaboratorDetail();

    }, [])

    return (
        <ScrollView style={{ padding: 12 }}>
            <IconButton style={{ position: 'absolute', zIndex: 999, right: 1 }}
                icon={isFavorite ? CommonIcons.star : CommonIcons.starOutline}
                color={'gold'}
                size={34}
                onPress={() => setIsFavorite(!isFavorite)}
            />

            <View style={styles.topBannerCard}>

                <Avatar.Image size={84} source={{
                    uri: CommonImages.avatar
                }} />
                <View style={styles.userInfo}>
                    <Text style={styles.textTitle}>{collaborator && collaborator.attributes.name}</Text>
                    <Text style={styles.textDescription}>{collaborator && collaborator.attributes.phonenumber}</Text>
                    <Text style={styles.textDescription}>{collaborator && collaborator.attributes.idcard}</Text>
                    <Text style={styles.textDescription}>{collaborator && collaborator.attributes.address}</Text>

                </View>
            </View>

            <View>
                <Text>Nghề nghiệp chuyên môn: </Text>
                <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', margin: 12 }}>
                    {
                        collaboratorOccupations &&
                        collaboratorOccupations.map(e =>
                            <Chip style={{ margin: 2 }}
                                onPress={() => console.log('Pressed')}
                            >
                                {e.name}
                            </Chip>

                        )
                    }

                </View>
            </View>

            {/* Danh gia khach hang */}
            <View>
                <Text>Đánh giá từ khách hàng</Text>
                <CardReview />
                <CardReview />

            </View>
        </ScrollView>
    )
}

export default CollaboratorDetailScreen

const styles = StyleSheet.create({
    topBannerCard: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    userInfo: {
        margin: 12,

    }
})
