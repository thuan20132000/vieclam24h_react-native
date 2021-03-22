import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import CommonImages from '../../constants/CommonImages'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import CommonIcons from '../../constants/CommonIcons'

const CardReviewCandidate = () => {
    return (
        <View
            style={[
                styles.container
            ]}
        >
            <View
                style={[styles.row,{justifyContent:'space-between',alignItems:'center',padding:8}]}
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
                            margin:6
                        }}
                    >
                        <Text>Johan Slikk</Text>
                        <View style={[styles.row]}>
                            {
                                Array(5).fill({}).map((e, index) =>
                                    <MaterialCommunityIcon
                                        name={CommonIcons.star}
                                        color={'gold'}
                                        size={18}
                                    />

                                )
                            }
                            <Text
                                style={{
                                    marginHorizontal:6
                                }}
                            >
                                4.7
                            </Text>
                        </View>
                    </View>
                </View>
                <View>
                    <Text
                        style={{
                            color:'grey',
                            fontSize:12
                        }}
                    >
                        2 ngày trước
                    </Text>
                </View>
            </View>
            
            <View>
                <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque scelerisque neque ligula, vel condimentum turpis maximus quis. </Text>
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
    container:{
        margin:6,
        borderBottomWidth:0.3,
        paddingBottom:12
    }
})
