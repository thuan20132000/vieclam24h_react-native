import React from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import { Avatar } from 'react-native-paper';
import CommonImages from '../../constants/CommonImages';
import {formatCash,formatDateTime} from '../../utils/helper';

const CardJobConfirm = ({ item }) => {


    return (
        <View style={styles.container}>
            <Text style={[styles.text, {
                fontSize: 18,
                fontWeight: '500',

            }]}>
                {item?.attributes?.name}
            </Text>
            <Text style={[styles.text, {
                fontSize: 14,
                fontStyle: 'italic',
                color: 'coral'
            }]}>
                {formatCash(item?.relationships?.confirm?.confirmed_price)} vnđ
            </Text>

            <View style={{ display: 'flex', flexDirection: 'row', margin: 12, alignItems: 'center' }}>
                <Avatar.Image size={44} source={{
                    uri: CommonImages.avatar
                }}
                />
                <View style={{display:'flex',flexDirection:'column'}}>
                    <Text style={[styles.text, {
                        marginHorizontal: 22
                    }]}>
                        {item?.relationships.candidate.name}
                    </Text>
                    <Text style={[styles.text, {
                        marginHorizontal: 22
                    }]}>
                        {item?.relationships.candidate.phonenumber}
                    </Text>
                    <Text style={[styles.text, {
                        marginHorizontal: 22
                    }]}>
                        {item?.relationships.candidate.email}
                    </Text>

                </View>
            </View>
            <Text style={{
                fontSize:12,
                color:'grey',
                fontStyle:'italic'
            }}>Xác nhận lúc : {formatDateTime(item?.relationships.candidate.updated_at || item?.relationships.candidate.created_at)} </Text>


        </View>
    )
}

export default CardJobConfirm

const deviceWidth = Dimensions.get('screen').width;
const deviceHeight = Dimensions.get('screen').height;


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        margin: 12,
        borderRadius: 12,
        padding: 8

    },
    text:{
        marginVertical:6
    }
})
