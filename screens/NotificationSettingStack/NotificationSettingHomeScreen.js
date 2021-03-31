import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Switch } from 'react-native-paper'
import RowInformation from '../../components/Row/RowInformation'
import messaging from '@react-native-firebase/messaging'
import RowSwitch from '../../components/Row/RowSwitch'
import AsyncStorage from '@react-native-async-storage/async-storage';


const NotificationSettingHomeScreen = () => {

    const [notificationReceive, setNotificationReceive] = useState(false);
    const [applyNotification, setApplyNotification] = useState(false);


    const _onSubcribeTopic = async () => {

        let jobpostStatus = notificationReceive;
        if (jobpostStatus) {
            messaging().unsubscribeFromTopic('jobpost').then((e) => console.log('unsubcribe to : ', e));
        } else {
            messaging().subscribeToTopic('jobpost').then((e) => console.log('subcribe to : ', e));
        }
        await saveSettingOptions('jobpost', JSON.stringify(!jobpostStatus));
        setNotificationReceive(!jobpostStatus);
    }


    const _onApplyNotification = async () => {
        let applyNotificationStatus = applyNotification;
        if (applyNotificationStatus) {
            messaging().unsubscribeFromTopic('jobapply').then((e) => console.log('unsubcribe to : ', e));
        } else {
            messaging().subscribeToTopic('jobapply').then((e) => console.log('subcribe to : ', e));
        }
        await saveSettingOptions('jobapply', JSON.stringify(!applyNotificationStatus));
        setApplyNotification(!applyNotificationStatus);
    }



    const saveSettingOptions = async (key, value) => {
        try {
            await AsyncStorage.setItem(`@${key}`, value);
        } catch (e) {
            // saving error
            console.warn('error: ', e);
        }
    }


    const getSettingOptions = async (key) => {
        const value = await AsyncStorage.getItem(`@${key}`)
        return value;

    }


    const _onSaveTokenToDatabase = () => {
        
    }



    useEffect(() => {
        getSettingOptions('jobapply').then((e) => {
            if (e == 'true') {
                setApplyNotification(true);
            } else {
                setApplyNotification(false);
            }
        });

        getSettingOptions('jobpost').then((e) => {
            if (e == 'true') {
                setNotificationReceive(true);
            } else {
                setNotificationReceive(false);
            }
        });

        messaging().getToken().then((token) => console.warn(token));


        return () => {
            messaging().onTokenRefresh(token => {
                console.warn('token changed: ',token);
            })
        }


    }, [])


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
                _onNotificationChange={_onApplyNotification}
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
