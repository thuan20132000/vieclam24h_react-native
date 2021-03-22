import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import CommonColors from '../../constants/CommonColors'
import CommonIcons from '../../constants/CommonIcons'
import RowInformation from '../Row/RowInformation'
import server_url from '../../serverConfig';
import CommonImages from '../../constants/CommonImages'


const CardCandidateItemBase = ({
    onDetailPress,
    onLikePress,
    descriptions,
    address,
    review_average,
    review_number,
    name,
    profile_image
}) => {

    return (
        <View
            style={{
                marginVertical: 1,
                paddingHorizontal: 8,
                backgroundColor: 'white',
                paddingVertical: 8
            }}
        >
            <TouchableOpacity
                style={{
                    display: 'flex',
                    flexDirection: 'column'
                }}
                onPress={onDetailPress}
            >
                <View
                    style={[styles.row, { alignItems: 'center' }]}
                >
                    <Image

                        source={profile_image ? { uri: `${server_url.url_absolute}/${profile_image.image}` } : { uri: CommonImages.avatar }}
                        style={{
                            width: 50,
                            height: 50,
                            borderRadius: 25
                        }}
                    />

                    <Text
                        style={{
                            fontWeight: '700',
                            marginHorizontal: 12,
                            marginVertical: 6
                        }}
                    >
                        {name || ''}
                    </Text>
                </View>
                <Text
                    style={{
                        fontSize:14,
                        color:'grey',
                        marginHorizontal:6
                    }}
                >
                    {descriptions || ''}
                </Text>

                <View
                    style={[styles.row, {
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        marginVertical: 6
                    }]}
                >
                    <Text
                        style={{
                            fontSize: 14,
                            fontWeight: '600',
                            color: 'grey'
                        }}
                    >
                        {review_average}
                    </Text>
                    <MaterialCommunityIcon
                        color={'gold'}
                        size={18}
                        name={CommonIcons.star}
                        style={{
                            marginHorizontal: 4
                        }}
                    />
                    <Text
                        style={{
                            color: 'grey',
                            fontSize: 12,
                            marginHorizontal: 8
                        }}
                    >
                        ({review_number} đánh giá)
                    </Text>
                </View>
                <RowInformation
                    iconName={CommonIcons.mapMarker}
                    iconColor={'coral'}
                    value={address || ''}
                />
            </TouchableOpacity>


            <MaterialCommunityIcon
                name={CommonIcons.heartOutline}
                size={22}
                color={'red'}
                style={{
                    position: 'absolute',
                    right: 20,
                    top: '40%',

                }}
                onPress={onLikePress}
            />

        </View>
    )
}

export default CardCandidateItemBase

const styles = StyleSheet.create({
    row: {
        display: 'flex',
        flexDirection: 'row'
    }
})
