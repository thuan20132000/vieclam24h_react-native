import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import CommonColors from '../../constants/CommonColors';
import CommonIcons from '../../constants/CommonIcons';
import CommonImages from '../../constants/CommonImages';
import CommonImage from '../../constants/CommonImages';
import { formatCash } from '../../utils/helper';
import RowInformation from '../Row/RowInformation';




export const CandidateCard = ({
    price,
    name,
    phone,
    review_level,
    message,
    children,
    containerStyle,
    bodyChildren,
    onItemPress

}) => {
    return (
        <TouchableOpacity
            style={[styles.container, {
                marginVertical: 12,
                borderRadius: 12,
                overflow: 'hidden',
                minHeight: 120,
                padding: 16
            },
            ]}
            onPress={onItemPress}
        >

            <View style={[styles.row]}>

                <View style={[
                    styles.column,
                    {
                        width:'20%'
                    }
                ]} >
                    <Image
                        source={{
                            uri: CommonImages.avatar
                        }}
                        style={{
                            width: 80,
                            height: 80,
                            borderRadius: 40
                        }}
                    />

                </View>


                <View style={[
                    styles.column,
                    {
                        marginHorizontal: 22,
                        width:'80%'
                    }
                ]} >

                    {
                        price &&
                        <RowInformation
                            iconName={CommonIcons.arrowRight}
                            value={`${formatCash(price)} vnđ`}
                            valueStyle={{
                                color: "red"
                            }}

                        />

                    }

                    {
                        name &&
                        <RowInformation
                            iconName={CommonIcons.account}
                            value={name}
                        />

                    }

                    {
                        phone &&
                        <RowInformation
                            iconName={CommonIcons.phone}
                            value={phone}
                        />

                    }

                    {
                        review_level &&
                        <RowInformation
                            iconName={CommonIcons.star}
                            iconColor={'gold'}
                            value={`${review_level}`}
                        />

                    }

                    {
                        message &&
                        <RowInformation
                            iconName={CommonIcons.messages}
                            label={`${message}`}
                        />
                    }
                    {
                        bodyChildren
                    }

                </View>
            </View>
            {children}


        </TouchableOpacity>
    )
}




const styles = StyleSheet.create({
    row: {
        display: 'flex',
        flexDirection: 'row',

    },
    column: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    container: {
        display: 'flex',
        backgroundColor: 'white',

    },
    cardButton: {
        padding: 12,
        shadowColor: "coral",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,

        elevation: 11,
        borderRadius: 18,
        backgroundColor: 'coral'


    }
})
