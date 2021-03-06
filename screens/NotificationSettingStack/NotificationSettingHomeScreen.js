import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Switch } from 'react-native-paper'
import RowInformation from '../../components/Row/RowInformation'
import messaging from '@react-native-firebase/messaging'
import RowSwitch from '../../components/Row/RowSwitch'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { _updateNotificationStatus, _getUserNotificationConfig, _updateUserNotificationToken } from '../../utils/serverApi'
import { useSelector } from 'react-redux'


const NotificationSettingHomeScreen = () => {

    const { userInformation } = useSelector(state => state.authentication);

    const [notificationReceive, setNotificationReceive] = useState(false);
    const [applyNotification, setApplyNotification] = useState(false);
    const [messageNotification, setMessageNotification] = useState(false);

    const _onSubcribeTopic = async () => {

        let jobpostStatus = notificationReceive;
        if (jobpostStatus) {
            messaging().unsubscribeFromTopic('jobpost').then((e) => console.log('unsubcribe to : ', e));

            await _updateNotificationStatus('post_job_notification', 'False', userInformation.id)

        } else {
            messaging().subscribeToTopic('jobpost').then((e) => console.log('subcribe to : ', e));
            await _updateNotificationStatus('post_job_notification', 'True', userInformation.id)

        }
        await saveSettingOptions('jobpost',JSON.stringify(!jobpostStatus),userInformation.id);
        setNotificationReceive(!jobpostStatus);



    }


    const _onUpdateApplyNotification = async () => {
        let applyNotificationStatus = applyNotification;
        if (applyNotificationStatus) {
            messaging().unsubscribeFromTopic('jobapply').then((e) => console.log('unsubcribe to : ', e));
            await _updateNotificationStatus('apply_job_notification', 'False', userInformation.id)

        } else {
            messaging().subscribeToTopic('jobapply').then((e) => console.log('subcribe to : ', e));
            await _updateNotificationStatus('apply_job_notification', 'True', userInformation.id)

        }
        await saveSettingOptions('jobapply', JSON.stringify(!applyNotificationStatus), userInformation.id);
        setApplyNotification(!applyNotificationStatus);
    }


    const _onUpdateMessageNotification = async () => {
        if (messageNotification) {
            await _updateNotificationStatus('user_message_notification', 'False', userInformation.id)

        } else {
            await _updateNotificationStatus('user_message_notification', 'True', userInformation.id)

        }
        await saveSettingOptions('user_message_notification', JSON.stringify(!messageNotification), userInformation.id);
        setMessageNotification(!messageNotification);

    }





    const saveSettingOptions = async (key, value, user_id) => {
        try {
            await AsyncStorage.setItem(`@${key}_${user_id}`, value);
        } catch (e) {
            // saving error
            console.warn('error: ', e);
        }
    }


    const getSettingOptions = async (key, user_id) => {
        const value = await AsyncStorage.getItem(`@${key}_${user_id}`)
        return value;

    }


    const _onSaveTokenToDatabase = () => {

    }



    useEffect(() => {


        getSettingOptions('jobapply', userInformation.id)
            .then((e) => {
                if (e == null) {
                    saveSettingOptions('jobapply', JSON.stringify(false), userInformation.id);
                    _getUserNotificationConfig(userInformation.id)
                        .then((data) => console.log('data: ', data));
                    return;
                } else {

                    if (e == 'true') {
                        setApplyNotification(true);
                    } else {
                        setApplyNotification(false);
                    }

                }
            })

        getSettingOptions('jobpost', userInformation.id).then((e) => {
            if (e == null) {
                saveSettingOptions('jobpost', JSON.stringify(false), userInformation.id);
                return;
            } else {
                if (e == 'true') {
                    setNotificationReceive(true);
                } else {
                    setNotificationReceive(false);
                }

            }
        });

        getSettingOptions('user_message_notification', userInformation.id).then((e) => {
            if (e == null) {
                saveSettingOptions('user_message_notification', JSON.stringify(false), userInformation.id);
                return;
            } else {
                if (e == 'true') {
                    setMessageNotification(true);
                } else {
                    setMessageNotification(false);
                }

            }
        });

        messaging().getToken().then((token) => _updateUserNotificationToken(userInformation.id,token));


        // _getUserNotificationConfig(userInformation.id)
        //     .then((data) => console.log('data: ',data));

        // return () => {
        //     messaging().onTokenRefresh(token => {
        //         console.warn('token changed: ', token);
        //     })
        // }


    }, []);





    return (
        <View>

            <RowSwitch
                _onNotificationChange={_onSubcribeTopic}
                notificationReceive={notificationReceive}
                label={"Nhận thông báo tin đăng"}
            />
            <RowSwitch
                // _onNotificationChange={_onNotificationChange}
                // notificationReceive={notificationReceive}
                label={"Nhận thông báo ứng tuyển"}
                notificationReceive={applyNotification}
                _onNotificationChange={_onUpdateApplyNotification}
            />
            <RowSwitch
                // _onNotificationChange={_onNotificationChange}
                // notificationReceive={notificationReceive}
                label={"Nhận thông báo tin nhắn"}
                notificationReceive={messageNotification}
                _onNotificationChange={_onUpdateMessageNotification}
            />

        </View>
    )
}

export default NotificationSettingHomeScreen

const styles = StyleSheet.create({
    row: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

})
