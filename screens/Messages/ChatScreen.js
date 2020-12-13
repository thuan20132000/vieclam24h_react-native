import React from 'react'
import { RefreshControl, StyleSheet, Text, View } from 'react-native'
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
        props.navigation.navigate('ChatLive');
    }


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
                        onItemPress={()=>_onNavigateToChatLive(item)}
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
