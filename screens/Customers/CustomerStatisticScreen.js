import React from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import CommonColors from '../../constants/CommonColors';

const CustomerStatisticScreen = () => {
    return (
        <ScrollView>
            <View style={[styles.row,{justifyContent:'space-around'}]}>


                <View style={[styles.block,{width:deviceWidth/2-10,backgroundColor:CommonColors.primary}]}>
                    <View style={[styles.column,{justifyContent:'center'}]}>
                        <Text style={[{textAlign:'center',fontSize:16,fontWeight:'700'}]}>
                            Tổng số công việc
                        </Text>
                        <View style={{alignItems:'center'}}>
                            <Text style={{
                                fontSize:18
                            }}>
                                12
                            </Text>
                        </View>
                    </View>
                </View>


                <View style={[styles.block,{width:deviceWidth/2-10,backgroundColor:CommonColors.primary}]}>
                    <View style={[styles.column,{justifyContent:'center'}]}>
                        <Text style={[{textAlign:'center',fontSize:16,fontWeight:'700'}]}>
                            Tổng Thanh Toán
                        </Text>
                        <View style={{alignItems:'center'}}>
                            <Text style={{
                                fontSize:18
                            }}>
                                12
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

const deviceWidth = Dimensions.get('screen').width;
const deviceHeight = Dimensions.get('screen').height;
export default CustomerStatisticScreen

const styles = StyleSheet.create({
    block:{
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        backgroundColor:'white',
        padding:8,
        margin:12
    },
    row:{
        display:'flex',
        flexDirection:'row',
    },
    column:{
        display:'flex',
        flexDirection:"column"
    }
})
