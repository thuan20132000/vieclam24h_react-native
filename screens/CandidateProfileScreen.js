import React, { useLayoutEffect } from 'react'
import { StyleSheet, Text, View, Image, Button } from 'react-native'
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
import { TouchableOpacity } from 'react-native-gesture-handler';

const CandidateProfileScreen = (props) => {

    const { userInformation } = useSelector(state => state.authentication);

    useLayoutEffect(() => {

        props.navigation.setOptions({
            title: 'Hồ sơ tìm việc',
            
        })
        return () => {

        };
    }, [])

    return (
        <View style={[styles.container]}>
            <View>
                <View style={[styles.row]}>
                    <Image
                        style={[styles.avatar, { width: 80, height: 80, borderRadius: 40 }]}

                        source={{
                            uri: CommonImages.avatar
                        }}
                    />
                    <View style={[styles.column, { justifyContent: 'center' }]}>
                        <Text style={{ fontWeight: '700' }}>{userInformation.username}</Text>
                        <Text>098496894568</Text>
                    </View>

                </View>
            </View>


            <View style={[styles.block, { paddingHorizontal: 6, margin: 4, paddingVertical: 18,overflow:'hidden' }]}>
                <RowInformation
                    iconName={CommonIcons.star}
                    label={'Đánh giá: '}
                    value={'Chưa có đánh giá'}
                />
                <RowInformation
                    iconName={CommonIcons.mapMarker}
                    label={'Khu vực: '}
                    value={`${userInformation?.candidate_info?.location?.district} - ${userInformation?.candidate_info?.location?.province}`}
                />
                <RowInformation
                    iconName={CommonIcons.historyJob}
                    label={'Ngày tham gia: '}
                    value={`${formatDateString(userInformation?.date_joined)}`}
                />
                <RowInformation
                    iconName={CommonIcons.checkboxCircleMark}
                    label={'Đã xác thực: '}
                >
                    <MaterialCommunityIcon
                        name={CommonIcons.facebook}
                        size={18}
                        color={'blue'}
                    />
                    <MaterialCommunityIcon
                        name={CommonIcons.mapMarker}
                        size={18}
                        color={'coral'}
                    />
                    <MaterialCommunityIcon
                        name={CommonIcons.phone}
                        size={18}
                        color={'green'}
                    />

                </RowInformation>
                <RowInformation
                    iconName={CommonIcons.cameraplus}
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
                    iconName={CommonIcons.tagPrice}
                    containerStyle={{
                        flexWrap:'wrap'
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

            <View style={[styles.block, { paddingVertical: 18, paddingHorizontal: 6, marginHorizontal: 4 }]}>
                <Text style={[{ fontWeight: '700' }]}>
                    Lịch sử
                </Text>
                <JobItem

                />
            </View>
        </View>
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
