import React from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import { Avatar } from 'react-native-paper';
import CommonColors from '../../constants/CommonColors';
import CommonImages from '../../constants/CommonImages';
import {formatCash,formatDateTime} from '../../utils/helper';
import ReviewStar from '../Review/ReviewStar';

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
            <View>
                <View style={[{padding:4,borderRadius:12}]}>
                    <Text style={{
                        fontSize:14,
                        color:'grey',
                        fontStyle:'italic'
                    }} >
                        {item?.relationships?.confirm?.review_content || ""}
                    </Text>
                </View>
            </View>
            <View style={[{display:'flex',flexDirection:'row'}]}>
                {
                    Array(item?.relationships?.confirm?.range).fill({}).map((e,index) =>
                        <ReviewStar/>
                    )
                }
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
