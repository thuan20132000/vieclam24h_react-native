import React from 'react'
import { Alert, Modal, StyleSheet, Text, Pressable, View, ActivityIndicator,TouchableOpacity } from "react-native";

import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import CommonColors from '../../constants/CommonColors';
import CommonIcons from '../../constants/CommonIcons';

const ModalCompleteConfirmed = ({
    visible = false,
    isConfirmed = false,
    onCompleteSubmit

}) => {

    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="fade"
                transparent={true}
                visible={visible}

            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        {
                            !isConfirmed ?
                                <ActivityIndicator
                                    color={'coral'}
                                    size={'large'}
                                />
                                :
                                <View
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    <MaterialCommunityIcon
                                        name={CommonIcons.shieldChecked}
                                        color={CommonColors.btnSubmit}
                                        size={66}
                                    />
                                    <TouchableOpacity
                                        style={{
                                            marginVertical: 22
                                        }}
                                        onPress={onCompleteSubmit}
                                    >
                                        <Text style={{ fontWeight: '700', fontSize: 18 }}>Trở Về</Text>
                                    </TouchableOpacity>
                                </View>

                        }

                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default ModalCompleteConfirmed

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor:'rgba(0, 0, 0, 0.4)'
    },
    modalView: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 200,
        height: 200,
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },

})
