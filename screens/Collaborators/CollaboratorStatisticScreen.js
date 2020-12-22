import React,{useEffect,useState} from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import CommonColors from '../../constants/CommonColors';

import {useSelector} from 'react-redux';

import {getCollaboratorStatistic} from "../../utils/serverApi";
import { formatCash } from '../../utils/helper';

const CollaboratorStatisticScreen = (props) => {


    const {userInformation} = useSelector(state => state.authentication);


    const [collaboratorStatisticInfo,setCollaboratorStatisticInfo] = useState({
        totalIncome:0,
        confirmJobNumber:0
    });



    useEffect(() => {
        const getStatics = async () => {
            let dataRes = await getCollaboratorStatistic(userInformation.id);
            setCollaboratorStatisticInfo({
                totalIncome:dataRes.data?.totalIncome,
                confirmJobNumber:dataRes.data?.jobNumber
            })
        }    
        getStatics();



        props.navigation.setOptions({
            title:"Thống kê"
        })

    }, []);



    return (
        <ScrollView>
            <View style={[styles.column, { justifyContent: 'space-around',alignItems:'center' }]}>


                <View style={[styles.block, { width: deviceWidth / 2 - 10, backgroundColor: CommonColors.primary }]}>
                    <View style={[styles.column, { justifyContent: 'center' }]}>
                        <Text style={[{ textAlign: 'center', fontSize: 16, fontWeight: '700' }]}>
                            Công việc hoàn thành
                    </Text>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{
                                fontSize: 22,
                                fontWeight:'600',
                                color:"red"
                            }}>
                                {collaboratorStatisticInfo.confirmJobNumber}
                        </Text>
                        </View>
                    </View>
                </View>


                <View style={[styles.block, { width: deviceWidth / 2 - 10, backgroundColor: CommonColors.primary }]}>
                    <View style={[styles.column, { justifyContent: 'center' }]}>
                        <Text style={[{ textAlign: 'center', fontSize: 16, fontWeight: '700' }]}>
                          Thu Nhập
                    </Text>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{
                                fontSize: 22,
                                color:'red',
                                fontWeight:'600'
                            }}>
                                { formatCash(collaboratorStatisticInfo.totalIncome)} vnđ
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
export default CollaboratorStatisticScreen

const styles = StyleSheet.create({
    block: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        backgroundColor: 'white',
        padding: 8,
        margin: 12
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
    },
    column: {
        display: 'flex',
        flexDirection: "column"
    }
})
