import React from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'
import { Avatar, Button, Card, Title, Chip, IconButton } from 'react-native-paper';
import CommonColors from '../../constants/CommonColors';
import CommonIcons from '../../constants/CommonIcons';
import CommonImages from '../../constants/CommonImages';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { formatCash, formatDateTime } from '../../utils/helper';
import ReviewStar from '../Review/ReviewStar';

const JobItem = ({
    job,
    isConfirmed = true
}) => {


    const apply_job = job?.relationship?.job;
    const job_location = job?.relationship?.job?.location;
    const job_author = job?.relationship?.job_author;



    return (
        <Card style={styles.cardContainer}>

            <Text style={{
                color: 'grey',
                fontSize: 12,
                fontStyle: 'italic',
                textAlign: 'right',
                margin: 4
            }}>
                Xác nhận lúc: {formatDateTime(job?.updated_at || new Date())}
            </Text>
            <View style={{ margin: 6 }}>
                <Text style={{
                    fontSize: 16,
                    fontWeight: '600',
                    marginVertical: 6
                }}>{apply_job?.name || 'tên công việc'}</Text>


                <View style={{ display: 'flex', flexDirection: 'row', marginVertical: 2 }}>
                    <MaterialCommunityIcons
                        name={CommonIcons.mapCheck}
                        size={18}
                        color={CommonColors.primary}
                    />
                    <Text style={{
                        fontSize: 14,
                        fontWeight: '400',
                        color: 'grey',
                        fontStyle: 'italic',
                        marginHorizontal: 6
                    }}>
                        {job_location?.address || 'địa chỉ'}
                    </Text>

                </View>
                <View style={{ display: 'flex', flexDirection: 'row', marginVertical: 2 }}>
                    <MaterialCommunityIcons
                        name={CommonIcons.tagPrice}
                        size={18}
                        color={CommonColors.primary}
                    />
                    <Text style={{
                        fontSize: 14,
                        fontWeight: '400',
                        color: 'grey',
                        fontStyle: 'italic',
                        marginHorizontal: 6
                    }}>
                        Giá đưa ra: <Text style={{
                            color: 'red'
                        }}>{formatCash(apply_job?.suggestion_price || 0)} đ</Text>
                    </Text>
                </View>
                {
                    job?.confirmed_price &&
                    <View style={{ display: 'flex', flexDirection: 'row', marginVertical: 2 }}>
                        <MaterialCommunityIcons
                            name={CommonIcons.tagPrice}
                            size={18}
                            color={CommonColors.primary}
                        />
                        <Text style={{
                            fontSize: 14,
                            fontWeight: '400',
                            color: 'grey',
                            fontStyle: 'italic',
                            marginHorizontal: 6
                        }}>
                            Giá xác nhận: <Text style={{
                                color: 'red'
                            }}>{formatCash(job?.confirmed_price)} đ</Text>
                        </Text>
                    </View>

                }

            </View>
            <View style={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'flex-start'
            }}
            >
                {
                    apply_job?.images.map((e, index) =>
                        <View
                            key={index.toString()}
                        >
                            <Image style={{
                                width: 70,
                                height: 70,
                                margin: 2
                            }}
                                source={{
                                    uri: e.image_url || CommonImages.notFound
                                }}
                            />
                        </View>

                    )
                }

            </View>
            <View style={{
                margin: 8,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: 'rgba(150, 244, 247, 0.93)',
                paddingVertical:8
            }}>
                <Image style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20
                }}
                    source={{
                        uri: job_author?.profile_image || CommonImages.notFound
                    }}
                />
                <View>
                    <Text style={{
                        fontSize: 16,
                        color: 'grey',
                        fontWeight: '600',
                        marginHorizontal: 12
                    }}>
                        {job_author?.name}
                    </Text>
                    <Text style={{
                        fontSize: 12,
                        color: 'grey',
                        fontWeight: '600',
                        marginHorizontal: 12
                    }}>
                        {job_author?.phonenumber}
                    </Text>
                </View>
            </View>


            {
                isConfirmed &&
                <View style={{
                    marginHorizontal: 12,
                    display: 'flex',

                }}>

                    <View
                        style={{
                            display: 'flex',
                            flexDirection: 'row'
                        }}
                    >
                        {
                            Array(job?.range).fill({}).map((e, index) =>
                                <ReviewStar
                                    key={index.toString()}
                                />
                            )
                        }
                    </View>

                    <View style={{
                        marginHorizontal: 12,
                        marginVertical: 6
                    }}>
                        <Text>Đánh giá từ khách hàng:  {job?.review_content}</Text>

                    </View>



                </View>
            }


        </Card>
    )
}

export default JobItem

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: 'white',
        marginVertical: 4,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        margin: 8,
        borderRadius: 18
    }
})
