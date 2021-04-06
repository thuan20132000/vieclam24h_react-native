import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, View, ScrollView, TouchableOpacity } from 'react-native'
import ReviewSatisfationLevel from '../../components/Review/ReviewSatisfationLevel';
import CommonColors from '../../constants/CommonColors';
import { _confirm_jobcandidate } from '../../utils/serverApi';
import { useSelector } from 'react-redux';
import { formatCash } from '../../utils/helper';

const JobConfirmScreen = (props) => {

    const { data } = props.route?.params;

    const { userInformation } = useSelector(state => state.authentication)

    const [confirmedJobInfo, setConfirmedJobInfo] = useState({
        confirmedPrice: '',
        satisfationLevel: '',
        message: ''
    });
    const [formatedPrice, setFormatedPrice] = useState(0);
    const [isEnteringPrice, setIsEnteringPrice] = useState(false);
    const [priceMaxLength, setPriceMaxLength] = useState(1);

    // React.useEffect(() => {
    //     console.warn(confirmedJobInfo)
    // }, [confirmedJobInfo])
    const [tempPrice, setTempPrice] = useState(0);
    const _onEnterConfirmedPrice = async (text) => {

        var myStr = text;
        var newStr = myStr.replace(/,/g, '');
        let fm_price = formatCash(newStr);
        setTempPrice(fm_price)
        setConfirmedJobInfo({ ...confirmedJobInfo, confirmedPrice: newStr });


    }

    const _onConfirmJobCandidate = async () => {
        // console.warn(data);
        // console.warn('auth: ',userInformation.id);
        // console.warn('candidate_id: ',data);

        let fetchRes = await _confirm_jobcandidate(userInformation.id, data.id, confirmedJobInfo.satisfationLevel, confirmedJobInfo.message, confirmedJobInfo.confirmedPrice);
        console.warn("res: ", fetchRes);
    }

    return (
        <View>
            <ScrollView style={{ marginHorizontal: 12 }}>

                <View style={[styles.inputGroup]}>
                    <Text style={[styles.titleCaption]}>Giá xác nhận</Text>

                    <TextInput style={[styles.textInput,
                    {
                        zIndex: -1,
                    }
                    ]}

                        value={`${tempPrice}`}
                        onChangeText={_onEnterConfirmedPrice}
                        keyboardType={'numeric'}
                        placeholder={`Nhập giá hoàn thành công việc`}




                    />
                    <Text style={{ fontSize: 10, color: 'grey', fontStyle: 'italic' }}>
                        Vui lòng cung cấp giá xác nhận để cải thiện môi trường kết nối tin cậy.
                    </Text>
                </View>
                {/*  */}
                <Text style={[styles.titleCaption, { marginHorizontal: 16 }]}>Mức độ hài lòng</Text>
                <ReviewSatisfationLevel
                    onSelected={(item) => setConfirmedJobInfo({
                        ...confirmedJobInfo, satisfationLevel: item.value
                    })}
                />
                {/*  */}
                <View style={[styles.inputGroup]}>
                    <Text style={[styles.titleCaption]}>Đánh giá ứng viên</Text>
                    <TextInput style={[styles.textInput, { height: 120, paddingTop: 16 }]}
                        value={confirmedJobInfo.message}
                        onChangeText={(text) => setConfirmedJobInfo({
                            ...confirmedJobInfo, message: text
                        }
                        )}
                        keyboardType={'default'}
                        // numberOfLines={8}
                        multiline={true}
                        placeholder={'Nội dung đánh giá...'}
                        textAlignVertical={'top'}
                    />
                </View>

                <TouchableOpacity style={[styles.buttonSubmit, { backgroundColor: CommonColors.primary, width: 180, alignSelf: 'center' }]}
                    onPress={_onConfirmJobCandidate}
                >
                    <Text style={{ textAlign: 'center', color: 'white', fontSize: 18, fontWeight: '500' }}>
                        Xác Nhận
                        </Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}

export default JobConfirmScreen

const styles = StyleSheet.create({
    buttonSubmit: {
        marginVertical: 16,
        backgroundColor: CommonColors.btnSubmit,
        padding: 12,
        borderRadius: 16
    },
    textCaption: {
        fontSize: 14,
        marginVertical: 2,

    },
    textInput: {
        height: 40,
        paddingLeft: 12,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        backgroundColor: 'white',
        marginVertical: 8
    },
    inputGroup: {
        marginVertical: 16,
        marginHorizontal: 8
    },
    titleCaption: {
        fontWeight: '500',
        fontSize: 16,
        marginVertical: 8,
        marginHorizontal: 12
    }
})
