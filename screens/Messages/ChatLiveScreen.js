import React, { useState, useEffect, useMemo } from 'react'
import { useLayoutEffect } from 'react';
import { Dimensions, Image, KeyboardAvoidingView, StyleSheet, Text, View, RefreshControl } from 'react-native'
import { FlatList, ScrollView, TextInput } from 'react-native-gesture-handler';
import { ActivityIndicator, IconButton } from 'react-native-paper';
import CommonColors from '../../constants/CommonColors';
import CommonIcons from '../../constants/CommonIcons';
import CommonImages from '../../constants/CommonImages';

import { useSelector } from 'react-redux';
import { getUserConversation } from '../../utils/serverApi';

const MessageChatitem = ({ isMine, message }) => {

    return (
        <View style={[styles.messageItemWrap, {
            alignItems: 'flex-end',

        },
        isMine ? { justifyContent: 'flex-end' } : { justifyContent: 'flex-start' }
        ]}
        >
            {
                !isMine &&
                <Image style={[styles.userImage]}
                    source={{
                        uri: CommonImages.avatar
                    }}
                />
            }
            <View style={[{
                backgroundColor: !isMine ? '#dcdcdc' : 'coral',
                padding: 6,
                borderRadius: 12,
                margin: 6,
                maxWidth: deviceWidth - 120
            }]}>
                <Text style={[styles.messageContent, {
                    color: 'black',

                }]}

                >
                    {message}
                </Text>
                <Text style={[styles.messageDatetime, { textAlign: 'right', fontWeight: '300', fontStyle: "italic" }]}>12:00 12/12/2020</Text>
            </View>
        </View>
    )
}


