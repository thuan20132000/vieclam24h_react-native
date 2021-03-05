import React from 'react'
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native'

const ModalConfirmPhoneNumber = ({
    isVisible = false,
    setIsVisible,
    transparent = true,
    animationType= "slide",
    children
}) => {



    // const [modalVisible, setModalVisible] = React.useState(true)

    return (
        <Modal
            animationType={animationType}
            transparent={transparent}
            visible={isVisible}
            onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setIsVisible(!isVisible);
            }}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    {children}
                </View>
            </View>
        </Modal>
    )
}

export default ModalConfirmPhoneNumber

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      modalView: {
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
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
      },
      buttonOpen: {
        backgroundColor: "#F194FF",
      },
      buttonClose: {
        backgroundColor: "#2196F3",
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center"
      }
})
