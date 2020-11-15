import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { Badge, Caption, Paragraph, Title } from 'react-native-paper';
import CardHorizontal from '../components/Card/CardHorizontal';




const CustomerJobItem = ({navigation}) => {


    const _onPress = () => {
        navigation.navigate('JobCollaborator');
    }

    return (
        <TouchableOpacity style={styles.itemContainer}
            onPress={_onPress}
        >
                <Title>Sua dien dan dung</Title>
                <Paragraph>Sua dien dan dung tai nha</Paragraph>
                <View>
                    <Text>Giá đưa ra: 450000</Text>
                </View>
                <Caption>đăng lúc: 12:30 12/11/2020</Caption>
                <Badge style={{bottom:100}}
                    size={34}
                >
                3</Badge>

        </TouchableOpacity>
    )
}

const CustomerJobScreen = (props) => {

    const {
        navigation
    } = props;
    const customerJobData = Array(10).fill({});

    return (
        <ScrollView>
            {
                customerJobData.map((e,index) => 
                    <CustomerJobItem
                        navigation={navigation}
                    />
                )
            }
        </ScrollView>
    )
}

export default CustomerJobScreen

const styles = StyleSheet.create({
    itemContainer:{
        backgroundColor:'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        margin:8,
        padding:6
    }
})
