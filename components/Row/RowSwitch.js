import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Switch } from 'react-native-paper'

const RowSwitch = ({
    notificationReceive = false,
    _onNotificationChange,
    label
}) => {
    return (
        <View
            style={[styles.row, {
                marginHorizontal: 6,
                marginVertical: 4,
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 5,
                },
                shadowOpacity: 0.34,
                shadowRadius: 6.27,

                elevation: 10,
                backgroundColor: 'white',
                borderRadius: 6,
                padding: 12
            }]}
        >
            <Text
                style={{
                    fontSize: 14,
                    fontWeight: '700'
                }}
            >
                {label}
        </Text>
            <Switch
                value={notificationReceive}
                color={'coral'}
                onValueChange={_onNotificationChange}

            />
        </View>

    )
}

export default RowSwitch

const styles = StyleSheet.create({
    row: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
})
