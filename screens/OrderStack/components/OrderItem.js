import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import RowInformation from '../../../components/Row/RowInformation'
import CommonIcons from '../../../constants/CommonIcons'
import CommonImages from '../../../constants/CommonImages'
import { formatDateTime } from '../../../utils/helper'

const OrderItem = ({
    totalPrice,
    status,
    created_at,
    clientName,
    address,
    onItemPress

}) => {
    return (
        <TouchableOpacity
            style={[
                styles.container,
                styles.row
            ]}
            onPress={onItemPress}
        >
            <Image
                source={{
                    uri: CommonImages.avatar
                }}
                style={{
                    width: 60,
                    height: 60
                }}
            />
            <View
                style={[styles.column]}
            >
                <RowInformation
                    label={clientName}
                />
                <RowInformation
                    label={totalPrice}
                />
                {
                    address &&
                    <RowInformation
                        label={address}
                    />

                }
                {
                    created_at &&
                    <RowInformation
                        label={formatDateTime(created_at)}
                    />
                }
                {
                    status &&
                    <RowInformation
                        label={'Đang chờ'}
                    />
                }

            </View>
        </TouchableOpacity>
    )
}

export default OrderItem

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,

        elevation: 12,
        marginVertical: 1,
        borderRadius: 4
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    column: {
        display: 'flex',
        flexDirection: 'column',
    }
})
