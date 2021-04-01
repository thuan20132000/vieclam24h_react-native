import React from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import { JobItemPendingCard } from '../../components/Card/CardJobItem'
import CardUserContact from '../../components/Card/CardUserContact'
import StepIndicator from 'react-native-step-indicator';

const JobCandidateTrackingScreen = () => {

    const labels = ["Ứng tuyển", "Chờ", "Chấp nhập", "Xác nhận", "Hoàn tất thanh toán"];
    const customStyles = {
        stepIndicatorSize: 25,
        currentStepIndicatorSize: 30,
        separatorStrokeWidth: 2,
        currentStepStrokeWidth: 3,
        stepStrokeCurrentColor: '#fe7013',
        stepStrokeWidth: 3,
        stepStrokeFinishedColor: '#fe7013',
        stepStrokeUnFinishedColor: '#aaaaaa',
        separatorFinishedColor: '#fe7013',
        separatorUnFinishedColor: '#aaaaaa',
        stepIndicatorFinishedColor: '#fe7013',
        stepIndicatorUnFinishedColor: '#ffffff',
        stepIndicatorCurrentColor: '#ffffff',
        stepIndicatorLabelFontSize: 13,
        currentStepIndicatorLabelFontSize: 13,
        stepIndicatorLabelCurrentColor: '#fe7013',
        stepIndicatorLabelFinishedColor: '#ffffff',
        stepIndicatorLabelUnFinishedColor: '#aaaaaa',
        labelColor: '#999999',
        labelSize: 13,
        currentStepLabelColor: '#fe7013',
    }


    const label_custom = [
        {
            position: '1',
            stepStatus: 'complete',
            label: 'Ứng tuyển',
            currentPosition: ' 1',
        },
        {
            position: '2',
            stepStatus: 'complete',
            label: 'Chờ',
            currentPosition: ' 2',
        },
        {
            position: '3',
            stepStatus: 'complete',
            label: 'Chấp nhập',
            currentPosition: ' 3',
        },
        {
            position: '4',
            stepStatus: 'complete',
            label: 'Xác nhận thực hiện',
            currentPosition: ' 3',
        },
        {
            position: '5',
            stepStatus: 'complete',
            label: 'Xác nhận hoàn thành',
            currentPosition: ' 4',
        },
        {
            position: '6',
            stepStatus: 'complete',
            label: 'Hoàn tất thanh toán',
            currentPosition: ' 4',
        }
    ]

    return (
        <View
            style={{
                display: 'flex',
                flex: 1,
                backgroundColor: 'white'
            }}
        >
            <JobItemPendingCard
                jobTitle={'Title'}
                jobAddress={'Address'}
                jobPrice={320000}
                pressDisable={true}
                canRemove={false}
                children={

                    <CardUserContact />
                }
            />

            <View
                style={{
                    height: 400,
                    paddingHorizontal: 22,
                    backgroundColor: 'white'
                }}
            >
                <StepIndicator
                    customStyles={customStyles}
                    currentPosition={2}
                    labels={label_custom}
                    stepCount={6}
                    direction={'vertical'}
                    renderLabel={({ position, label, currentPosition, stepStatus }) =>
                        <View
                            style={{
                                width: deviceWidth - 80,
                                paddingHorizontal: 6
                            }}
                        >
                            <Text>{label.label}</Text>
                            <View
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between'
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: 12,
                                        color: 'grey',
                                        textAlign: 'right'
                                    }}
                                >
                                    Đã ứng tuyển thành công
                                </Text>
                                <Text
                                    style={{
                                        fontSize: 12,
                                        color: 'grey',
                                        textAlign: 'right'
                                    }}
                                >
                                    12:30  12/04/2021
                                </Text>

                            </View>
                        </View>
                    }



                />
            </View>

        </View>
    )
}
const deviceWidth = Dimensions.get('screen').width;
const deviceHeight = Dimensions.get('screen').height;

export default JobCandidateTrackingScreen

const styles = StyleSheet.create({})
