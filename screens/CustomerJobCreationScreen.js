import React, { useState, useEffect } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, View, TouchableOpacity, Alert } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import MultipleImagePicker from '../components/ImagePicker/MultipleImagePicker'
import LocationPicker from '../components/LocationPicker/LocationPicker'
import OccupationSelection from '../components/Selection/OccupationSelection'
import CommonColors from '../constants/CommonColors'
import { useSelector } from 'react-redux'

import { createJob } from '../utils/serverApi';
import { HelperText } from 'react-native-paper'
const CustomerJobCreationScreen = (props) => {


    const { userInformation } = useSelector(state => state.authentication);


    const [jobInfo, setJobInfo] = useState({
        name: '',
        description: '',
        address: '',
        province: '',
        district: '',
        subdistrict: '',
        suggestion_price: '',
        author: '',
        occupation_id: '',
        occupation_name: ''
    })

    const [location,setLocation] = useState({
        province: '',
        province_code: '',
        district: '',
        district_code: '',
        subdistrict: '',
        subdistrict_code: '',
    });

    const [jobImages, setJobImages] = useState([]);


    // useEffect(() => {
    //     setJobInfo({...jobInfo,author:userInformation.id});
    // }, [jobInfo])



    const [isError, setIsError] = useState(false);
    const _onCreateJob = async () => {
        let jobRes = await createJob(
            jobInfo.name,
            jobInfo.description,
            jobInfo.address,
            location.province_code,
            location.district_code,
            location.subdistrict_code,
            jobInfo.suggestion_price,
            userInformation.id,
            jobInfo.occupation_id,
            jobInfo.occupation_name,
            
        );
        console.warn(jobRes);

        if (jobRes.message == 'failed') {
            console.warn(jobRes);
            Alert.alert("Alert", "Tạo việc làm thất bại!");
            setIsError(true);
        }else if(jobRes.message == 'success'){
            props.navigation.navigate('HomeStack');

        }
    }

    return (
        <KeyboardAvoidingView
            behavior={"height"}
            style={{ flex: 1 }}
            keyboardVerticalOffset={60}


        >
            <ScrollView

            >
                <TextInput
                    style={[styles.inputLogin, {}]}
                    onChangeText={text => setJobInfo({ ...jobInfo, name: text })}
                    value={jobInfo?.name}
                    placeholder={'Tiêu đề công việc'}

                />
                {
                    (isError && !jobInfo.name)
                    && <HelperText type="error">
                        Vui lòng nhập tên!
                            </HelperText>

                }
                <TextInput
                    style={[styles.inputLogin, { height: 180, paddingTop: 12 }]}
                    onChangeText={text => setJobInfo({ ...jobInfo, description: text })}
                    value={jobInfo?.description}
                    placeholder={'Mô tả về công việc'}
                    multiline={true}
                />
                {
                    (isError && !jobInfo.description)
                    && <HelperText type="error">
                        Vui lòng đưa ra mô tả!
                            </HelperText>

                }
                <TextInput
                    style={[styles.inputLogin,]}
                    onChangeText={text => setJobInfo({ ...jobInfo, suggestion_price: text })}
                    value={jobInfo?.suggestion_price}
                    placeholder={'Giá đưa ra'}
                    keyboardType={'numeric'}
                />
                {
                    (isError && !jobInfo.suggestion_price)
                    && <HelperText type="error">
                        Vui lòng đưa ra giá!
                            </HelperText>

                }
                {/* Select occupations */}
                <View>
                    <OccupationSelection
                        itemSelected={jobInfo?.occupation_id}
                        setItemSelected={(item) => setJobInfo(
                            {
                                ...jobInfo,
                                occupation_id: item.id,
                                occupation_name: item.attributes?.name
                            }
                        )
                        }
                        title={jobInfo.occupation_name || "Lựa chọn lĩnh lĩnh vực"}
                        isSelectOne={true}
                    />

                </View>

                {/* Select province ,district and subdistrict */}
                <LocationPicker 
                    location = {location}
                    setLocation = {setLocation}
                />
                {
                    (isError && !location.province)
                    && <HelperText type="error">
                        Vui lòng chọn tỉnh thành!
                            </HelperText>

                }
                {
                    (isError && !location.district)
                    && <HelperText type="error">
                        Vui lòng chọn quận/huyện!
                            </HelperText>

                }
                {
                    (isError && !location.subdistrict)
                    && <HelperText type="error">
                        Vui lòng chọn phường/xã!
                            </HelperText>

                }

                {/*  */}
                <TextInput
                    style={[styles.inputLogin, { height: 80, paddingTop: 12 }]}
                    onChangeText={text => setJobInfo({ ...jobInfo, address: text })}
                    value={jobInfo.address}
                    placeholder={'Địa chỉ'}
                    multiline={true}
                />
                {/* Image Picker */}
                <MultipleImagePicker
                    imagesSelect={jobImages}
                    setImageSelect={setJobImages}
                />

                <TouchableOpacity style={styles.buttonSubmit}
                    onPress={_onCreateJob}
                >
                    <Text style={styles.buttonText}>Tạo việc làm</Text>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default CustomerJobCreationScreen

const styles = StyleSheet.create({
    inputLogin: {
        marginHorizontal: 16,
        marginVertical: 6,
        padding: 6,
        paddingLeft: 18,
        borderRadius: 22,
        height: 50,
        backgroundColor: 'white',

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    buttonSubmit: {
        backgroundColor: CommonColors.btnSubmit,
        padding: 12,
        alignSelf: 'center',
        borderRadius: 4,
        marginVertical: 22
    },
    buttonText: {
        fontSize: 22,
        color: 'white'
    }
})