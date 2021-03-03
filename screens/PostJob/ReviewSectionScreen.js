import React from 'react'
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native'
import CommonImages from '../../constants/CommonImages';
import { formatCash } from '../../utils/helper';
import BottomNavigation from './components/BottomNavigation';

const ReviewSectionScreen = (props) => {

    const { data } = props.route?.params;

    console.warn(data);

    return (
        <View
            style={[styles.container]}
        >
            <ScrollView>
                <View style={[styles.group,styles.row,{justifyContent:'flex-start',flexWrap:'wrap'}]}>
                    {
                        data.photo && data.photo.map((e, index) =>
                            <Image
                                style={{
                                    width: 100,
                                    height: 60,
                                    borderRadius:8
                                    ,margin:4
                                }}
                                source={{
                                    uri: e.path || CommonImages.notFound
                                }}
                            />
                        )
                    }
                </View>
                <View style={[styles.group]}>
                    <Text style={[styles.textLabel]}>Danh mục</Text>
                    <Text style={[styles.textinput]}>{data.title}</Text>
                </View>
                <View style={[styles.group]}>
                    <Text style={[styles.textLabel]}>Lĩnh vực</Text>
                    <Text style={[styles.textinput]}>{data.field?.name}</Text>
                </View>
                <View style={[styles.group]}>
                    <Text   style={[styles.textLabel]}>Tỉnh/ Thành phố</Text>
                    <Text style={[styles.textinput]}>{data.location?.province}</Text>
                </View>
                <View style={[styles.group]}>
                    <Text   style={[styles.textLabel]}>Quận/ Huyện</Text>
                    <Text style={[styles.textinput]}>{data.location?.district}</Text>
                </View>
                <View style={[styles.group]}>
                    <Text   style={[styles.textLabel]}>Phường/ Xã</Text>
                    <Text style={[styles.textinput]}>{data.location?.subdistrict}</Text>
                </View>
                <View style={[styles.group]}>
                    <Text   style={[styles.textLabel]}>Tên đường, số nhà</Text>
                    <Text style={[styles.textinput]}>{data.location?.address}</Text>
                </View>
                <View style={[styles.group]}>
                    <Text   style={[styles.textLabel]}>Ngân sách</Text>
                    <Text style={[styles.textinput]}>{`${formatCash(data.price)} vnđ`}</Text>
                </View>
                <View style={[styles.group]}>
                    <Text   style={[styles.textLabel]}>Tiêu đề</Text>
                    <Text style={[styles.textinput]}>{data.title}</Text>
                </View>
                <View style={[styles.group]}>
                    <Text   style={[styles.textLabel]}>Mô tả</Text>
                    <Text style={[styles.textinput]}>{data.descriptions}</Text>
                </View>

               
            </ScrollView>
            <BottomNavigation
                onBackPress={() => props.navigation.goBack()}
                nextTitle={'Đăng công việc'}
            />
        </View>
    )
}

export default ReviewSectionScreen

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        backgroundColor: 'white',


    },
    group: {
        marginVertical: 6,
        marginHorizontal: 4
    },
    textLabel: {
        fontSize: 16,
        fontWeight: '400',
        marginVertical: 4,
        color:'grey',
        fontStyle:'italic'
    },
    textinput: {
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        paddingLeft: 8,
        padding:6,
        fontWeight:'700',
        color:'red'
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    buttonpicker: {
        width: 140,
        backgroundColor: 'white',
        padding: 12,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,

    }
})
