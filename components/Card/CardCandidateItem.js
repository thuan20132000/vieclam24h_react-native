import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import CommonColors from '../../constants/CommonColors'
import CommonIcons from '../../constants/CommonIcons'
import RowInformation from '../Row/RowInformation'


const CardCandidateItemBase = ({
    onDetailPress,
    onLikePress
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
                    display:'flex',
                    flexDirection:'column'
                }}
                onPress={onDetailPress}
            >
                <Text>Nhận xây sửa nhà các loại,sắt, cơ khí, điện nước...</Text>


                <View
                    style={[styles.row, {
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        marginVertical: 6
                    }]}
                >
                    <Text>4.6</Text>
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
                        (26 đánh giá)
                    </Text>
                </View>
                <RowInformation
                    iconName={CommonIcons.mapMarker}
                    iconColor={'coral'}
                    value={'Liên Chiểu - Đà Nẵng'}


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
