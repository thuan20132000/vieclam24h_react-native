import React,{useState} from 'react'
import { StyleSheet, Text, TextInput, View,ScrollView, TouchableOpacity } from 'react-native'
import ReviewSatisfationLevel from '../../components/Review/ReviewSatisfationLevel';
import CommonColors from '../../constants/CommonColors';

const JobConfirmScreen = (props) => {

    const data = props.route?.params;

    const [confirmedJobInfo, setConfirmedJobInfo] = useState({
        confirmedPrice: '',
        satisfationLevel: '',
        message: ''
    });


    React.useEffect(() => {
        console.warn(confirmedJobInfo)
    }, [confirmedJobInfo])


    return (
        <View>
            <ScrollView style={{ marginHorizontal: 12 }}>

                <View style={[styles.inputGroup]}>
                    <Text style={[styles.titleCaption]}>Giá xác nhận</Text>
                    <TextInput style={[styles.textInput]}
                        value={confirmedJobInfo.confirmedPrice}
                        onChangeText={(text) => setConfirmedJobInfo({
                            ...confirmedJobInfo, confirmedPrice: text
                        }
                        )}
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
                        placeholder={'Đánh giá'}
                    />
                </View>

                <TouchableOpacity style={[styles.buttonSubmit, { backgroundColor: CommonColors.primary, width: 180, alignSelf: 'center' }]}
                    // onPress={()}
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
