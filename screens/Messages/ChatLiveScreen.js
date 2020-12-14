import React, { useState, useEffect, useMemo } from 'react'
import { useLayoutEffect } from 'react';
import { Dimensions, Image, KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native'
import { FlatList, ScrollView, TextInput } from 'react-native-gesture-handler';
import { IconButton } from 'react-native-paper';
import CommonColors from '../../constants/CommonColors';
import CommonIcons from '../../constants/CommonIcons';
import CommonImages from '../../constants/CommonImages';

import { useSelector } from 'react-redux';


const MessageChatitem = ({ isMine,message }) => {
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
            console.warn(user);
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

        console.warn(message);
        // let newMessage = {
        //     "from": { "email": "", "id": message.from, "name": "" },
        //     "message": message.message,
        // }
        // console.warn('message: ',message);
        // setMessageRealTime(message);

    }
    useEffect(() => {

    }, []);


    const _onSendMessage = async () => {


        let sendData = {
            "from": {
                "id": userInformation.id,
                "name": userInformation.name
            },
            "to": {
                "id": recipient.id,
                "name": recipient.attributes?.name
            },
            "type": "message",
            "message": sendValue
        }

        setMessageArr([...messageArr, sendData]);
        setSendValue('');
        if (wsSocket.readyState === WebSocket.OPEN) {
            wsSocket.send(JSON.stringify(sendData));
        }
    }

    return (

        <>

            <ScrollView

            >
                {
                    messageArr.map((e, index) =>
                        <MessageChatitem
                            key={index.toString()}
                            isMine={e.isMine}
                            message={e.message}
                        />
                    )
                }
            </ScrollView>
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
