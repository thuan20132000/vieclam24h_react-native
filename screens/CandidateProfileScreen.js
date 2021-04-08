import React, { useLayoutEffect, useState } from 'react'
import { StyleSheet, Text, View, Image, Button, Linking, ActivityIndicator } from 'react-native'
import { useSelector } from 'react-redux'
import RowInformation from '../components/Row/RowInformation';
import CommonIcons from '../constants/CommonIcons';
import CommonImages from '../constants/CommonImages';
import { formatDateString, formatDateTime } from '../utils/helper';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import ItemChip from '../components/Item/ItemChip';
import serverConfig from '../serverConfig';
import CardHorizontal from '../components/Card/CardHorizontal';
import JobItem from '../components/Card/JobItem';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import CardUserContact from '../components/Card/CardUserContact';
import { _getCandidateDetail } from '../utils/serverApi';

const CandidateProfileScreen = (props) => {

    const { userInformation } = useSelector(state => state.authentication);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [candidateInfo, setCandidateInfo] = useState();

    useLayoutEffect(() => {

        props.navigation.setOptions({
            title: 'Hồ sơ tìm việc',
        });

        // setIsLoading(true);
        // _getCandidateDetail(userInformation?.id)
        //     .then((res) => {
        //         if (res.status) {
        //             setCandidateInfo(res.data?.data?.candidate_info);
        //         }
        //     })
        //     .catch(err => setIsError(true))
        //     .finally(() => setIsLoading(false));


        return () => {

        };
    }, []);



    if (isLoading) {
        return (
            <View
                style={{
                    display: 'flex',
                    flex: 1,
                    backgroundColor: 'white',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <ActivityIndicator
                    size={'large'}
                    color={'coral'}

                />
            </View>
        )
    }


    return (
        <ScrollView 
            style={[
                styles.container,
                
            ]}
        >
            <View>

                <CardUserContact
                    username={userInformation.username}
                    contactDisplay={false}

                />
            </View>


            <View
                style={[
                    styles.block,
                    {
                        paddingHorizontal: 6,
                        margin: 4,
                        paddingVertical: 18,
                        overflow: 'hidden',
                        borderRadius:8
                    }
                ]
                }>
                <RowInformation
                    iconName={CommonIcons.star}
                    label={'Đánh giá: '}
                    value={`${userInformation?.candidate_info?.review_overall?.review_level_avg} / ${userInformation?.candidate_info?.review_overall?.review_count} (lượt đánh giá)`}
                />
                <RowInformation
                    iconName={CommonIcons.mapMarker}
                    label={'Khu vực: '}
                    value={`${userInformation?.candidate_info?.location?.district} - ${userInformation?.candidate_info?.location?.province}`}
                />
                <RowInformation
                    iconName={CommonIcons.historyJob}
                    label={'Ngày tham gia: '}
                    value={`${formatDateString(userInformation?.created_at)}`}
                />

                <RowInformation
                    containerStyle={{
                        flexWrap: 'wrap'
                    }}
                >
                    {
                        userInformation?.candidate_info?.images &&
                        userInformation?.candidate_info?.images.map((e, index) => {
                            if (index > 3) {
                                return;
                            } else {
                                return (
                                    <Image
                                        style={[styles.avatar, { width: 50, height: 50, margin: 2 }]}
                                        source={{
                                            uri: `${serverConfig.url_absolute}/${e.image}` || CommonImages.notFound
                                        }}
                                    />

                                )
                            }
                        }

                        )
                    }
                </RowInformation>
                <RowInformation
                    containerStyle={{
                        flexWrap: 'wrap'
                    }}
                >
                    {
                        userInformation?.candidate_info?.fields &&
                        userInformation?.candidate_info?.fields.map((e, index) =>
                            <ItemChip
                                close={false}
                                label={e.name}
                                labelStyle={{
                                    color: 'coral',
                                    fontWeight: '700'
                                }}
                                containerStyle={{ paddingHorizontal: 12 }}
                            />

                        )
                    }
                </RowInformation>
                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-end'
                }}>
                    <TouchableOpacity
                        style={{
                            backgroundColor: '#1e90ff',
                            paddingVertical: 6,
                            paddingHorizontal: 12,
                            borderRadius: 6

                        }}
                        onPress={() => props.navigation.navigate('UpdateCandidateStack')}
                    >
                        <Text style={{
                            textAlign: 'center',
                            color: 'white',
                            fontSize: 14,
                        }}>Chỉnh sửa</Text>
                    </TouchableOpacity>
                </View>
            </View>

            
        </ScrollView>
    )
}

export default CandidateProfileScreen

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1
    },
    block: {
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: 6,
    },
    row: {
        display: 'flex',
        flexDirection: 'row'
    },
    column: {
        display: 'flex',
        flexDirection: 'column'
    }
})
