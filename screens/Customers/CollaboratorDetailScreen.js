import React, { useState, useEffect } from 'react'
import { Alert, Linking, StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { Avatar, Caption, Chip, IconButton } from 'react-native-paper'
import CardReview from '../../components/Card/CardReview'
import ReviewStar from '../../components/Review/ReviewStar'
import CommonIcons from '../../constants/CommonIcons'
import CommonImages from '../../constants/CommonImages'
import { useSelector } from 'react-redux';
import server_url from '../../serverConfig';

import {  _getCandidateDetail } from '../../utils/serverApi';
import CommonColors from '../../constants/CommonColors'
import RowInformation from '../../components/Row/RowInformation'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import CardReviewCandidate from '../../components/Review/CardReviewCandidate'

const CollaboratorDetailScreen = (props) => {
    const { userInformation } = useSelector(state => state.authentication);


    const [isFavorite, setIsFavorite] = useState(false);
    const { candidate } = props.route?.params;
    const [collaborator, setCollaborator] = useState();
    const [candidateInfo, setCandidateInfo] = useState('');


    const [isLoading, setIsLoading] = useState(false);
    const onGetCandidateDetail = async () => {
        setIsLoading(true);
        let dataRes = await _getCandidateDetail(candidate.id);
        if (!dataRes.status) {
            Alert.alert("Alert", "Somwthing went wrong");
            // props.navigation.goBack();
            setIsLoading(false);
            return;
        }
        setCandidateInfo(dataRes.data?.data);
        setCollaborator(dataRes.data?.data)
        setIsLoading(false)
    }
    useEffect(() => {
        onGetCandidateDetail();


    }, []);


    const _onOpenPhoneCall = (phonenumber) => {

        Linking.openURL(`tel:${phonenumber}`);
    }

    const _onMoreReview = () => {
        props.navigation.navigate('CandidateReview',{
            candidate:candidateInfo
        });
    }

    if (isLoading) {
        return (
            <ActivityIndicator
                color={'coral'}
                size={'large'}
            />
        )
    }

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
        >


            <IconButton style={{ position: 'absolute', zIndex: 999, right: 1 }}
                icon={isFavorite ? CommonIcons.heart : CommonIcons.heartOutline}
                color={'red'}
                size={34}
                onPress={() => setIsFavorite(!isFavorite)}
            />

            <View style={[styles.sectionWrap, styles.topBannerCard]}>

                <Avatar.Image size={84} source={{
                    uri: `${server_url.url_absolute}/${candidateInfo?.profile_image}` || CommonImages.notFound
                }} />
                <View style={styles.userInfo}>
                    <RowInformation
                        iconName={CommonIcons.account}
                        value={candidateInfo?.username}
                    />
                    <RowInformation
                        iconName={CommonIcons.mapMarker}
                        label={`${candidateInfo?.candidate_info?.location?.district} - ${candidateInfo?.candidate_info?.location?.province}`}
                        labelStyle={{
                            fontSize: 12,
                            fontStyle: 'italic'
                        }}
                    />
                    <TouchableOpacity
                        onPress={() => _onOpenPhoneCall(candidateInfo?.phonenumber)}
                    >
                        <RowInformation
                            iconName={CommonIcons.phone}
                            value={candidateInfo?.phonenumber || ''}

                        />

                    </TouchableOpacity>

                </View>



            </View>

            <View style={[styles.sectionWrap]}>
                <Text style={[styles.sectionTitle]} >Nghề nghiệp chuyên môn: </Text>
                <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', margin: 12 }}>
                    {
                        candidateInfo?.candidate_info?.fields?.map((e, index) =>
                            <Chip style={{ margin: 2 }}
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
                    candidateInfo?.images?.length > 0 ?
                        <View style={styles.photoGallery}>
                            {
                                candidateInfo?.images?.map((e, index) =>
                                    <Image style={styles.occupationImage}
                                        key={index.toString()}
                                        source={{
                                            uri: `${server_url.url_absolute}/${e.image}` || 'https://reactnative.dev/img/tiny_logo.png',
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
                <View
                    style={{
                        paddingTop: 6
                    }}
                >
                    <Text
                        style={{
                            fontWeight: '700'
                        }}
                    >
                        Đánh giá
                    </Text>
                    <View
                        style={{
                            borderBottomWidth: 0.5,
                            paddingBottom: 8,
                            padding: 8,
                            borderBottomColor: 'grey'
                        }}
                    >
                        <View style={[styles.row, { alignItems: 'center', justifyContent: 'space-between' }]}>
                            <View style={[styles.row]}>
                                <Text>{candidateInfo?.candidate_info?.review_overall?.review_level_avg | 0}/5</Text>
                                <MaterialCommunityIcon
                                    name={CommonIcons.star}
                                    size={18}
                                    color={'gold'}
                                    style={{
                                        marginHorizontal: 4
                                    }}
                                />
                                <Text style={{ marginHorizontal: 6, color: 'grey', fontSize: 12, fontStyle: 'italic' }}>( {candidateInfo?.candidate_info?.review_overall?.review_count} đánh giá )</Text>
                            </View>
                            <View>
                                <TouchableOpacity
                                    style={[styles.row, { alignItems: 'center' }]}
                                    onPress={_onMoreReview}
                                >
                                    <Text style={{ fontSize: 12, fontStyle: 'italic', color: 'grey' }}>xem tất cả</Text>
                                    <MaterialCommunityIcon
                                        name={CommonIcons.arrowRightChevron}
                                        size={18}
                                        color={'grey'}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
                <Text style={[styles.sectionTitle, {
                    fontSize: 14,
                    marginVertical: 6
                }]}>Đánh giá từ khách hàng</Text>

                {
                    candidateInfo?.candidate_info?.reviews?.length > 0 ?
                        <>
                            {
                                candidateInfo?.candidate_info?.reviews?.map((e, index) =>
                                    // <CardReview
                                    //     key={index.toString()}
                                    //     review={e}
                                    // />
                                    <CardReviewCandidate 
                                        key={index.toString()}
                                        name={e?.review_author?.username}
                                        review_content={e.review_content}
                                        review_level={e.review_level}
                                        updated_at = {e.updated_at}
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
    },
    row: {
        display: 'flex',
        flexDirection: 'row'
    }
})
