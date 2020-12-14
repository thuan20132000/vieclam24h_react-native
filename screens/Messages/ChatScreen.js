import React, { useState, useMemo, useEffect, useRef } from 'react'
import { AppState, RefreshControl, StyleSheet, Text, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { ActivityIndicator } from 'react-native-paper'
import CardUserMessageItem from '../../components/Card/CardUserMessageItem'

const ChatScreen = (props) => {
    const [refreshing, setRefreshing] = React.useState(false);


    const itemChat = Array(18).fill({});
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);

        setTimeout(() => {
            setRefreshing(false);
        }, 1000);
    }, []);

    const FooterList = () => {
        return (
            <ActivityIndicator
                size={"small"}
                animating={refreshing}
            />
        )
    }

    const _onNavigateToChatLive = (item) => {
        props.navigation.navigate('ChatLive',{
            user:41
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

    return (
        <View>

            <FlatList
                showsVerticalScrollIndicator={false}
                data={itemChat}
                renderItem={({ item, index }) => (
                    <CardUserMessageItem
                        customStyle={{
                            margin: 6,
                            marginBottom: 12
                        }}
                        onItemPress={() => _onNavigateToChatLive(item)}
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
