import React, { useState } from 'react'
import { StyleSheet, Text, View, ScrollView, Image, ActivityIndicator, Alert } from 'react-native'
import CommonImages from '../../constants/CommonImages';
import { formatCash } from '../../utils/helper';
import BottomNavigation from './components/BottomNavigation';
import { useSelector, useDispatch } from 'react-redux';
import * as jobActions from '../../store/actions/jobActions';
import { createJob } from '../../utils/serverApi';

const ReviewSectionScreen = (props) => {

    const dispatch = useDispatch();

    const { jobInformation } = useSelector(state => state.job);

    const [isLoading, setIsLoading] = useState(false);
    const _onCreateJob = async () => {

        console.warn(jobInformation);
        setIsLoading(true);
        try {
            let res = await createJob(
                jobInformation.title,
                jobInformation.descriptions,
                jobInformation.location,
                jobInformation.budget,
                jobInformation.field?.id,
                jobInformation.photos,
            );

            if(res.status){
                dispatch(jobActions.resetJob());
                Alert.alert("Thông báo","Đăng việc thành công.");
                setTimeout(() => {
                    props.navigation.dangerouslyGetParent().navigate('HomeStack');
                    props.navigation.popToTop();

                }, 800);
            }
        } catch (error) {
            console.warn('ERROR : ', error);
        }
        setIsLoading(false);
    }

    return (
        <View
            style={[styles.container]}
        >
            <ScrollView>
                <View style={[styles.group, styles.row, { justifyContent: 'flex-start', flexWrap: 'wrap' }]}>
                    {
                        jobInformation.photos && jobInformation.photos.map((e, index) =>
                            <Image
                                key={index.toString()}
                                style={{
                                    width: 100,
                                    height: 60,
                                    borderRadius: 8
                                    , margin: 4
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
                    <Text style={[styles.textinput]}>{jobInformation.category?.name}</Text>
                </View>
                <View style={[styles.group]}>
                    <Text style={[styles.textLabel]}>Lĩnh vực</Text>
                    <Text style={[styles.textinput]}>{jobInformation.field?.name}</Text>
                </View>
                <View style={[styles.group]}>
                    <Text style={[styles.textLabel]}>Tỉnh/ Thành phố</Text>
                    <Text style={[styles.textinput]}>{jobInformation.location?.province}</Text>
                </View>
                <View style={[styles.group]}>
                    <Text style={[styles.textLabel]}>Quận/ Huyện</Text>
                    <Text style={[styles.textinput]}>{jobInformation.location?.district}</Text>
                </View>
                <View style={[styles.group]}>
                    <Text style={[styles.textLabel]}>Phường/ Xã</Text>
                    <Text style={[styles.textinput]}>{jobInformation.location?.subdistrict}</Text>
                </View>
                <View style={[styles.group]}>
                    <Text style={[styles.textLabel]}>Tên đường, số nhà</Text>
                    <Text style={[styles.textinput]}>{jobInformation.location?.address}</Text>
                </View>
                <View style={[styles.group]}>
                    <Text style={[styles.textLabel]}>Ngân sách</Text>
                    <Text style={[styles.textinput]}>{`${formatCash(jobInformation.budget || 0)} vnđ`}</Text>
                </View>
                <View style={[styles.group]}>
                    <Text style={[styles.textLabel]}>Tiêu đề</Text>
                    <Text style={[styles.textinput]}>{jobInformation.title}</Text>
                </View>
                <View style={[styles.group]}>
                    <Text style={[styles.textLabel]}>Mô tả</Text>
                    <Text style={[styles.textinput]}>{jobInformation.descriptions}</Text>
                </View>


            </ScrollView>

            <View>

                {
                    isLoading ?
                        <ActivityIndicator size={'large'} color={'coral'} /> :
                        <BottomNavigation
                            onBackPress={_onCreateJob}
                            backTitle={'Đăng công việc'}
                        />

                }


            </View>
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
        color: 'grey',
        fontStyle: 'italic'
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
        padding: 6,
        fontWeight: '700',
        color: 'red'
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