const ChatLiveScreen = (props) => {



    const { userInformation } = useSelector(state => state.authentication);

    // console.warn(userInformation);

    // let messageSample = [
    //     {
    //         id:1,
    //         text:"Hello",
    //         isMine:false
    //     },
    //     {
    //         id:1,
    //         text:"Hello",
    //         isMine:true
    //     },
    //     {
    //         id:1,
    //         text:"Hello",
    //         isMine:true
    //     },
    //     {
    //         id:1,
    //         text:"Hello",
    //         isMine:false
    //     },
    //     {
    //         id:1,
    //         text:"Hello",
    //         isMine:false
    //     }
    // ]

    const messageChatItems = Array(12).fill({});
    const [wsSocket, setWsSocket] = useState('');


    const [recipient, setRecipient] = useState();
    const { user } = props.route.params;

    // console.warn(user);

    useEffect(() => {
        if (user) {
            console.warn('recipient user: ', user);
            setRecipient(user);

        }
    }, [])

    useLayoutEffect(() => {
        props.navigation.setOptions({
            headerBackTitleVisible: false,
            headerBackTitle: ""
        });
        props.navigation.dangerouslyGetParent().setOptions({
            tabBarVisible: false
        });

        return () => {
            props.navigation.dangerouslyGetParent().setOptions({
                tabBarVisible: true
            });

        }

    }, []);


    const [messageArr, setMessageArr] = useState([]);
    const [sendValue, setSendValue] = useState('');


    useMemo(() => {
        const socket = new WebSocket(`wss://damp-stream-67132.herokuapp.com/${userInformation.id}`);
        setWsSocket(socket)

    }, []);

    wsSocket.onmessage = async (msg) => {
        let message = JSON.parse(msg.data);

        console.warn('socket message: ', message);
        if (message.connection == recipient._id) {

            setMessageArr([...messageArr, message]);

        };

        // let newMessage = {
        //     "from": { "email": "", "id": message.from, "name": "" },
        //     "message": message.message,
        // }
        // console.warn('message: ',message);
        // setMessageRealTime(message);

    }



    const _onSendMessage = async () => {

        console.warn(recipient._id);
        let sendData = {
            "connection": recipient._id,
            "conversation_id": recipient.conversation_id,
            "from": {
                "id": userInformation.id,
                "name": userInformation.name
            },
            "to": {
                "id": recipient.id || 40,
                "name": recipient.attributes?.name || "Anonimous"
            },
            "type": "message",
            "message": sendValue,
            "isMine": true
        }

        //setMessageArr([...messageArr, sendData]);
        setSendValue('');
        if (wsSocket.readyState === WebSocket.OPEN) {
            wsSocket.send(JSON.stringify(sendData));
        }
    }


    const [nextPageNumber, setNextPageNumber] = useState(0);
    const _onGetUserConversation = async () => {

        let userConversationsRes = await getUserConversation(user._id, 12,nextPageNumber);

        if (userConversationsRes.status) {
            setMessageArr(userConversationsRes.data.data);
        } else {
            setMessageArr([]);
        }
    }


    useEffect(() => {

        _onGetUserConversation();

        setNextPageNumber(0);
    }, []);


    // const _onLoadMoreUserConversation = async () => {
    //     let userConversationsRes = await getUserConversation(user._id, 12, nextPageNumber + 12);
    //     console.warn('get res: ', userConversationsRes.data.data);

    //     setMessageArr(messageArr.concat(userConversationsRes.data.data));
    //     // if(userConversationsRes.status){
    //     //     setMessageArr(userConversationsRes.data);
    //     // }else{
    //     //     setMessageArr([]);
    //     // }
    // }

    const [refreshing, setRefreshing] = useState(false);
    // const onRefresh = React.useCallback(() => {
    //     setRefreshing(true);

    //     setTimeout(() => {
    //         _onLoadMoreUserConversation();
    //         setRefreshing(false)
    //     }, 2000);
    // }, []);



    const onRefreshOldMessage = async () => {
        setRefreshing(true);

        try {
            let userConversationsRes = await getUserConversation(user._id, 12, nextPageNumber);

            setMessageArr(prev => {
                return [...userConversationsRes.data.data,...prev];
            })

            setNextPageNumber(nextPageNumber+12);
            setRefreshing(false);

        } catch (error) {
            setRefreshing(false);
        }

    }



    return (

        <>



            <FlatList style={{ flex: 1, zIndex: -1 }}
                // inverted={-1}
                data={messageArr}
               // refreshing={refreshNewMessage}
               refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefreshOldMessage}
                />
              }
              onEndReached={this.handleLoadMore}
              onEndReachedThreshold={0.1}
                // onEndReached={onRefresh}
                // onEndReachedThreshold={0.5}
                // ListFooterComponent={<ActivityIndicator animating={onRefreshOldMessage} color={CommonColors.accent} />}
                onRefresh={onRefreshOldMessage}
                refreshing={true}

                renderItem={({ item, index }) => (
                    <MessageChatitem
                        key={index.toString()}
                        isMine={item.from.id == userInformation.id ? true : false}
                        message={item.message}

                    />
                )}
                keyExtractor={(item) => item.id}
            />


            <KeyboardAvoidingView
                behavior={'padding'}
                keyboardVerticalOffset={86}
            >
                <View
                    style={
                        [styles.formInputWrap]
                    }>
                    <IconButton
                        icon={CommonIcons.fileLink}
                        color={CommonColors.primary}
                        size={26}
                        onPress={() => console.log('Pressed')}
                    />

                    <TextInput
                        style={[styles.messageTextInput]}
                        onChangeText={text => setSendValue(text)}
                        value={sendValue}
                        multiline={true}

                    />
                    <IconButton
                        icon={CommonIcons.send}
                        color={CommonColors.primary}
                        size={26}
                        onPress={_onSendMessage}

                    />
                </View>
            </KeyboardAvoidingView>

        </>
    )
}

const deviceWidth = Dimensions.get('screen').width;
const deviceHeight = Dimensions.get('screen').height;

export default ChatLiveScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        display: 'flex'
    },
    messageWrap: {

    },
    formInputWrap: {
        borderRadius: 22,
        display: 'flex',
        flexDirection: 'row',
        width: deviceWidth - 100,
        alignItems: 'center',


    },
    messageTextInput: {
        height: 30,
        borderColor: 'gray',
        borderWidth: 0.2,
        margin: 6,
        borderRadius: 22,
        width: '90%',
        paddingHorizontal: 8,
    },
    chatContentWrap: {
        marginBottom: 100
    },
    messageItemWrap: {
        padding: 6,
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    userImage: {
        width: 40,
        height: 40,
        borderRadius: 20,

    }
})
