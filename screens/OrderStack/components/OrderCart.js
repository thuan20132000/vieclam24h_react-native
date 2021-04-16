import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import RowInformation from '../../../components/Row/RowInformation'
import CommonIcons from '../../../constants/CommonIcons'
import { formatCash, formatDateTime } from '../../../utils/helper'

const OrderCart = ({
    time,
    address,
    total_price
}) => {
    return (
        <View>
            <View
                style={[
                    styles.section
                ]}
            >
                <RowInformation
                    iconName={CommonIcons.calendarCheck}
                    label={formatDateTime(time)}
                />
                <RowInformation
                    iconName={CommonIcons.mapMarker}
                    label={'76 Nguyen Thai Binh'}
                />
                <RowInformation
                    iconName={CommonIcons.tagPrice}
                    label={`${formatCash(230000)} vnđ`}
                    labelStyle={{color:'red',fontWeight:'700'}}
                />
            </View>
            <View
                style={[styles.section]}
            >
                <View
                    style={[styles.serviceItem]}
                >
                    <Text
                        style={[
                            styles.serviceTitle
                        ]}
                    >
                        Vệ sinh máy giặt
                        </Text>
                    <Text
                        style={[styles.servicePrice]}
                    >
                        320000
                        </Text>
                </View>
                <View
                    style={[styles.serviceItem]}
                >
                    <Text
                        style={[
                            styles.serviceTitle
                        ]}
                    >
                        Vệ sinh máy giặt
                        </Text>
                    <Text
                        style={[styles.servicePrice]}
                    >
                        320000
                        </Text>
                </View>
                <View
                    style={[styles.serviceItem]}
                >
                    <Text
                        style={[
                            styles.serviceTitle
                        ]}
                    >
                        Vệ sinh máy giặt
                        </Text>
                    <Text
                        style={[styles.servicePrice]}
                    >
                        320000
                        </Text>
                </View>
            </View>
        </View>
    )
}

export default OrderCart

const styles = StyleSheet.create({
    section: {
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
        borderRadius: 4,
        marginHorizontal: 4
    },
    serviceItem: {
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,

        elevation: 12,
        padding: 4,
        borderBottomWidth:0.8,
        borderBottomColor:'gray',

    },
    serviceTitle: {
        fontSize: 16
    },
    servicePrice: {
        fontSize: 14,
        fontWeight:'700',
        color:'red'
    }
})
