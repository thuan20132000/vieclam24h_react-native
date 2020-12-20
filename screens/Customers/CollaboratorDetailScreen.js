import React, { useState, useEffect } from 'react'
import { Alert, StyleSheet, Text, View, Image } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Avatar, Caption, Chip, IconButton } from 'react-native-paper'
import CardReview from '../../components/Card/CardReview'
import ReviewStar from '../../components/Review/ReviewStar'
import CommonIcons from '../../constants/CommonIcons'
import CommonImages from '../../constants/CommonImages'
import { useSelector } from 'react-redux';



import { getCollaboratorDetail,checkToConnectToUserChat } from '../../utils/serverApi';
import CommonColors from '../../constants/CommonColors'

const CollaboratorDetailScreen = (props) => {
    const { userInformation } = useSelector(state => state.authentication);


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
        setCollaborator(collaboratorData.data);
        setCollaboratorOccupations(collaboratorData.data?.relationships.occupations);
    }

    useEffect(() => {
        _getCollaboratorDetail();


    }, [])


    const _onNavigateToChat = async () => {

        let checkUserIsConnected = await checkToConnectToUserChat(
            userInformation.id,
            userInformation.id,
            collaborator_id,
            collaborator?.attributes.profile_image || ""
        );



        props.navigation.navigate('ChatLive',{
            user:collaborator
        });
    }

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
        >


            <IconButton style={{ position: 'absolute', zIndex: 999, right: 1 }}
                icon={isFavorite ? CommonIcons.star : CommonIcons.starOutline}
                color={'gold'}
                size={34}
                onPress={() => setIsFavorite(!isFavorite)}
            />

            <View style={[styles.sectionWrap, styles.topBannerCard]}>

                <Avatar.Image size={84} source={{
                    uri: collaborator?.attributes.profile_image || CommonImages.avatar
                }} />
                <View style={styles.userInfo}>
                    <Text style={styles.textTitle}>{collaborator && collaborator.attributes.name}</Text>
                    <Text style={styles.textDescription}>{collaborator && collaborator.attributes.phonenumber}</Text>
                    <Text style={styles.textDescription}>{collaborator && collaborator.attributes.idcard}</Text>
                    <Text style={styles.textDescription}>{collaborator && collaborator.attributes.address}</Text>

                </View>

                <IconButton 
                    style={{ position: 'absolute', zIndex: 999, right: 0,bottom:0 }}
                    icon={CommonIcons.messages}
                    color={CommonColors.btnSubmit}
                    size={26}
                    onPress={_onNavigateToChat}
                />

            </View>

            <View style={[styles.sectionWrap]}>
                <Text style={[styles.sectionTitle, {}]} >Nghề nghiệp chuyên môn: </Text>
                <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', margin: 12 }}>
                    {
                        collaboratorOccupations &&
                        collaboratorOccupations.map((e, index) =>
                            <Chip style={{ margin: 2 }}
                                onPress={() => console.log('Pressed')}
                                key={index.toString()}
                            >
                                {e.name}
                            </Chip>

                        )
                    }

                </View>
            </View>

            {/*  */}
            <View style={[styles.sectionWrap]}>
                <Text style={[styles.sectionTitle]} >Hình ảnh hoạt động</Text>
                {
                    collaborator?.relationships?.activity_images?.length > 0 ?
                        <View style={styles.photoGallery}>
                            {
                                collaborator.relationships.activity_images?.map((e, index) =>
                                    <Image style={styles.occupationImage}
                                        key={index.toString()}
                                        source={{
                                            uri: e.image_url || 'https://reactnative.dev/img/tiny_logo.png',
                                        }}
                                    />
                                )
                            }

                        </View> :
                        <View style={{ padding: 6, marginVertical: 22 }}>
                            <Text style={{ fontStyle: 'italic', fontSize: 12 }}>Chưa có hình ảnh hoạt động</Text>
                        </View>

                }

            </View>
            {/* Danh gia khach hang */}
            <View style={[styles.sectionWrap]}>
                <Text style={[styles.sectionTitle]}>Đánh giá từ khách hàng</Text>

                {
                    collaborator?.reviews.length > 0 ?
                        <>
                            {
                                collaborator?.reviews?.map((e, index) =>
                                    <CardReview
                                        key={index.toString()}
                                        review={e}
                                    />

                                )
                            }
                        </> :
                        <View>
                            <Text>Chưa có đánh giá nào từ khách hàng.</Text>
                        </View>
                }

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

    },
    occupationsWrap: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginVertical: 16
    },
    photoGallery: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',

    },
    occupationImage: {
        width: 100,
        height: 100,
        margin: 6
    },
    sectionWrap: {
        backgroundColor: 'white',
        margin: 12,
        borderRadius: 12,
        padding: 6
    },
    sectionTitle: {
        fontSize: 16,
        color: 'grey',
        fontWeight: '400'
    }
})
