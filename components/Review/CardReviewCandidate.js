import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import CommonImages from '../../constants/CommonImages'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import CommonIcons from '../../constants/CommonIcons'
import { formatDateString, formatDateTime, getDaysBetweenTwoDates } from '../../utils/helper'
import server_url from '../../serverConfig';

const CardReviewCandidate = ({
    name,
    review_content,
    review_level,
    updated_at,
}) => {
    return (
        <View
            style={[
                styles.container
            ]}
        >
            <View
                style={[styles.row, { justifyContent: 'space-between', alignItems: 'center', padding: 8 }]}
            >

                <View
                    style={[styles.row]}
                >
                    <Image
                        source={{
                            uri: CommonImages.avatar
                        }}
                        style={{
                            width: 50,
                            height: 50,
                            borderRadius: 25
                        }}
                    />
                    <View
                        style={{
                            margin: 6
                        }}
                    >
                        <Text>{name}</Text>
                        <View style={[styles.row]}>
                            {
                                Array(review_level).fill({}).map((e, index) =>
                                    <MaterialCommunityIcon
                                        key={index.toString()}
                                        name={CommonIcons.star}
                                        color={'gold'}
                                        size={18}
                                    />

                                )
                            }
                           
                        </View>
                    </View>
                </View>
                <View>

                    {
                        getDaysBetweenTwoDates(updated_at) > 0 ?


                            <Text
                                style={{
                                    color: 'grey',
                                    fontSize: 12
                                }}
                            >
                                {`${getDaysBetweenTwoDates(updated_at)} ngày trước`}
                            </Text>

                            :
                            <Text
                                style={{
                                    color: 'grey',
                                    fontSize: 12
                                }}
                            >
                                {`Hôm nay`}
                            </Text>
                    }

                    {
                        getDaysBetweenTwoDates(updated_at) > 10 &&
                        <Text
                            style={{
                                color: 'grey',
                                fontSize: 12
                            }}
                        >
                            {`${formatDateString(updated_at)}`}
                        </Text>
                    }



                </View>
            </View>

            <View>
                <Text>
                    {review_content}
                </Text>
            </View>

        </View>
    )
}

export default CardReviewCandidate

const styles = StyleSheet.create({
    row: {
        display: 'flex',
        flexDirection: 'row'
    },
    container: {
        margin: 6,
        borderBottomWidth: 0.3,
        paddingBottom: 12
    }
})
