import React, { useState } from 'react'
import { Alert, StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useSelector,useDispatch } from 'react-redux'
import { register_candidate } from '../../utils/serverApi';
import * as authenticationActions from '../../store/actions/authenticationActions';
const ReviewRegisterScreen = (props) => {

    const userAuth = useSelector(state => state.authentication);
    const dispatch = useDispatch();
    const [isLoading,setIsLoading] = useState(false);
    React.useLayoutEffect(() => {
        props.navigation.setOptions({
            title: 'Xác nhận thành công',
            headerLeft: null,


        });

    }, []);







    const _onFinishReview = async () => {
        setIsLoading(true);
        let register_candidate_res = await register_candidate(
            userAuth.userInformation?.id,
            userAuth.candidateInformation?.categories,
            userAuth.candidateInformation?.location,
            userAuth.candidateInformation?.fields,
            userAuth.candidateInformation?.images,
        )


        // console.warn(candidateInformation);



        if (!register_candidate_res.status) {
            Alert.alert("Thông Báo", "Đăng ký thất bại");
            setIsLoading(false);
            return;
        }

        Alert.alert("Thông báo", "Đăng ký thành công");

        dispatch(authenticationActions.update_candidate_user(register_candidate_res.data.data));
        setIsLoading(false);
        props.navigation.reset({
            index: 1,
            routes: [
                { name: 'HomeStack' },

            ],
        })
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
                    onPress={() => console.warn('Cancel')}
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
            </View>
        </View>
    )
}

export default ReviewRegisterScreen

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
