import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import CardCandidateItemBase from '../../components/Card/CardCandidateItem'
import RowInformation from '../../components/Row/RowInformation'
import CommonColors from '../../constants/CommonColors'
import CommonIcons from '../../constants/CommonIcons'
import { formatCash, getDaysBetweenTwoDates } from '../../utils/helper'
import { _approve_jobcandidate } from '../../utils/serverApi'
import { useSelector } from 'react-redux'
import ModalLoading from '../../components/Modal/ModalLoading'

const JobCandidateSelectionScreen = (props) => {

    const { data } = props.route.params;
    const { userInformation } = useSelector(state => state.authentication);
    const [isLoading, setIsLoading] = useState(false);

    const _onApprovedJobCandidate = (jobcandidate) => {
        setIsLoading(true);
        setTimeout(() => {
            _approve_jobcandidate(userInformation.id, jobcandidate.id)
                .then((data) => {
                    if (data.status) {
                        console.log(data);
                        Alert.alert("Thành công", "Ứng viên sẽ liên hệ với bạn.");
                        props.navigation.goBack()

                    } else {
                        Alert.alert("Không thành công", "Vui lòng kiểm tra kết nối mạng.");
                        console.log(data);

                    }
                })
                .catch((error) => console.log('error: ', error))
                .finally(() => setIsLoading(false));

        }, 2200);
    }




    const _onCancelJobCandidate = (jobcandidate) => {
        console.log(jobcandidate);
    }



    const _onShowCandidateDetail = (candidate) => {
            props.navigation.navigate('CandidateDetail',{
                candidate:candidate.candidate
            })
    }

    return (
        <>
            <ModalLoading
                isVisible={isLoading}
            />
            <ScrollView>
                {
                    (data && data.length > 0) &&
                    data.map((e, index) =>
                        <CardCandidateItemBase
                            key={index.toString()}
                            name={`${e.candidate?.username}`}
                            descriptions={`${e.descriptions}`}
                            review_average={`${e.candidate?.candidate_info?.review_overall?.review_level_avg}`}
                            review_number={`${e.candidate?.candidate_info?.review_overall?.review_count}`}
                            onDetailPress={()=>_onShowCandidateDetail(e)}

                            children={

                                <>
                                    <RowInformation
                                        iconName={CommonIcons.calendarCheck}
                                        iconStyle={{
                                            marginHorizontal: 0
                                        }}
                                        label={`${getDaysBetweenTwoDates(e?.created_at)}`}
                                    />
                                    <View
                                        style={[
                                            {
                                                display: 'flex',
                                                flexDirection: 'row',
                                                marginVertical: 8,
                                                alignItems: 'center'
                                            }
                                        ]}
                                    >

                                        <Text
                                            style={[styles.buttonText, { color: 'black' }]}
                                        >
                                            Giá mong đợi :
                            </Text>
                                        <Text
                                            style={[
                                                {
                                                    fontSize: 18,
                                                    marginHorizontal: 8,
                                                    fontWeight: '700',
                                                    color: 'red'
                                                }
                                            ]}
                                        >
                                            {`${formatCash(e?.expected_price)} vnđ`}
                                        </Text>
                                    </View>
                                    <View
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            justifyContent: 'flex-start'
                                        }}
                                    >
                                        <TouchableOpacity
                                            style={[
                                                styles.button,
                                                {
                                                    backgroundColor: 'orangered',
                                                }
                                            ]}
                                            onPress={() => _onCancelJobCandidate(e)}
                                        >
                                            <Text
                                                style={[
                                                    styles.buttonText
                                                ]}
                                            >
                                                Từ chối
                                        </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={[
                                                styles.button,
                                                {
                                                    backgroundColor: CommonColors.btnSubmit
                                                }
                                            ]}
                                            onPress={() => _onApprovedJobCandidate(e)}
                                        >
                                            <Text
                                                style={[
                                                    styles.buttonText
                                                ]}
                                            >
                                                Lựa chọn
                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </>
                            }
                        />
                    )
                }


            </ScrollView>
        </>
    )
}

export default JobCandidateSelectionScreen

const styles = StyleSheet.create({
    button: {
        display: 'flex',
        backgroundColor: 'coral',
        padding: 12,
        borderRadius: 6,
        marginHorizontal: 16,
        width: 120,

    },
    buttonText: {
        fontSize: 14,
        fontWeight: '700',
        color: 'white',
        textAlign: 'center'
    }
})
