import React, { useState,useEffect, useRef, useLayoutEffect } from 'react'
import { Alert, StyleSheet, Text, View,Keyboard } from 'react-native'
import { ScrollView, TextInput } from 'react-native-gesture-handler'
import CommonColors from '../../constants/CommonColors'
import BottomNavigation from './components/BottomNavigation'

import { useSelector, useDispatch } from 'react-redux';
import * as jobActions from '../../store/actions/jobActions';



const TitleSectionScreen = (props) => {

    const dispatch = useDispatch();
    const _refTitleInput = useRef();
    const { data } = props.route?.params;
    const { jobInformation } = useSelector(state => state.job);

    const [title, setTitle] = useState('');


    useLayoutEffect(() => {
        setTitle(jobInformation.title);
    }, [])

    const _onTitleValidation = () => {

        if (!title || title == '' || title.length > 220) {
            return false;
        }
        return true;
    }

    const _onNextSection = () => {


        let valid_res = _onTitleValidation();

        if(!valid_res){
            Alert.alert("Thông báo","Vui lòng nhập tiêu đề hợp lệ")
            
            return;
        }

        let data = {
            title: title,
        }

        dispatch(jobActions.updateJob(data));

        props.navigation.navigate('DescriptionSection', {
            data: {
                ...data,
                title: title
            }
        })

    }


    return (
        <View
            style={{
                display: 'flex',
                flex: 1,
                backgroundColor: 'white',

            }}
        >
            <ScrollView>
                <View style={[styles.group]}>

                    <Text style={[styles.textLabel]}>Tiêu đề công việc</Text>
                    <TextInput
                        ref={_refTitleInput}
                        style={[styles.textinput]}
                        placeholder={'Tiêu đề công việc'}
                        onChangeText={(text) => setTitle(text)}
                        value={title}
                        onEndEditing={_onNextSection}
                        keyboardAppearance='default'
                    />

                </View>

                <View style={[
                    styles.group,
                    {
                        borderWidth: 1,
                        borderColor: 'blue',
                        height: 100,
                        margin: 4,
                        padding: 6,
                        backgroundColor: CommonColors.secondary
                    }
                ]} >
                    <Text style={{ color: 'grey' }}>Ví dụ: Cần người sửa xe máy tại nhà.</Text>

                    <Text style={{ color: 'grey', fontWeight: '700' }}>Nên viết tiếng Việt có dấu.</Text>
                    <Text style={{ color: 'grey', fontWeight: '700' }}>Không nhập quá 50 ký tự.</Text>

                </View>
            </ScrollView>
            <BottomNavigation
                onNextPress={_onNextSection}
                nextTitle={'Tiếp tục'}
            />
        </View>
    )
}

export default TitleSectionScreen

const styles = StyleSheet.create({
    group: {
        marginVertical: 6,
        marginHorizontal: 4
    },
    textLabel: {
        fontSize: 16,
        fontWeight: '700',
        marginVertical: 4
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
        paddingLeft: 8
    }
})
