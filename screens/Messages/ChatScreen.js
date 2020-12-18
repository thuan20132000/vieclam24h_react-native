import React, { useState, useMemo, useEffect, useRef } from 'react'
import { AppState, RefreshControl, StyleSheet, Text, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { ActivityIndicator } from 'react-native-paper'
import CardUserMessageItem from '../../components/Card/CardUserMessageItem'
import { getUserChatConnections } from '../../utils/serverApi';
import { useSelector } from 'react-redux';



const ChatScreen = (props) => {
    const [refreshing, setRefreshing] = React.useState(false);
    const { userInformation } = useSelector(state => state.authentication);
    const socketResponse = useSelector(state => state.socketSubcribe.responseData);

    //const itemChat = Array(18).fill({});
    const [userChatConnections, setUserChatConnections] = useState([]);

    const FooterList = () => {
        return (
            <ActivityIndicator
                size={"small"}
                animating={refreshing}
            />
        )
    }

    const _onNavigateToChatLive = (item) => {

        // console.warn(item._i);
        props.navigation.navigate('ChatLive', {
            user: item
        });
    }

    const [wsSocket, setWsSocket] = useState('');

    // useMemo(() => {
    //     const socket = new WebSocket(`wss://damp-stream-67132.herokuapp.com/`);
    //     setWsSocket(socket)

    // }, []);

    // wsSocket.onmessage = async (msg) => {
    //     let message = JSON.parse(msg.data);

    //     console.warn(message);
    //     // let newMessage = {
    //     //     "from": { "email": "", "id": message.from, "name": "" },
    //     //     "message": message.message,
    //     // }
    //     // console.warn('message: ',message);
    //     // setMessageRealTime(message);

    // }
    // useEffect(() => {

    // }, []);

    const appState = useRef(AppState.currentState);
    const [appStateVisible, setAppStateVisible] = useState(appState.current);

    useEffect(() => {
        AppState.addEventListener("change", _handleAppStateChange);

        return () => {
            AppState.removeEventListener("change", _handleAppStateChange);
        };
    }, []);

    const _handleAppStateChange = (nextAppState) => {
        if (
            appState.current.match(/inactive|background/) &&
            nextAppState === "active"
        ) {
            console.log("App has come to the foreground!");
        }

        appState.current = nextAppState;
        setAppStateVisible(appState.current);
        console.log("AppState", appState.current);
    };


    const _onGetUserChatConnection = async () => {
        let userChatConnectionRes = await getUserChatConnections(userInformation.id);
        setUserChatConnections(userChatConnectionRes.data);
    }

    let timeoutEvent;
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);

        timeoutEvent = setTimeout(() => {
            _onGetUserChatConnection();
            setRefreshing(false);
        }, 2000);
    }, []);

    useEffect(() => {

        _onGetUserChatConnection();


        props.navigation.setOptions({
            title: "Tin Nhắn"
        })


        return () => {
            clearTimeout(timeoutEvent);
        }

    }, []);


    React.useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            // The screen is focused
            // Call any action
            _onGetUserChatConnection();

        });

        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
    }, [props.navigation]);




    const [socketResponseData, setSocketResponseData] = useState();
    useEffect(() => {
        setSocketResponseData(socketResponse)
    }, [socketResponse])


    return (
        <View>

            <FlatList
                showsVerticalScrollIndicator={false}
                data={userChatConnections}
                renderItem={({ item, index }) => (
                    <CardUserMessageItem
                        customStyle={{
                            margin: 6,
                            marginBottom: 12
                        }}
                        onItemPress={() => _onNavigateToChatLive(item)}
                        title={item.conversation_id}
                        subTitle={item?.conversations[0]?.message}
                        imageUrl={item.user_image}
                        key={index.toString()}
                        socketResponseData={socketResponseData.connection == item._id && socketResponseData}
                    />
                )}
                keyExtractor={(item, index) => index.toString()}
                onEndReachedThreshold={0.5}
                onEndReached={onRefresh}
                ListFooterComponent={() => <FooterList />}

            />
        </View>
    )
}

export default ChatScreen

const styles = StyleSheet.create({})
