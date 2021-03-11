import React, { useState } from 'react'
import { ActivityIndicator, Alert, StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useSelector, useDispatch } from 'react-redux'
import { register_candidate, update_candidate } from '../../utils/serverApi';

import * as authenticationActions from '../../store/actions/authenticationActions';

const ReviewUpdateScreen = (props) => {
    const dispatch = useDispatch();
    const userAuth = useSelector(state => state.authentication);

    const [isLoading, setIsLoading] = useState(false);
    React.useLayoutEffect(() => {
        props.navigation.setOptions({
            title: 'Xác nhận thành công',
            headerLeft: null,
        });

    }, []);







    const _onFinishReview = async () => {

        setIsLoading(true);

        let update_candidate_res = await update_candidate(
            userAuth.userInformation?.id,
            userAuth.candidateInformation?.categories,
            userAuth.candidateInformation?.location,
            userAuth.candidateInformation?.fields,
            userAuth.candidateInformation?.images,
        );



        if (!update_candidate_res.status) {
            Alert.alert("Thông Báo", "Cập nhật thất bại");
            setIsLoading(false);
            return;
        }

        Alert.alert("Thông báo", "Cập nhật thành công");

        dispatch(authenticationActions.update_candidate_user(update_candidate_res.data.data));
        setIsLoading(false)
        props.navigation.reset({
            index: 1,
            routes: [
                { name: 'HomeStack' },

            ],
        });
    }


    const _onCancel = async () => {
        props.navigation.reset({
            index: 1,
            routes: [
                { name: 'HomeStack' },

            ],
        });
    }




    return (
        <View
            style={[styles.container]}
        >
            <View style={{
                alignItems: 'center'
            }}>
                <Text style={{
                    fontSize: 16,
                    fontWeight: '700'
                }}>
                    Chúc mừng thông tin của bạn đã được xác nhận.
                </Text>
                <Text style={{
                    fontSize: 12,
                    fontWeight: '400',
                    marginVertical: 22,
                    color: 'blue'
                }}>
                    Chấp nhận điều khoản của chúng tôi.
                </Text>

            </View>
            <View style={[styles.row, { justifyContent: 'space-around' }]}>
                {
                    isLoading ?
                        <ActivityIndicator
                            color={'coral'}
                            size={'large'}
                        /> :

                        <>
                            <TouchableOpacity

                                style={{
                                    backgroundColor: 'coral',
                                    borderRadius: 12,
                                    paddingHorizontal: 22,
                                    paddingVertical: 8,
                                    marginTop: 32,
                                    width: 140,
                                    marginHorizontal: 12
                                }}
                                onPress={_onCancel}
                            >
                                <Text style={{
                                    fontSize: 14,
                                    fontWeight: '700',
                                    color: 'white',
                                    textAlign: 'center'
                                }}>
                                    Huỷ
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity

                                style={{
                                    backgroundColor: 'coral',
                                    borderRadius: 12,
                                    paddingHorizontal: 22,
                                    paddingVertical: 8,
                                    marginTop: 32,
                                    width: 140,
                                    marginHorizontal: 12


                                }}
                                onPress={_onFinishReview}
                            >
                                <Text style={{
                                    fontSize: 14,
                                    fontWeight: '700',
                                    color: 'white',
                                    textAlign: 'center'

                                }}>
                                    Xác nhận
                                </Text>
                            </TouchableOpacity>
                        </>

                }
            </View>
        </View>
    )
}

export default ReviewUpdateScreen

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
    },
})
